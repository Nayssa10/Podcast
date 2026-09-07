"use client";

import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import styles from "./ScrollEpisodeNavigator.module.css";

export interface EpisodeData {
  number: string;
  date: string;
  title: string;
  type: "forensic" | "book";
  coverImage: string;
  description: string;
  url: string;
  duration: string;
  headlineQuestion?: string;
  authorName?: string;
  bookDetails?: {
    title: string;
    author: string;
    description: string;
    coverIcon?: string;
  };
  forensicDetails?: {
    criminologyDetails: string;
    keyPhysicalEvidence: string[];
    forensicFocus: string;
  };
  snippet?: {
    text: string;
    highlights: string[];
  };
  annotations?: Array<{ text: string; position: string }>;
}

interface ScrollEpisodeNavigatorProps {
  episodes: EpisodeData[];
  onSelectEpisode: (index: number) => void;
}

export default function ScrollEpisodeNavigator({
  episodes,
  onSelectEpisode,
}: ScrollEpisodeNavigatorProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAllDrawer, setShowAllDrawer] = useState(false);

  // Cards color themes for the runway
  const cardThemes = [
    {
      bg: "#E8DED1", // Warm muted parchment blush
      text: "#2B231D",
      subText: "#6E6153",
      accent: "#8E7F6E",
      badgeBg: "rgba(43, 35, 29, 0.08)",
      tag: "CRIMINALÍSTICA & GÓTICO",
    },
    {
      bg: "#4A3E2A", // Deep olive / antique leather brown
      text: "#F7F3EB",
      subText: "#D6CCA9",
      accent: "#E2C889",
      badgeBg: "rgba(255, 255, 255, 0.12)",
      tag: "TOXICOLOGÍA & ROMANCE",
    },
    {
      bg: "#1E1A17", // Midnight forensic charcoal
      text: "#F5F5EB",
      subText: "#B3AAA2",
      accent: "#E0533C",
      badgeBg: "rgba(255, 255, 255, 0.1)",
      tag: "BALÍSTICA & MISTERIO",
    },
  ];

  // Quadruple items to ensure an infinite seamless loop
  const runwayItems = [...episodes, ...episodes, ...episodes, ...episodes];

  return (
    <div className={styles.runwaySection}>
      {/* Runway Header & Control Bar */}
      <div className={styles.runwayHeader}>
        <div className={styles.runwayTitleGroup}>
          <span className={styles.runwayBadge}>
            <span className={styles.pulseIndicator}></span>
            PASARELA DE CASOS & NOVELAS
          </span>
          <h3 className={styles.runwayTitle}>Desfile Continuo de Expedientes</h3>
        </div>

        {/* Play / Pause Runway Toggle */}
        <div className={styles.runwayControls}>
          <button
            type="button"
            className={styles.runwayPlayBtn}
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pausar pasarela" : "Reanudar pasarela"}
          >
            <span>{isPlaying ? "⏸ Pausar Desfile" : "▶ Reanudar Desfile"}</span>
          </button>
        </div>
      </div>

      {/* Infinite Runway Track */}
      <div className={styles.runwayViewport}>
        <div
          className={`${styles.runwayTrack} ${!isPlaying ? styles.runwayPaused : ""}`}
        >
          {runwayItems.map((ep, globalIdx) => {
            const originalIndex = globalIdx % episodes.length;
            const theme = cardThemes[originalIndex % cardThemes.length];
            const cleanTitle = ep.title.split(": ")[1] || ep.title;
            const isForensic = ep.type === "forensic";

            return (
              <article
                key={`${ep.number}-${globalIdx}`}
                className={styles.runwayCard}
                style={{
                  backgroundColor: theme.bg,
                  color: theme.text,
                }}
                onClick={() => onSelectEpisode(originalIndex)}
              >
                {/* Top Badge & Tag */}
                <div className={styles.cardTop}>
                  <div className={styles.brandBadge} style={{ background: theme.badgeBg }}>
                    <span className={styles.brandIcon}>{isForensic ? "🔍" : "📖"}</span>
                    <span className={styles.brandText}>{ep.number}</span>
                  </div>
                  <span className={styles.tagText} style={{ color: theme.subText }}>
                    {theme.tag}
                  </span>
                </div>

                {/* Subtitle / Case Name */}
                <h4 className={styles.cardSubtitle} style={{ color: theme.text }}>
                  {cleanTitle}
                </h4>

                {/* Excerpt */}
                <p className={styles.cardExcerpt} style={{ color: theme.subText }}>
                  {ep.description}
                </p>

                {/* Highlight Pill */}
                {isForensic && ep.forensicDetails ? (
                  <div className={styles.pillEvidence} style={{ borderColor: theme.subText }}>
                    <span className={styles.pillLabel}>EVIDENCIA:</span>
                    <span className={styles.pillValue}>
                      {ep.forensicDetails.keyPhysicalEvidence[0]}
                    </span>
                  </div>
                ) : ep.bookDetails ? (
                  <div className={styles.pillEvidence} style={{ borderColor: theme.subText }}>
                    <span className={styles.pillLabel}>AUTOR:</span>
                    <span className={styles.pillValue}>{ep.bookDetails.author}</span>
                  </div>
                ) : null}

                {/* Mini Audio Controller */}
                <div
                  className={styles.audioInlineContainer}
                  onClick={(e) => e.stopPropagation()}
                >
                  <AudioPlayer
                    track={{
                      title: ep.title,
                      description: ep.description,
                      url: ep.url,
                      duration: ep.duration,
                    }}
                    variant="compact"
                  />
                </div>

                {/* Card Footer */}
                <div className={styles.cardBottom}>
                  <div className={styles.hostSignature}>
                    <span className={styles.hostName} style={{ color: theme.text }}>
                      Nayssa Kristel
                    </span>
                    <span className={styles.hostRole} style={{ color: theme.subText }}>
                      Team Supernova • {ep.duration}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={styles.cardActionPill}
                    style={{
                      borderColor: theme.text,
                      color: theme.text,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEpisode(originalIndex);
                    }}
                  >
                    Examinar ➔
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Bottom Action: "Ver todos los episodios" */}
      <div className={styles.viewMoreSection}>
        <button
          type="button"
          className={styles.viewMoreBtn}
          onClick={() => setShowAllDrawer(!showAllDrawer)}
        >
          <span>{showAllDrawer ? "Ocultar Catálogo de Casos ▴" : "Ver Catálogo Completo de Episodios ▾"}</span>
          <span className={styles.episodesBadgeCount}>{episodes.length} casos</span>
        </button>
      </div>

      {/* Expandable Archive Drawer */}
      {showAllDrawer && (
        <div className={styles.allEpisodesDrawer}>
          <div className={styles.drawerHeader}>
            <h4>Catálogo General de Expedientes</h4>
            <p>Historial completo de emisiones forenses y lecturas góticas.</p>
          </div>
          <div className={styles.drawerList}>
            {episodes.map((ep, idx) => (
              <div
                key={ep.number}
                className={styles.drawerItem}
                onClick={() => onSelectEpisode(idx)}
              >
                <div className={styles.drawerItemLeft}>
                  <span className={styles.drawerItemNumber}>{ep.number}</span>
                  <div>
                    <h5 className={styles.drawerItemTitle}>{ep.title}</h5>
                    <span className={styles.drawerItemDate}>{ep.date} • {ep.duration}</span>
                  </div>
                </div>
                <button type="button" className={styles.drawerItemBtn}>
                  Abrir ➔
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
