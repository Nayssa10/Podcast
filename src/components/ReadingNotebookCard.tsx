"use client";

import React from "react";
import Image from "next/image";
import AudioPlayer from "./AudioPlayer";
import styles from "./ReadingNotebookCard.module.css";

interface ReadingNotebookCardProps {
  episode: {
    number: string;
    date: string;
    title: string;
    description: string;
    coverImage: string;
    photoStrip1?: string;
    url: string;
    duration: string;
    bookDetails?: {
      title: string;
      author: string;
      description: string;
      coverIcon?: string;
    };
  };
  onSelect: () => void;
}

export default function ReadingNotebookCard({ episode, onSelect }: ReadingNotebookCardProps) {
  const cleanTitle = episode.title.split(": ")[1] || episode.title;
  const bookTitle = episode.bookDetails?.title || cleanTitle;
  const bookAuthor = episode.bookDetails?.author || "Clara Thorne";

  return (
    <div className={styles.cardWrapper} onClick={onSelect} aria-label={`Libro: ${bookTitle}`}>
      {/* Background Decorative Mini Polaroids */}
      <div className={styles.polaroidBackdropLeft}>
        <div className={styles.polaroidFrame}>
          <div className={styles.polaroidInnerImg}>
            <Image 
              src={episode.coverImage || "/ep2_perfume_cover.jpg"} 
              alt="Polaroid background" 
              width={52} 
              height={52}
              className={styles.polaroidImg}
            />
          </div>
        </div>
      </div>

      <div className={styles.polaroidBackdropRight}>
        <div className={styles.polaroidFrame}>
          <div className={styles.polaroidInnerImg}>
            <Image 
              src={episode.photoStrip1 || "/ep1_library_cover.jpg"} 
              alt="Polaroid background" 
              width={52} 
              height={52}
              className={styles.polaroidImg}
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Main Lined Notebook Sheet */}
      <article className={styles.notebookSheet}>
        {/* Red Pushpin */}
        <div className={styles.pushPin}></div>

        {/* Binder Ring Holes on Left */}
        <div className={styles.binderHoles}>
          <span className={styles.hole}></span>
          <span className={styles.hole}></span>
          <span className={styles.hole}></span>
          <span className={styles.hole}></span>
        </div>

        {/* Vertical Red Margin Line */}
        <div className={styles.marginLine}></div>

        {/* Sheet Content Area */}
        <div className={styles.sheetContent} onClick={(e) => e.stopPropagation()}>
          {/* Header Tag */}
          <div className={styles.sheetHeader}>
            <div className={styles.categoryRow}>
              <span className={styles.categoryTag}>CATEGORÍA: LECTURA</span>
              <span className={styles.tbrLabel}>TBR • {episode.number}</span>
            </div>
            <h4 className={styles.tbrSub}>REASONS WHY YOU SHOULD READ</h4>
            <span className={styles.episodeMeta}>{episode.date}</span>
          </div>

          {/* Book Title & Mini Cover Area */}
          <div className={styles.bookTitleRow}>
            <div className={styles.titleInfo}>
              <h3 className={styles.notebookTitle}>{bookTitle}</h3>
              <p className={styles.notebookAuthor}>por {bookAuthor}</p>
            </div>

            {/* Extra Small Mini Book Cover */}
            <div className={styles.miniCoverContainer}>
              <Image
                src={episode.coverImage}
                alt={bookTitle}
                width={40}
                height={56}
                className={styles.miniCover}
              />
            </div>
          </div>

          {/* Checklist of Tropes / Reasons */}
          <ul className={styles.checklist}>
            <li className={styles.checkItem}>
              <span className={styles.checkIcon}>☑</span>
              <span>romance gótico & misterio</span>
            </li>
            <li className={styles.checkItem}>
              <span className={styles.checkIcon}>☑</span>
              <span>química intensa & intriga</span>
            </li>
            <li className={styles.checkItem}>
              <span className={styles.checkIcon}>☑</span>
              <span>toxicología & secretos</span>
            </li>
          </ul>

          {/* Compact Audio Player */}
          <div className={styles.sheetAudio}>
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

          {/* Action Button */}
          <button 
            className={styles.readMoreBtn}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            SABER MÁS
          </button>
        </div>
      </article>
    </div>
  );
}
