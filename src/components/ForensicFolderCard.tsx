"use client";

import React from "react";
import AudioPlayer from "./AudioPlayer";
import styles from "./ForensicFolderCard.module.css";

interface ForensicFolderCardProps {
  episode: {
    number: string;
    date: string;
    title: string;
    description: string;
    coverImage: string;
    url: string;
    duration: string;
  };
  onSelect: () => void;
}

export default function ForensicFolderCard({ episode, onSelect }: ForensicFolderCardProps) {
  // Clean up title (remove EP number prefix if present)
  const cleanTitle = episode.title.split(": ")[1] || episode.title;

  return (
    <article className={styles.folderCardContainer} onClick={onSelect} aria-label={`Expediente: ${cleanTitle}`}>
      {/* Folder Tab on the right side */}
      <div className={styles.folderTab}>
        <div className={styles.tabStamp}>
          TOP SECRET
        </div>
      </div>

      {/* Fold Crease Line */}
      <div className={styles.creaseLine}></div>

      {/* Direct folder content (written on the folder) */}
      <div className={styles.folderContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.folderHeader}>
          <span className={styles.categoryTag}>CATEGORÍA: CRIMINALÍSTICA</span>
          <span className={styles.redStamp}>CONFIDENCIAL</span>
        </div>
        <div className={styles.subHeader}>
          <span className={styles.blackStamp}>DIVISIÓN FORENSE • {episode.number}</span>
        </div>

        <div className={styles.titleWrapper}>
          <h3 className={styles.folderTitle}>{cleanTitle}</h3>
          <span className={styles.greenStamp}>✓ REVISADO</span>
        </div>
        
        <div className={styles.folderAudio}>
          <AudioPlayer
            track={{
              title: episode.title,
              description: episode.description,
              url: episode.url,
              duration: episode.duration,
            }}
            variant="compact"
          />
        </div>
      </div>

      {/* Decorative Pocket Watch & Chain (Bottom Right) */}
      <div className={styles.pocketWatchContainer}>
        <svg viewBox="0 0 180 180" className={styles.pocketWatch} aria-hidden="true">
          <defs>
            <linearGradient id="watchSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#555" />
              <stop offset="50%" stopColor="#9c9c9c" />
              <stop offset="100%" stopColor="#333" />
            </linearGradient>
            <linearGradient id="watchGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#fff8dc" />
              <stop offset="100%" stopColor="#8b6508" />
            </linearGradient>
            <linearGradient id="watchDial" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c221b" />
              <stop offset="100%" stopColor="#1a1410" />
            </linearGradient>
          </defs>
          
          {/* Chain looping to the left */}
          <path 
            d="M 10 120 Q 50 160, 90 140 T 150 100" 
            fill="none" 
            stroke="url(#watchSteel)" 
            strokeWidth="3.5" 
            strokeDasharray="1,4" 
            strokeLinecap="round"
          />
          <path 
            d="M 10 120 Q 50 160, 90 140 T 150 100" 
            fill="none" 
            stroke="url(#watchSteel)" 
            strokeWidth="1.5" 
            opacity="0.8"
          />

          <g>
            {/* Winding Stem */}
            <rect x="110" y="32" width="10" height="12" fill="url(#watchSteel)" rx="1" transform="rotate(30 115 38)" />
            <circle cx="115" cy="25" r="8" fill="none" stroke="url(#watchSteel)" strokeWidth="2.5" transform="rotate(30 115 25)" />
            
            {/* Watch Outer Case */}
            <circle cx="90" cy="90" r="42" fill="url(#watchSteel)" />
            {/* Bezel */}
            <circle cx="90" cy="90" r="38" fill="url(#watchGold)" />
            <circle cx="90" cy="90" r="36" fill="#0f0b08" />
            
            {/* Watch Face */}
            <circle cx="90" cy="90" r="32" fill="url(#watchDial)" />
            
            {/* Gears details */}
            <circle cx="90" cy="90" r="13" fill="none" stroke="url(#watchGold)" strokeWidth="1.5" strokeDasharray="3,1" opacity="0.8" />
            <circle cx="84" cy="94" r="8" fill="none" stroke="url(#watchSteel)" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
            
            {/* Markings */}
            <circle cx="90" cy="90" r="26" fill="none" stroke="url(#watchGold)" strokeWidth="0.5" strokeDasharray="1,4" opacity="0.6" />
            
            {/* Hands */}
            <line x1="90" y1="90" x2="82" y2="76" stroke="url(#watchGold)" strokeWidth="2" strokeLinecap="round" />
            <line x1="90" y1="90" x2="106" y2="84" stroke="url(#watchGold)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="90" y1="90" x2="84" y2="106" stroke="#e0533c" strokeWidth="0.8" />
            
            {/* Gleam */}
            <path d="M 62 75 A 32 32 0 0 1 115 68 A 30 30 0 0 0 62 75 Z" fill="rgba(255,255,255,0.12)" />
          </g>
        </svg>
      </div>

      {/* Stamped Evidence Tag / Bottom Details Button */}
      <div className={styles.folderBottom}>
        <div className={styles.evidenceStampContainer}>
          <span className={styles.evidenceDate}>{episode.date}</span>
          <span className={styles.evidenceLabel}>CASE FILE • {episode.number}</span>
        </div>
        <button 
          className={styles.openDossierBtn} 
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          ABRIR EXPEDIENTE
        </button>
      </div>
    </article>
  );
}
