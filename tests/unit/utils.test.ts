import { describe, expect, it } from "vitest";
import { formatDate, formatTime, cn } from "@/lib/utils";

describe("formatDate", () => {
  it("formats an ISO date string", () => {
    expect(formatDate("2024-03-15")).toBe("15 March 2024");
  });

  it("returns TBA for missing dates", () => {
    expect(formatDate(undefined)).toBe("TBA");
    expect(formatDate(null)).toBe("TBA");
  });

  it("returns TBA for invalid dates", () => {
    expect(formatDate("not-a-date")).toBe("TBA");
  });
});

describe("formatTime", () => {
  it("formats seconds as m:ss", () => {
    expect(formatTime(65)).toBe("1:05");
    expect(formatTime(9)).toBe("0:09");
    expect(formatTime(600)).toBe("10:00");
  });

  it("handles invalid input safely", () => {
    expect(formatTime(-5)).toBe("0:00");
    expect(formatTime(NaN)).toBe("0:00");
  });
});

describe("cn", () => {
  it("merges tailwind classes, letting later ones win", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, undefined, "b")).toBe("a b");
  });
});
