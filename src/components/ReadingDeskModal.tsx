"use client";

import React from "react";
import Image from "next/image";
import AudioPlayer from "./AudioPlayer";
import styles from "./ReadingDeskModal.module.css";
import { Episode } from "@/lib/store";

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
  episode: Partial<Episode> & {
    number: string;
    date: string;
    title: string;
    description: string;
    coverImage: string;
    url: string;
    duration: string;
  };
  onClose: () => void;
}

export default function ReadingDeskModal({ episode, onClose }: ReadingDeskModalProps) {
  const b = episode.bookDetails;
  const cleanTitle = b?.title || episode.title.split(": ")[1] || episode.title;
  const authorName = b?.author || "Nayssa Kristel";
  const startDate = b?.startDate || "27 junio";
  const endDate = b?.endDate || "12 julio";
  const pages = b?.pages || 378;
  const rating = typeof b?.rating === "number" ? b.rating : 4;
  const isRecommended = b?.isRecommended ?? true;
  const formats = b?.formats ?? { physical: false, digital: true, audiobook: true };
  const sagaInfo = b?.sagaInfo || "1";
  const opinionText = b?.opinion || episode.snippet?.text || "Me encantó la ambientación gótica y la tensión narrativa. Los personajes tienen una química oscura inolvidable y el final te deja con ganas de más.";
  const synopsis = b?.description || episode.description;

  const characters = b?.characters && b.characters.length > 0 ? b.characters : [
    { name: "Marcus", role: "El Conde" },
    { name: "Dani", role: "Protagonista" },
    { name: "Lía", role: "Aliada" },
    { name: "Yinn", role: "El Genio" },
    { name: "Altair", role: "Investigador" },
    { name: "Charlotte", role: "Dama de sombras" }
  ];

  const tropes = b?.tropeRatings ?? {
    love: 5,
    anger: 5,
    sadness: 5,
    fantasy: 5,
    spicy: 5,
    laugh: 5,
    ending: 5
  };

  const renderMeter = (icon: string, count: number = 5) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ opacity: i < count ? 1 : 0.25, marginRight: "2px" }}>
        {icon}
      </span>
    ));
  };

  const collagePhoto1 = episode.photoStrip1 || episode.coverImage || "/ep2_perfume_cover.jpg";
  const collagePhoto2 = episode.photoStrip2 || "/ep1_library_cover.jpg";

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.journalCanvas} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">
          ✕
        </button>

        {/* Header Grid: Cover + Reseña Info */}
        <header className={styles.headerGrid}>
          {/* Book Cover Frame */}
          <div className={styles.bookCoverWrapper}>
            <div className={styles.bookCoverFrame}>
              <Image
                src={episode.coverImage || "/ep2_perfume_cover.jpg"}
                alt={cleanTitle}
                fill
                sizes="(max-width: 768px) 100vw, 150px"
                className={styles.bookCoverImg}
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Header Info */}
          <div className={styles.headerInfoCol}>
            <div className={styles.brandBadgeRow}>
              <span className={styles.brandBadge}>✦ DIARIO DEL CLUB ✦</span>
              <span className={styles.brandHandlePill}>@teamsupernova</span>
            </div>

            <div className={styles.bubbleTitleRow}>
              <h1 className={styles.bubbleResenaTitle}>Reseña</h1>
            </div>

            <div className={styles.metaRowField}>
              <span className={styles.metaLabelSymbol}>⫸Título:</span>
              <span className={styles.metaValueHighlight}>{cleanTitle}</span>
            </div>

            <div className={styles.metaRowField}>
              <span className={styles.metaLabelSymbol}>Autor:</span>
              <span className={styles.metaValueAuthor}>{authorName}</span>
            </div>

            <div className={styles.datesAndPagesRow}>
              <div className={styles.dateFieldGroup}>
                <div className={styles.dateLine}>
                  <span className={styles.dateIcon}>✦</span>
                  <span className={styles.dateLabel}>Fecha de inicio:</span>
                  <span className={styles.dateUnderlineVal}>{startDate}</span>
                </div>
                <div className={styles.dateLine}>
                  <span className={styles.dateIcon}>◎</span>
                  <span className={styles.dateLabel}>Fecha de término:</span>
                  <span className={styles.dateUnderlineVal}>{endDate}</span>
                </div>
              </div>

              {/* Cloud Badge for Pages */}
              <div className={styles.cloudPagesBadge}>
                <span className={styles.cloudLabel}>Páginas:</span>
                <span className={styles.cloudNumber}>{pages}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Decorative Divider */}
        <div className={styles.curvedLinesSeparator}>
          <svg viewBox="0 0 100 20" className={styles.swooshSvg}>
            <path d="M5,15 Q30,2 60,12 T95,5" fill="none" stroke="#DCA29C" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M15,18 Q40,5 70,15 T98,8" fill="none" stroke="#DCA29C" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* =========================================
            TWO-COLUMN MAIN BODY
           ========================================= */}
        <div className={styles.mainJournalBody}>
          {/* LEFT COLUMN: RATING, RECOMMENDATION, OPINION & TROPE METERS */}
          <div className={styles.leftJournalCol}>
            {/* 5-Star Rating */}
            <div className={styles.starRatingRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
                  {i < rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            {/* Recommendation & Format Card */}
            <div className={styles.recommendCard}>
              <div className={styles.recommendTopRow}>
                <span className={styles.cardHeaderCute}>¿LO RECOMIENDO?</span>
                <div className={styles.stampCircleSi} title="Recomendado" style={{ opacity: isRecommended ? 1 : 0.4 }}>
                  {isRecommended && <span className={styles.checkMark}>✓</span>}
                </div>
                <div className={styles.stampCircleNo} title="No recomendado" style={{ opacity: !isRecommended ? 1 : 0.4 }}>
                  {!isRecommended ? <span className={styles.checkMark} style={{ color: "#8E3B3B" }}>✕</span> : <span className={styles.noText}>NO</span>}
                </div>
              </div>

              <div className={styles.formatCheckboxList}>
                <label className={styles.checkboxItem}>
                  <span>Libro físico</span>
                  <span className={formats.physical ? styles.customBoxChecked : styles.customBoxUnchecked}>
                    {formats.physical ? "✓" : ""}
                  </span>
                </label>
                <label className={styles.checkboxItem}>
                  <span>Libro digital</span>
                  <span className={formats.digital ? styles.customBoxChecked : styles.customBoxUnchecked}>
                    {formats.digital ? "✓" : ""}
                  </span>
                </label>
                <label className={styles.checkboxItem}>
                  <span>Audiolibro</span>
                  <span className={formats.audiobook ? styles.customBoxChecked : styles.customBoxUnchecked}>
                    {formats.audiobook ? "✓" : ""}
                  </span>
                </label>
              </div>

              <div className={styles.sagaIndicatorRow}>
                <span>Libro 1 de </span>
                <span className={styles.sagaUnderlineNum}>{sagaInfo}</span>
              </div>
            </div>

            {/* Mini Opinion Box */}
            <div className={styles.miniOpinionCard}>
              <span className={styles.miniOpinionHeader}>Mini Opinión</span>
              <p className={styles.miniOpinionParagraph}>
                {opinionText}
              </p>
            </div>

            {/* Mood / Trope Rating Meters */}
            <div className={styles.tropeMetersCard}>
              <div className={styles.tropeRow}>
                <span className={styles.tropeName}>Amor</span>
                <span className={styles.tropeIcons}>{renderMeter("♥", tropes.love ?? 5)}</span>
              </div>
              <div className={styles.tropeRow}>
                <span className={styles.tropeName}>Enojo</span>
                <span className={styles.tropeIcons}>{renderMeter("😡", tropes.anger ?? 5)}</span>
              </div>
              <div className={styles.tropeRow}>
                <span className={styles.tropeName}>Tristeza</span>
                <span className={styles.tropeIcons}>{renderMeter("😢", tropes.sadness ?? 5)}</span>
              </div>
              <div className={styles.tropeRow}>
                <span className={styles.tropeName}>Fantasía</span>
                <span className={styles.tropeIcons}>{renderMeter("✦", tropes.fantasy ?? 5)}</span>
              </div>
              <div className={styles.tropeRow}>
                <span className={styles.tropeName}>Spicy</span>
                <span className={styles.tropeIcons}>{renderMeter("🔥", tropes.spicy ?? 5)}</span>
              </div>
              <div className={styles.tropeRow}>
                <span className={styles.tropeName}>Risa</span>
                <span className={styles.tropeIcons}>{renderMeter("😆", tropes.laugh ?? 5)}</span>
              </div>
              <div className={styles.tropeRow}>
                <span className={styles.tropeName}>Final</span>
                <span className={styles.tropeIcons}>{renderMeter("✦", tropes.ending ?? 5)}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CHARACTERS, SYNOPSIS & MOODBOARD COLLAGE */}
          <div className={styles.rightJournalCol}>
            {/* Characters Box */}
            <div className={styles.charactersCard}>
              <h3 className={styles.charactersCardTitle}>⫸ Personajes ⫷</h3>
              <div className={styles.charactersTwoColGrid}>
                {characters.map((char: { name: string; role: string }, idx: number) => (
                  <div key={idx} className={styles.characterItem}>
                    <span className={styles.characterName}>{char.name}</span>
                    <span className={styles.characterRole}>- {char.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Synopsis Box */}
            <div className={styles.synopsisCard}>
              <h3 className={styles.synopsisCardTitle}>— Sinopsis —</h3>
              <p className={styles.synopsisCardParagraph}>
                {synopsis}
              </p>
            </div>

            {/* Moodboard / Images Describing the Book */}
            <div className={styles.moodboardSection}>
              <h3 className={styles.moodboardTitle}>IMÁGENES QUE DESCRIBAN EL LIBRO</h3>

              <div className={styles.moodboardScrapbookGrid}>
                {/* Spiral Notepad Main Photo */}
                <div className={styles.spiralNotepadItem}>
                  {/* Spiral Rings Header */}
                  <div className={styles.spiralBindingBar}>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className={styles.spiralRing}></span>
                    ))}
                  </div>
                  <div className={styles.spiralPhotoFrame}>
                    <Image
                      src={collagePhoto1}
                      alt="Atmósfera del libro"
                      fill
                      sizes="220px"
                      className={styles.spiralPhotoImg}
                      unoptimized
                    />
                  </div>
                </div>

                {/* Floating Polaroid with Sparkle Accent */}
                <div className={styles.polaroidJewelItem}>
                  <div className={styles.sparkleRaysTop}>
                    <span>\</span><span>|</span><span>/</span>
                  </div>
                  <div className={styles.polaroidFrame}>
                    <Image
                      src={collagePhoto2}
                      alt="Elemento clave"
                      fill
                      sizes="160px"
                      className={styles.polaroidImg}
                      unoptimized
                    />
                  </div>
                  <div className={styles.sparkleRaysBottom}>
                    <span>/</span><span>|</span><span>\</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Integrated Audio Player Bar */}
            <div className={styles.modalAudioFooter}>
              <span className={styles.audioFooterOverline}>
                🎧 ESCUCHAR EPISODIO COMPLETO &bull; {episode.number}
              </span>
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
      </div>
    </div>
  );
}
