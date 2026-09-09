/**
 * A single track's untitled.stream player — the per-project embed code
 * Asher supplies from his untitled.stream dashboard, unlike the profile
 * page itself, this embed path is built to be framed.
 */
export function UntitledTrackEmbed({
  embedId,
  title,
  className,
}: {
  embedId: string;
  title: string;
  className?: string;
}) {
  return (
    <iframe
      style={{ borderRadius: 24 }}
      src={`https://untitled.stream/embed/${embedId}`}
      title={`Listen to ${title} on Untitled`}
      width="100%"
      height={344}
      allow="picture-in-picture"
      allowFullScreen
      frameBorder={0}
      loading="lazy"
      className={className}
    />
  );
}
