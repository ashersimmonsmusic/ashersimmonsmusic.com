import type { PortableTextBlock, PortableTextSpan } from "@/lib/types";

/**
 * Minimal Portable Text renderer.
 *
 * Sanity's own @portabletext/react would do this, but a news post only uses
 * paragraphs, subheadings, quotes and inline emphasis — not worth a dependency
 * for that, and this keeps exactly what the body can contain visible here.
 */

function Span({ span, markDefs }: { span: PortableTextSpan; markDefs: PortableTextBlock["markDefs"] }) {
  let node = <>{span.text}</>;

  for (const mark of span.marks ?? []) {
    // A mark is either a decorator by name, or a key into markDefs.
    const def = markDefs?.find((candidate) => candidate._key === mark);
    if (def?._type === "link" && def.href) {
      node = (
        <a
          href={def.href}
          className="underline underline-offset-4 transition-colors hover:text-paper"
          {...(/^https?:\/\//i.test(def.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {node}
        </a>
      );
      continue;
    }
    if (mark === "strong") node = <strong className="font-medium text-paper">{node}</strong>;
    else if (mark === "em") node = <em>{node}</em>;
    else if (mark === "code") node = <code className="font-mono-label text-sm">{node}</code>;
  }

  return node;
}

function Block({ block }: { block: PortableTextBlock }) {
  const children = block.children.map((span, index) => (
    <Span key={span._key ?? index} span={span} markDefs={block.markDefs} />
  ));

  switch (block.style) {
    case "h2":
      return <h2 className="font-display mt-12 text-3xl font-medium tracking-tight md:text-4xl">{children}</h2>;
    case "h3":
      return <h3 className="font-display mt-10 text-2xl font-medium tracking-tight">{children}</h3>;
    case "blockquote":
      return (
        <blockquote className="border-paper-dim/30 mt-8 border-l-2 pl-6 text-lg italic">{children}</blockquote>
      );
    default:
      return <p className="mt-6 text-lg leading-relaxed">{children}</p>;
  }
}

export function PortableText({ blocks }: { blocks: PortableTextBlock[] }) {
  return (
    <div className="max-w-2xl text-paper-dim">
      {blocks.map((block, index) => (
        <Block key={block._key ?? index} block={block} />
      ))}
    </div>
  );
}
