import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PortableText } from "@/components/news/portable-text";
import type { PortableTextBlock } from "@/lib/types";

function block(partial: Partial<PortableTextBlock>): PortableTextBlock {
  return { _type: "block", children: [], ...partial } as PortableTextBlock;
}

describe("PortableText", () => {
  it("renders paragraphs", () => {
    render(
      <PortableText
        blocks={[block({ style: "normal", children: [{ _type: "span", text: "Out now." }] })]}
      />,
    );
    expect(screen.getByText("Out now.")).toBeInTheDocument();
  });

  it("renders subheadings as real headings, not styled paragraphs", () => {
    render(<PortableText blocks={[block({ style: "h2", children: [{ _type: "span", text: "The story" }] })]} />);
    expect(screen.getByRole("heading", { level: 2, name: "The story" })).toBeInTheDocument();
  });

  it("applies emphasis marks", () => {
    const { container } = render(
      <PortableText
        blocks={[block({ children: [{ _type: "span", text: "loud", marks: ["strong"] }] })]}
      />,
    );
    expect(container.querySelector("strong")?.textContent).toBe("loud");
  });

  it("resolves a link mark through markDefs", () => {
    render(
      <PortableText
        blocks={[
          block({
            markDefs: [{ _key: "k1", _type: "link", href: "https://example.com" }],
            children: [{ _type: "span", text: "listen", marks: ["k1"] }],
          }),
        ]}
      />,
    );
    const link = screen.getByRole("link", { name: "listen" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("keeps internal links in the same tab", () => {
    render(
      <PortableText
        blocks={[
          block({
            markDefs: [{ _key: "k1", _type: "link", href: "/music" }],
            children: [{ _type: "span", text: "music", marks: ["k1"] }],
          }),
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "music" })).not.toHaveAttribute("target");
  });

  it("ignores an unknown mark rather than dropping the text", () => {
    render(<PortableText blocks={[block({ children: [{ _type: "span", text: "kept", marks: ["mystery"] }] })]} />);
    expect(screen.getByText("kept")).toBeInTheDocument();
  });

  it("renders nothing for an empty body without throwing", () => {
    const { container } = render(<PortableText blocks={[]} />);
    expect(container.textContent).toBe("");
  });
});
