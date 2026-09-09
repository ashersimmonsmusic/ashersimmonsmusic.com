import { YouTubeEmbed } from "@/components/live/youtube-embed";
import type { LiveVideo } from "@/lib/types";

export function VideoGrid({ videos }: { videos: LiveVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {videos.map((video) => (
        <li key={video._id}>
          <YouTubeEmbed video={video} />
        </li>
      ))}
    </ul>
  );
}
