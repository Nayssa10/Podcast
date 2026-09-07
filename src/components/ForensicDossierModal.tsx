"use client";

import React from "react";
import Image from "next/image";
import AudioPlayer from "./AudioPlayer";
import styles from "./ForensicDossierModal.module.css";

interface ForensicDossierModalProps {
  episode: {
    number: string;
    date: string;
    title: string;
    description: string;
    coverImage: string;
    evidenceImage?: string;
    url: string;
    duration: string;
    bookDetails?: {
      title: string;
      author: string;
      description: string;
      coverIcon?: string;
    };
    forensicDetails: {
      criminologyDetails: string;
      keyPhysicalEvidence: string[];
      forensicFocus: string;
    };
    snippet?: {
      text: string;
      highlights: string[];
    };
    headlineQuestion?: string;
    authorName?: string;
  };
  onClose: () => void;
}

export default function ForensicDossierModal({ episode, onClose }: ForensicDossierModalProps) {
  const cleanTitle = episode.title.split(": ")[1] || episode.title;
  const host = episode.authorName || "Nayssa Kristel";
  const book = episode.bookDetails;
  const forensic = episode.forensicDetails;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <article className={styles.folderDossier} onClick={(e) => e.stopPropagation()}>
        {/* Physical Manila Folder Tab with Stapled Label */}
        <div className={styles.folderTopTab}>
          <div className={styles.tabMetalClip}></div>
          <div className={styles.tabCaseStamp}>
            <span className={styles.tabBadge}>DIVISIÓN CRIMINALÍSTICA</span>
            <span className={styles.tabCaseNumber}>EXP. #{episode.number}</span>
          </div>
          <button className={styles.closeFolderBtn} onClick={onClose} aria-label="Cerrar expediente">
            CERRAR ARCHIVO ✕
          </button>
        </div>

        {/* Inner Document Paper (Parchment Manila Sheet) */}
        <div className={styles.dossierSheet}>
          {/* Header Banner: Police Department / Criminology Report Header */}
          <header className={styles.dossierHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.sealBadge}>
                <span className={styles.sealIcon}>⚖️</span>
                <div className={styles.sealText}>
                  <strong>TEAM SUPERNOVA</strong>
                  <span>DEPARTAMENTO DE PERITAJE & LETRAS</span>
                </div>
              </div>
              <div className={styles.caseReferenceLine}>
                <span>REGISTRO: <strong>{episode.number}</strong></span>
                <span>FECHA DE EMISIÓN: <strong>{episode.date}</strong></span>
                <span>PERITO: <strong>{host}</strong></span>
              </div>
            </div>

            <div className={styles.headerStamps}>
              <div className={styles.stampClassified}>TOP SECRET • CONFIDENCIAL</div>
              <div className={styles.stampVerified}>DICTAMEN VERIFICADO ✓</div>
            </div>
          </header>

          {/* Case Title Section */}
          <section className={styles.caseTitleSection}>
            <div className={styles.caseOverline}>INFORME TÉCNICO PERICIAL & ANÁLISIS FORENSE</div>
            <h1 className={styles.caseMainTitle}>{cleanTitle}</h1>
            {book && (
              <p className={styles.caseBookSub}>
                Obra en investigación: <em>&ldquo;{book.title}&rdquo;</em> — Autor: <strong>{book.author}</strong>
              </p>
            )}
          </section>

          {/* Grid Layout: Visual Evidence & Case Summary */}
          <div className={styles.dossierGrid}>
            {/* Left Column: Evidence Photo + Clues */}
            <div className={styles.evidenceCol}>
              {/* Evidence Photo with Paperclip & Tape */}
              <div className={styles.evidencePhotoFrame}>
                <div className={styles.photoTape}></div>
                <div className={styles.metalPaperclip}></div>
                
                <div className={styles.photoContainer}>
                  <Image
                    src={episode.evidenceImage || episode.coverImage || "/ep1_library_cover.jpg"}
                    alt={cleanTitle}
                    width={320}
                    height={320}
                    className={styles.evidencePhoto}
                  />
                  <div className={styles.photoStampLabel}>
                    EVIDENCIA FOTOGRÁFICA N° 01 • LUGAR DEL SUCESO
                  </div>
                </div>

                <div className={styles.photoCaption}>
                  <p>Escena analizada: Reconstrucción balística y perimétrica.</p>
                </div>
              </div>

              {/* Physical Evidence Chain */}
              <div className={styles.chainOfCustodyBox}>
                <div className={styles.chainHeader}>
                  <span className={styles.chainIcon}>🏷️</span>
                  <h4>CADENA DE CUSTODIA • ELEMENTOS RECOLECTADOS</h4>
                </div>
                <ul className={styles.evidenceItemList}>
                  {forensic.keyPhysicalEvidence.map((item, idx) => (
                    <li key={idx} className={styles.evidenceTagItem}>
                      <span className={styles.evidenceNumber}>MUESTRA #{idx + 1}</span>
                      <span className={styles.evidenceText}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Forensic Findings & Report Notes */}
            <div className={styles.reportCol}>
              {/* Typewriter Report Sheet */}
              <div className={styles.typewriterSheet}>
                <div className={styles.typewriterHeader}>
                  <h5>DECLARACIÓN DE LOS HECHOS & SINOPSIS DEL CASO</h5>
                  <span className={styles.typewriterPageNum}>PÁG. 1 / 2</span>
                </div>
                <p className={styles.typewriterParagraph}>{episode.description}</p>

                {book && (
                  <div className={styles.literaryContextBlock}>
                    <strong>CONTEXTO LITERARIO:</strong>
                    <p>{book.description}</p>
                  </div>
                )}
              </div>

              {/* Criminology Dictum Box */}
              <div className={styles.criminologyDictum}>
                <div className={styles.dictumTitle}>
                  <span>🔬</span>
                  <h4>DICTAMEN DE CRIMINALÍSTICA FORENSE</h4>
                </div>
                <p className={styles.dictumContent}>{forensic.criminologyDetails}</p>

                <div className={styles.forensicFocusBadge}>
                  <span className={styles.focusLabel}>ESPECIALIDAD FORENSE APLICADA:</span>
                  <p className={styles.focusValue}>{forensic.forensicFocus}</p>
                </div>
              </div>

              {/* Handwritten Note / Inspector Marginalia */}
              {episode.snippet && (
                <div className={styles.handwrittenStickyNote}>
                  <div className={styles.pinDot}></div>
                  <span className={styles.stickyTitle}>Nota Marginal del Perito:</span>
                  <p className={styles.stickyQuote}>{episode.snippet.text}</p>
                </div>
              )}
            </div>
          </div>

          {/* Audio Player Evidence Reel */}
          <footer className={styles.audioEvidenceBar}>
            <div className={styles.audioTapeLabel}>
              <span className={styles.audioRecDot}></span>
              <span>CINTA MAGNETOFÓNICA DE AUDIO • EPISODIO {episode.number} ({episode.duration})</span>
            </div>
            <AudioPlayer
              track={{
                title: episode.title,
                description: episode.description,
                url: episode.url,
                duration: episode.duration,
              }}
              variant="compact"
            />
          </footer>
        </div>
      </article>
    </div>
  );
}
