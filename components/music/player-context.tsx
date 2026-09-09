"use client";

import * as React from "react";
import type { PlayerTrack } from "@/lib/music/types";

type PlayerState = {
  queue: PlayerTrack[];
  index: number;
  isPlaying: boolean;
  isOpen: boolean;
  currentTime: number;
  duration: number;
  volume: number;
};

type PlayerAction =
  | { type: "LOAD_QUEUE"; queue: PlayerTrack[]; index: number }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "NEXT" }
  | { type: "PREVIOUS" }
  | { type: "SET_TIME"; time: number }
  | { type: "SET_DURATION"; duration: number }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "CLOSE" };

const initialState: PlayerState = {
  queue: [],
  index: -1,
  isPlaying: false,
  isOpen: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "LOAD_QUEUE":
      return {
        ...state,
        queue: action.queue,
        index: action.index,
        isPlaying: true,
        isOpen: true,
        currentTime: 0,
      };
    case "PLAY":
      return { ...state, isPlaying: true };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "NEXT": {
      if (state.queue.length === 0) return state;
      const nextIndex = (state.index + 1) % state.queue.length;
      return { ...state, index: nextIndex, currentTime: 0, isPlaying: true };
    }
    case "PREVIOUS": {
      if (state.queue.length === 0) return state;
      const prevIndex = (state.index - 1 + state.queue.length) % state.queue.length;
      return { ...state, index: prevIndex, currentTime: 0, isPlaying: true };
    }
    case "SET_TIME":
      return { ...state, currentTime: action.time };
    case "SET_DURATION":
      return { ...state, duration: action.duration };
    case "SET_VOLUME":
      return { ...state, volume: action.volume };
    case "CLOSE":
      return { ...state, isOpen: false, isPlaying: false };
    default:
      return state;
  }
}

type PlayerContextValue = {
  state: PlayerState;
  currentTrack: PlayerTrack | null;
  playQueue: (queue: PlayerTrack[], startIndex?: number) => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  close: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

const PlayerContext = React.createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(playerReducer, initialState);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const currentTrack = state.index >= 0 ? state.queue[state.index] ?? null : null;

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.previewAudioUrl) return;
    if (state.isPlaying) {
      audio.play().catch(() => dispatch({ type: "PAUSE" }));
    } else {
      audio.pause();
    }
  }, [state.isPlaying, currentTrack]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = state.volume;
  }, [state.volume]);

  const value: PlayerContextValue = {
    state,
    currentTrack,
    playQueue: (queue, startIndex = 0) => dispatch({ type: "LOAD_QUEUE", queue, index: startIndex }),
    togglePlay: () => dispatch({ type: state.isPlaying ? "PAUSE" : "PLAY" }),
    next: () => dispatch({ type: "NEXT" }),
    previous: () => dispatch({ type: "PREVIOUS" }),
    seek: (time) => {
      if (audioRef.current) audioRef.current.currentTime = time;
      dispatch({ type: "SET_TIME", time });
    },
    setVolume: (volume) => dispatch({ type: "SET_VOLUME", volume }),
    close: () => dispatch({ type: "CLOSE" }),
    audioRef,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={currentTrack?.previewAudioUrl}
        onTimeUpdate={(e) => dispatch({ type: "SET_TIME", time: e.currentTarget.currentTime })}
        onLoadedMetadata={(e) =>
          dispatch({ type: "SET_DURATION", duration: e.currentTarget.duration })
        }
        onEnded={() => dispatch({ type: "NEXT" })}
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = React.useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within a PlayerProvider");
  return ctx;
}
