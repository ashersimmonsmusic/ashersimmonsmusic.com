import { describe, expect, it } from "vitest";
import { releaseToQueue } from "@/lib/music/queue";
import type { Release } from "@/lib/types";

const baseRelease: Release = {
  _id: "r1",
  slug: "brighter-days",
  title: "Brighter Days",
  releaseType: "single",
  artwork: { url: "", alt: "Brighter Days artwork" },
  tracklist: [],
  links: {},
};

describe("releaseToQueue", () => {
  it("falls back to a single placeholder track when there is no tracklist", () => {
    const queue = releaseToQueue(baseRelease);
    expect(queue).toHaveLength(1);
    expect(queue[0]).toMatchObject({
      title: "Brighter Days",
      releaseSlug: "brighter-days",
      previewAudioUrl: undefined,
    });
  });

  it("sorts tracks by track number and maps release metadata onto each", () => {
    const release: Release = {
      ...baseRelease,
      tracklist: [
        { _id: "t2", title: "Track Two", trackNumber: 2 },
        { _id: "t1", title: "Track One", trackNumber: 1 },
      ],
    };

    const queue = releaseToQueue(release);
    expect(queue.map((t) => t.title)).toEqual(["Track One", "Track Two"]);
    expect(queue[0].releaseSlug).toBe("brighter-days");
    expect(queue[0].artworkUrl).toBe(release.artwork.url);
  });
});
