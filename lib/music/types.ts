export type PlayerTrack = {
  id: string;
  title: string;
  releaseTitle: string;
  releaseSlug: string;
  artworkUrl: string;
  /** Absent until real audio is connected via Supabase Storage / CMS. */
  previewAudioUrl?: string;
  duration?: string;
};
