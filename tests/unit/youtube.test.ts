import { describe, expect, it } from "vitest";
import { getYouTubeId, youtubeThumbnailUrl } from "@/lib/youtube";

describe("getYouTubeId", () => {
  it("parses a standard watch URL", () => {
    expect(getYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("parses a youtu.be short URL", () => {
    expect(getYouTubeId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("parses an embed URL", () => {
    expect(getYouTubeId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("parses a shorts URL", () => {
    expect(getYouTubeId("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("parses a watch URL with extra query params", () => {
    expect(getYouTubeId("https://youtube.com/watch?v=dQw4w9WgXcQ&t=42s")).toBe("dQw4w9WgXcQ");
  });

  it("returns null for a non-YouTube URL", () => {
    expect(getYouTubeId("https://vimeo.com/12345")).toBeNull();
  });

  it("returns null for garbage input", () => {
    expect(getYouTubeId("not a url")).toBeNull();
  });
});

describe("youtubeThumbnailUrl", () => {
  it("builds the maxresdefault thumbnail URL", () => {
    expect(youtubeThumbnailUrl("dQw4w9WgXcQ")).toBe(
      "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    );
  });
});
