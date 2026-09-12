import { NextResponse } from "next/server";
import { unsubscribe } from "@/lib/newsletter/service";

export const dynamic = "force-dynamic";

/**
 * One-click unsubscribe, targeted by the List-Unsubscribe-Post header.
 *
 * Gmail and Yahoo require bulk senders to honour this, and a mail client calls
 * it directly with no user interaction — so it answers 200 and plain text
 * rather than redirecting to a page nobody will see.
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  let email = url.searchParams.get("e") ?? "";
  let token = url.searchParams.get("t") ?? "";

  // RFC 8058 clients post `List-Unsubscribe=One-Click` as a form body; the
  // address stays in the URL, but parse the body too rather than assume.
  if (!email || !token) {
    try {
      const form = await request.formData();
      email ||= String(form.get("e") ?? "");
      token ||= String(form.get("t") ?? "");
    } catch {
      // No form body — the query string was the only source.
    }
  }

  try {
    const result = await unsubscribe(email, token);
    if (result === "done") return new NextResponse("Unsubscribed", { status: 200 });
    return new NextResponse(result === "invalid" ? "Invalid link" : "Unavailable", {
      status: result === "invalid" ? 400 : 503,
    });
  } catch {
    return new NextResponse("Unavailable", { status: 503 });
  }
}
