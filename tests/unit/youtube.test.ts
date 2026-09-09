import { describe, expect, it } from "vitest";
import { getYouTubeId, getYouTubePlaylistId, youtubeThumbnailUrl } from "@/lib/youtube";

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

describe("getYouTubePlaylistId", () => {
  it("parses a playlist URL", () => {
    expect(
      getYouTubePlaylistId(
        "https://youtube.com/playlist?list=PLFRYu8FqywGE8NmM9vJ-KFp5ChVKBP8mk&si=aRRi4jKkP-WJ25Eu",
      ),
    ).toBe("PLFRYu8FqywGE8NmM9vJ-KFp5ChVKBP8mk");
  });

  it("parses a watch URL that includes a list param", () => {
    expect(
      getYouTubePlaylistId("https://www.youtube.com/watch?v=abc123&list=PLxyz"),
    ).toBe("PLxyz");
  });

  it("returns null when there is no list param", () => {
    expect(getYouTubePlaylistId("https://www.youtube.com/watch?v=abc123")).toBeNull();
  });

  it("returns null for a non-YouTube URL", () => {
    expect(getYouTubePlaylistId("https://vimeo.com/12345?list=x")).toBeNull();
  });
});

describe("youtubeThumbnailUrl", () => {
  it("builds the maxresdefault thumbnail URL", () => {
    expect(youtubeThumbnailUrl("dQw4w9WgXcQ")).toBe(
      "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    );
  });
});
