import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlayerProvider, usePlayer } from "@/components/music/player-context";
import type { PlayerTrack } from "@/lib/music/types";

const tracks: PlayerTrack[] = [
  { id: "a", title: "Track A", releaseTitle: "Release", releaseSlug: "release", artworkUrl: "" },
  { id: "b", title: "Track B", releaseTitle: "Release", releaseSlug: "release", artworkUrl: "" },
];

function TestConsumer() {
  const { state, currentTrack, playQueue, next, previous } = usePlayer();
  return (
    <div>
      <p data-testid="current">{currentTrack?.title ?? "none"}</p>
      <p data-testid="playing">{String(state.isPlaying)}</p>
      <button onClick={() => playQueue(tracks, 0)}>load</button>
      <button onClick={next}>next</button>
      <button onClick={previous}>previous</button>
    </div>
  );
}

describe("PlayerProvider", () => {
  it("loads a queue and moves between tracks", async () => {
    const user = userEvent.setup();
    render(
      <PlayerProvider>
        <TestConsumer />
      </PlayerProvider>,
    );

    expect(screen.getByTestId("current")).toHaveTextContent("none");

    await user.click(screen.getByText("load"));
    expect(screen.getByTestId("current")).toHaveTextContent("Track A");
    expect(screen.getByTestId("playing")).toHaveTextContent("true");

    await user.click(screen.getByText("next"));
    expect(screen.getByTestId("current")).toHaveTextContent("Track B");

    await user.click(screen.getByText("next"));
    expect(screen.getByTestId("current")).toHaveTextContent("Track A");

    await user.click(screen.getByText("previous"));
    expect(screen.getByTestId("current")).toHaveTextContent("Track B");
  });
});
