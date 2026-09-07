"use client";

import React from "react";
import Image from "next/image";
import AudioPlayer from "./AudioPlayer";
import styles from "./ReadingDeskModal.module.css";

export interface HighlightItem {
  number: string;
  numberColorClass: "pink" | "purple" | "blue";
  highlighterClass: "highlighterPink" | "highlighterPurple" | "highlighterBlue";
  character: string;
  lines: Array<{
    text: string;
    isHighlighted?: boolean;
    prefix?: string;
  }>;
}

interface ReadingDeskModalProps {
  episode: {
    number: string;
    date: string;
    title: string;
    description: string;
    coverImage: string;
    evidenceImage?: string;
    photoStrip1?: string;
    photoStrip2?: string;
    photoStrip3?: string;
    url: string;
    duration: string;
    bookDetails?: {
      title: string;
      author: string;
      description: string;
      coverIcon?: string;
    };
    snippet?: {
      text: string;
      highlights: string[];
    };
    annotations?: Array<{ text: string; position: string }>;
  };
  onClose: () => void;
}

export default function ReadingDeskModal({ episode, onClose }: ReadingDeskModalProps) {
  const cleanTitle = episode.bookDetails?.title || episode.title.split(": ")[1] || episode.title;
  const authorName = episode.bookDetails?.author || "Clara Thorne";
  const quoteText = episode.snippet?.text || "“El veneno no tiene olor para el hombre que ama con locura. Bebió el elixir sin vacilar, mirándome directo a los ojos...”";

  // Book analysis points
  const bookKeyPoints = [
    { title: "PREMISA", detail: "Una perfumista de la alta sociedad crea fragancias letales para vengar su pasado." },
    { title: "EL ENCUENTRO", detail: "Un baile victoriano donde cruza miradas con el inspector que sigue su rastro." },
    { title: "LA CITA CLAVE", detail: "“El veneno no tiene olor para el hombre que ama con locura.”" },
    { title: "INTRIGA", detail: "Secretos familiares, pistas en aromas y un dilema entre la verdad y el corazón." },
  ];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.scrapbookCanvas} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">
          ✕
        </button>

        {/* Pink Textured Background with Lace Doily */}
        <div className={styles.pinkBackdrop}>
          {/* Subtle Lace Corner */}
          <div className={styles.laceDoily}>
            <svg viewBox="0 0 140 140" width="100%" height="100%">
              <path
                d="M0,0 Q70,18 140,0 Q120,70 140,140 Q70,120 0,140 Q18,70 0,0 Z"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <circle cx="35" cy="35" r="24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2,2" />
            </svg>
          </div>

          {/* =========================================
              CRUMPLED POWDER BLUE PINNED BULLETIN SHEET
             ========================================= */}
          <main className={styles.crumpledBlueSheet}>
            {/* Realistic Crumpled Paper Filter & Shading Overlay */}
            <svg className={styles.crumpleSvgFilter} aria-hidden="true">
              <filter id="crumpleFilter" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" result="noise" />
                <feDiffuseLighting in="noise" lightingColor="#ffffff" surfaceScale="2.8" result="light">
                  <feDistantLight azimuth="55" elevation="50" />
                </feDiffuseLighting>
                <feBlend mode="multiply" in="SourceGraphic" in2="light" />
              </filter>
            </svg>

            {/* Visual Deep Crumple Creases & Folds */}
            <div className={styles.creasedPaperFolds}>
              <svg viewBox="0 0 800 600" preserveAspectRatio="none" className={styles.wrinkleSvg}>
                {/* Diagonal sharp paper creases */}
                <polygon points="0,0 240,180 180,0" fill="rgba(255,255,255,0.18)" />
                <polygon points="240,180 500,0 600,280" fill="rgba(18,38,58,0.06)" />
                <polygon points="0,320 220,600 0,600" fill="rgba(255,255,255,0.14)" />
                <polygon points="220,600 580,380 800,600" fill="rgba(18,38,58,0.08)" />
                <polygon points="580,380 800,160 800,600" fill="rgba(255,255,255,0.16)" />

                <line x1="0" y1="120" x2="380" y2="0" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" />
                <line x1="0" y1="123" x2="383" y2="3" stroke="rgba(18,38,58,0.25)" strokeWidth="3" />

                <line x1="180" y1="600" x2="650" y2="0" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />
                <line x1="183" y1="600" x2="653" y2="3" stroke="rgba(18,38,58,0.28)" strokeWidth="3.5" />

                <line x1="0" y1="420" x2="520" y2="600" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
                <line x1="0" y1="423" x2="520" y2="603" stroke="rgba(18,38,58,0.22)" strokeWidth="3" />

                <line x1="450" y1="180" x2="800" y2="340" stroke="rgba(255,255,255,0.8)" strokeWidth="3" />
                <line x1="450" y1="183" x2="800" y2="343" stroke="rgba(18,38,58,0.26)" strokeWidth="3.5" />
              </svg>
            </div>

            {/* Silver Metallic Pushpin */}
            <div className={styles.silverPushpin}></div>

            {/* =========================================
                PHOTO STRIP OVERLAPPING THE LEFT CORNER
               ========================================= */}
            <div className={styles.cornerPhotoStrip}>
              {/* Top Polaroid: Hero Book Cover */}
              <div className={styles.polaroidHero}>
                <div className={styles.polaroidFrameImg}>
                  <Image
                    src={episode.coverImage || "/ep2_perfume_cover.jpg"}
                    alt={cleanTitle}
                    width={130}
                    height={140}
                    className={styles.realPhoto}
                    priority
                  />
                </div>
              </div>

              {/* Vertical Film Strip overlapping */}
              <div className={styles.photoStripColumn}>
                <div className={styles.photoFrameItem}>
                  <Image
                    src={episode.photoStrip1 || "/ep1_library_cover.jpg"}
                    alt="Atmósfera"
                    width={110}
                    height={65}
                    className={styles.realPhoto}
                    unoptimized
                  />
                </div>
                <div className={styles.photoFrameItem}>
                  <Image
                    src={episode.photoStrip2 || "/ep3_forensic_cover.jpg"}
                    alt="Detalles"
                    width={110}
                    height={65}
                    className={styles.realPhoto}
                    unoptimized
                  />
                </div>
                <div className={styles.photoFrameItem}>
                  <Image
                    src={episode.photoStrip3 || episode.coverImage || "/ep2_perfume_cover.jpg"}
                    alt="Novela"
                    width={110}
                    height={65}
                    className={styles.realPhoto}
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Lipstick Kiss Stamp Mark */}
            <div className={styles.lipstickKissStamp}>
              <svg viewBox="0 0 100 70" width="100%" height="100%">
                <path
                  d="M15,25 Q35,5 50,18 Q65,5 85,25 Q70,40 50,30 Q30,40 15,25 Z M20,40 Q50,65 80,40 Q65,55 50,52 Q35,55 20,40 Z"
                  fill="#E85D75"
                  opacity="0.32"
                />
              </svg>
            </div>

            {/* Top Right Torn Paper Scrap with Book Title */}
            <div className={styles.topRightTornNote}>
              <div className={styles.washiTapePink}></div>
              <div className={styles.metalPaperclip}></div>
              <span className={styles.scriptPinkTitle}>{cleanTitle}</span>
              <span className={styles.scriptSubTitle}>Por {authorName} &bull; Club de Lectura</span>
            </div>

            {/* Right Main Content Area on the Blue Sheet */}
            <div className={styles.sheetMainContent}>
              {/* Header Title (Moved down generously to avoid any overlap) */}
              <h1 className={styles.playlistHeaderTitle}>DIARIO DE LECTURA</h1>

              {/* Book Highlights List */}
              <ul className={styles.bookHighlightsList}>
                {bookKeyPoints.map((item, idx) => (
                  <li key={idx} className={styles.bookRow}>
                    <span className={styles.navyBullet}>•</span>
                    <strong className={styles.bookPointTitle}>{item.title}:</strong>
                    <span className={styles.bookPointDetail}>{item.detail}</span>
                  </li>
                ))}
              </ul>

              {/* Quote Highlight Box */}
              <div className={styles.quoteBoxArea}>
                <p className={styles.quoteBoxText}>{quoteText}</p>
              </div>

              {/* Bottom Availability Box */}
              <div className={styles.bottomPreorderBox}>
                <p className={styles.pinkPreorderText}>
                  🎙️ ESCUCHA EL ANÁLISIS EN SPOTIFY &bull; {cleanTitle.toUpperCase()}
                </p>
                <p className={styles.navyKindleText}>
                  TEAM SUPERNOVA &bull; UNA OBRA DE {authorName.toUpperCase()}
                </p>
              </div>
            </div>

            {/* =========================================
                BOTTOM RIGHT: PHOTOREALISTIC CASSETTE TAPE
               ========================================= */}
            <div className={styles.diagonalCassette}>
              <div className={styles.realisticCassette}>
                {/* Corner Screws */}
                <div className={`${styles.screw} ${styles.screwTL}`}></div>
                <div className={`${styles.screw} ${styles.screwTR}`}></div>
                <div className={`${styles.screw} ${styles.screwBL}`}></div>
                <div className={`${styles.screw} ${styles.screwBR}`}></div>

                {/* White Stamped Label */}
                <div className={styles.cassetteSticker}>
                  <div className={styles.stickerHeaderLine}>
                    <span className={styles.sideLabel}>SIDE A • {episode.number}</span>
                    <span className={styles.typeLabel}>{episode.duration}</span>
                  </div>
                  <div className={styles.cassetteHandwriting}>
                    <span className={styles.tapeTitlePink}>{cleanTitle}</span>
                    <span className={styles.tapeKissMark}></span>
                  </div>
                </div>

                {/* Realistic Tape Mechanism */}
                <div className={styles.mechanicalSection}>
                  <div className={styles.tapeSpoolGear}>
                    <div className={styles.gearTeeth}></div>
                  </div>

                  <div className={styles.clearTapeWindow}>
                    <div className={styles.magneticRibbonLeft}></div>
                    <div className={styles.magneticRibbonRight}></div>
                    <div className={styles.tapeRulerMarks}>
                      <span>100</span>
                      <span>50</span>
                      <span>0</span>
                    </div>
                  </div>

                  <div className={styles.tapeSpoolGear}>
                    <div className={styles.gearTeeth}></div>
                  </div>
                </div>

                {/* Live Embedded Audio Player */}
                <div className={styles.cassettePlayerOverlay}>
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
