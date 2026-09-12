import { describe, expect, it } from "vitest";
import { unsubscribeToken, verifyUnsubscribeToken } from "@/lib/newsletter/unsubscribe";

const SECRET = "a".repeat(64);

describe("unsubscribe tokens", () => {
  it("verifies a token it generated", () => {
    const token = unsubscribeToken("fan@example.com", SECRET);
    expect(verifyUnsubscribeToken("fan@example.com", token, SECRET)).toBe(true);
  });

  it("stops one person unsubscribing another by editing the link", () => {
    const token = unsubscribeToken("fan@example.com", SECRET);
    expect(verifyUnsubscribeToken("someone.else@example.com", token, SECRET)).toBe(false);
  });

  it("ignores case and surrounding space, since mail clients mangle both", () => {
    const token = unsubscribeToken("fan@example.com", SECRET);
    expect(verifyUnsubscribeToken("  FAN@Example.com ", token, SECRET)).toBe(true);
  });

  it("rejects a token signed with a different secret", () => {
    const token = unsubscribeToken("fan@example.com", SECRET);
    expect(verifyUnsubscribeToken("fan@example.com", token, "b".repeat(64))).toBe(false);
  });

  it("rejects empty or truncated tokens rather than throwing", () => {
    const token = unsubscribeToken("fan@example.com", SECRET);
    expect(verifyUnsubscribeToken("fan@example.com", "", SECRET)).toBe(false);
    expect(verifyUnsubscribeToken("fan@example.com", token.slice(0, 20), SECRET)).toBe(false);
  });
});
