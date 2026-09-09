/** Extracts the video ID from any common YouTube URL shape. Returns null if it doesn't look like a YouTube URL. */
export function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return parsed.pathname.slice(1) || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      if (parsed.pathname === "/watch") {
        return parsed.searchParams.get("v");
      }
      const match = parsed.pathname.match(/^\/(embed|shorts|live)\/([^/]+)/);
      if (match) return match[2];
    }

    return null;
  } catch {
    return null;
  }
}

export function youtubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}
