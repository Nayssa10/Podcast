"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./AudioPlayer.module.css";

export interface Track {
  title: string;
  description: string;
  url: string;
  duration: string;
}

export interface AudioPlayerProps {
  track: Track;
  variant?: "default" | "compact";
}

export default function AudioPlayer({ track, variant = "default" }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const [prevTrackUrl, setPrevTrackUrl] = useState(track.url);

  // Reset state synchronously when track changes
  if (track.url !== prevTrackUrl) {
    setPrevTrackUrl(track.url);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }

  // Sync state with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Force audio element reload when track URL changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [track.url]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Playback failed: ", err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (value > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`${styles.playerContainer} ${variant === "compact" ? styles.compact : ""}`}>
      <audio
        ref={audioRef}
        src={track.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {variant !== "compact" && (
        <div className={styles.trackDetails}>
          <h4 className={styles.trackTitle}>{track.title}</h4>
          <p className={styles.trackDescription}>{track.description}</p>
        </div>
      )}

      <div className={styles.controlsRow}>
        <button
          onClick={togglePlay}
          className={`${styles.playButton} ${isPlaying ? styles.playing : ""}`}
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className={styles.icon}>
              <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className={styles.icon}>
              <path fill="currentColor" d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        <div className={styles.progressContainer}>
          <span className={styles.timeLabel}>{formatTime(currentTime)}</span>
          <div className={styles.sliderWrapper}>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleScrub}
              className={styles.progressBar}
              style={{
                background: `linear-gradient(to right, var(--color-accent-1) 0%, var(--color-accent-1) ${progressPercent}%, var(--color-accent-2) ${progressPercent}%, var(--color-accent-2) 100%)`
              }}
            />
          </div>
          <span className={styles.timeLabel}>
            {duration ? formatTime(duration) : track.duration}
          </span>
        </div>

        <div className={`${styles.volumeContainer} ${variant === "compact" ? styles.compactVolume : ""}`}>
          <button
            onClick={toggleMute}
            className={styles.muteButton}
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted || volume === 0 ? (
              <svg viewBox="0 0 24 24" className={styles.volumeIcon}>
                <path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.03c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className={styles.volumeIcon}>
                <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
          {variant !== "compact" && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className={styles.volumeBar}
              aria-label="Volumen"
              style={{
                background: `linear-gradient(to right, var(--color-accent-1) 0%, var(--color-accent-1) ${(isMuted ? 0 : volume) * 100}%, var(--color-accent-2) ${(isMuted ? 0 : volume) * 100}%, var(--color-accent-2) 100%)`
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
