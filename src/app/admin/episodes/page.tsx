"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./episodes.module.css";
import { Episode } from "@/lib/store";
import { IconSearch, IconSettings, IconEpisodes } from "@/components/admin/AdminIcons";

export default function AdminEpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [filter, setFilter] = useState<"all" | "forensic" | "book">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const fetchEpisodes = () => {
    fetch("/api/episodes", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        setEpisodes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás segura de eliminar el episodio "${title}"?`)) return;

    try {
      const res = await fetch(`/api/episodes?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchEpisodes();
      }
    } catch {
      alert("Error al eliminar episodio");
    }
  };

  const filteredEpisodes = episodes.filter(ep => {
    const matchesFilter = filter === "all" ? true : ep.type === filter;
    const matchesSearch = searchQuery
      ? ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.number.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesFilter && matchesSearch;
  });

  const forensicCount = episodes.filter(e => e.type === "forensic").length;
  const bookCount = episodes.filter(e => e.type === "book").length;

  return (
    <div className={styles.episodesPageContainer}>
      {/* Top Header & Search Bar */}
      <div className={styles.topHeaderSection}>
        <div className={styles.headerTitleGroup}>
          <h2 className={styles.episodesMainHeading}>Gestión de Episodios</h2>
          <span className={styles.headerSubtitle}>Catálogo general de casos y expedientes literarios</span>
        </div>

        <div className={styles.headerRightActions}>
          <div className={styles.searchBarWrapper}>
            <span className={styles.searchIcon}>
              <IconSearch size={15} />
            </span>
            <input
              type="text"
              placeholder="Buscar expediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchBarInput}
            />
            <span className={styles.searchShortcut}>⌘K</span>
          </div>

          <Link href="/admin/episodes/new" className={styles.newEpisodeTopBtn}>
            + Nuevo Episodio
          </Link>
        </div>
      </div>

      {/* Decorative Announcement / Category Strip */}
      <div className={styles.announcementStrip}>
        <div className={styles.filterPillsGroup}>
          <button
            onClick={() => setFilter("all")}
            className={`${styles.categoryTabBtn} ${filter === "all" ? styles.categoryTabActive : ""}`}
          >
            Todos ({episodes.length})
          </button>
          <button
            onClick={() => setFilter("forensic")}
            className={`${styles.categoryTabBtn} ${filter === "forensic" ? styles.categoryTabActive : ""}`}
          >
            Criminalística ({forensicCount})
          </button>
          <button
            onClick={() => setFilter("book")}
            className={`${styles.categoryTabBtn} ${filter === "book" ? styles.categoryTabActive : ""}`}
          >
            Romance ({bookCount})
          </button>
        </div>
        <span className={styles.stripNote}>Temporada 2026 &bull; {episodes.length} episodios registrados</span>
      </div>

      {/* Main 2-Column Bento Grid: Left Cards + Right To-Do/Activity Sidebar */}
      <div className={styles.mainEpisodesGrid}>
        {/* Left Grid Area */}
        <div className={styles.cardsColumn}>
          {loading ? (
            <p style={{ color: "#8E7F6E", padding: "2rem" }}>Cargando catálogo...</p>
          ) : (
            <div className={styles.cardsGrid}>
              {/* Card 1: Overview Summary Card (GPA Overview style) */}
              <div className={styles.overviewSummaryCard}>
                <div className={styles.summaryCardHeader}>
                  <div className={styles.summaryTitleGroup}>
                    <span className={styles.infoIcon}>ⓘ</span>
                    <h3 className={styles.summaryTitle}>Resumen de Emisiones</h3>
                  </div>
                  <span className={styles.gearIcon}>
                    <IconSettings size={15} />
                  </span>
                </div>

                <div className={styles.statBoxesRow}>
                  <div className={styles.statBox}>
                    <span className={styles.statBoxNumber}>{episodes.length}.00</span>
                    <span className={styles.statBoxLabel}>Publicados</span>
                  </div>
                  <div className={styles.statBox}>
                    <span className={styles.statBoxNumber}>100%</span>
                    <span className={styles.statBoxLabel}>Completos</span>
                  </div>
                </div>

                <div className={styles.summaryCardFooter}>
                  <Link href="/admin/profile" className={styles.summaryCardLink}>
                    Ver dossier de creadora &gt;
                  </Link>
                </div>
              </div>

              {/* Dynamic Episode Cards (Matching Classroom Cards from Reference) */}
              {filteredEpisodes.map((ep) => (
                <article key={ep.id} className={styles.classroomEpisodeCard}>
                  {/* Top Image Container with badges */}
                  <div className={styles.cardImageContainer}>
                    <Image
                      src={ep.coverImage || "/logo-clean.png"}
                      alt={ep.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className={styles.cardCoverImg}
                      unoptimized
                    />
                    
                    {/* Top Left Badge (e.g. 100% or Category) */}
                    <span className={styles.percentBadge}>
                      {ep.type === "forensic" ? "100%" : "95%"}
                    </span>

                    {/* Top Right Dots Menu */}
                    <button
                      type="button"
                      className={styles.dotsMenuBtn}
                      onClick={() => setActiveMenuId(activeMenuId === ep.id ? null : ep.id)}
                      aria-label="Opciones"
                    >
                      ⋮
                    </button>

                    {/* Context Dropdown */}
                    {activeMenuId === ep.id && (
                      <div className={styles.cardDropdownMenu}>
                        <Link href={`/admin/episodes/${ep.id}/edit`} className={styles.dropdownOption}>
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(ep.id, ep.title)}
                          className={`${styles.dropdownOption} ${styles.dropdownDelete}`}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className={styles.cardDetailsBody}>
                    <h4 className={styles.cardEpTitle}>{ep.title}</h4>
                    <span className={styles.cardEpCode}>
                      {ep.number} / {ep.type === "forensic" ? "CRIMINALÍSTICA" : "ROMANCE"}
                    </span>
                    <p className={styles.cardEpYear}>
                      Temporada 2026 &bull; {ep.duration} min &bull; Alta Definición
                    </p>

                    {/* Action Icons Row */}
                    <div className={styles.cardActionRow}>
                      <Link
                        href={`/admin/episodes/${ep.id}/edit`}
                        className={styles.actionIconBtn}
                        title="Editar expediente"
                      >
                        <span className={styles.actionIconSvg}>✎</span>
                      </Link>

                      <a
                        href={ep.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionIconBtn}
                        title="Reproducir audio"
                      >
                        <span className={styles.actionIconSvg}>🔊</span>
                      </a>

                      <button
                        onClick={() => handleDelete(ep.id, ep.title)}
                        className={`${styles.actionIconBtn} ${styles.actionDeleteIcon}`}
                        title="Eliminar expediente"
                      >
                        <span className={styles.actionIconSvg}>✕</span>
                      </button>
                    </div>

                    {/* Card Footer: Date info & Chevron */}
                    <div className={styles.cardBottomFooter}>
                      <div className={styles.dueInfoGroup}>
                        <span className={styles.dueLabel}>Emisión:</span>
                        <span className={styles.dueValue}>{ep.date}</span>
                      </div>
                      <Link href={`/admin/episodes/${ep.id}/edit`} className={styles.chevronLink}>
                        ⌵
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Right To-Do & Activity Sidebar (Exact Match to Reference Right Panel) */}
        <aside className={styles.rightActivityPanel}>
          {/* Header */}
          <div className={styles.todoPanelHeader}>
            <h3 className={styles.todoTitle}>Control &amp; Tareas</h3>
            <span className={styles.syncBadge}>✦ Sincronizado</span>
          </div>

          {/* Week Selector */}
          <div className={styles.weekSelectorRow}>
            <span className={styles.weekPillLabel}>Semana ▾</span>
            <div className={styles.weekNavArrows}>
              <span>&larr;</span>
              <span className={styles.weekDateRange}>Set 01 - Set 07</span>
              <span>&rarr;</span>
            </div>
          </div>

          {/* Multi-Ring Activity Chart Widget */}
          <div className={styles.multiRingChartCard}>
            <div className={styles.concentricCirclesWrapper}>
              <svg className={styles.concentricSvg} viewBox="0 0 160 160">
                {/* Outer Ring */}
                <circle cx="80" cy="80" r="70" className={styles.ringTrack} />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  className={styles.ringOuter}
                  strokeDasharray="440"
                  strokeDashoffset="110" /* 75% */
                />

                {/* Middle Ring */}
                <circle cx="80" cy="80" r="54" className={styles.ringTrack} />
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  className={styles.ringMiddle}
                  strokeDasharray="340"
                  strokeDashoffset="68" /* 80% */
                />

                {/* Inner Ring */}
                <circle cx="80" cy="80" r="38" className={styles.ringTrack} />
                <circle
                  cx="80"
                  cy="80"
                  r="38"
                  className={styles.ringInner}
                  strokeDasharray="240"
                  strokeDashoffset="120" /* 50% */
                />
              </svg>

              <div className={styles.ringCenterValue}>
                <span className={styles.ringPercentText}>75%</span>
                <span className={styles.ringFractionText}>{episodes.length}/4 Casos</span>
              </div>
            </div>

            {/* Dots Category Legend */}
            <div className={styles.dotsLegendGrid}>
              <div className={styles.legendDotItem}>
                <span className={`${styles.colorDot} ${styles.dotRose}`}></span>
                <span>Forense</span>
              </div>
              <div className={styles.legendDotItem}>
                <span className={`${styles.colorDot} ${styles.dotTeal}`}></span>
                <span>Romance</span>
              </div>
              <div className={styles.legendDotItem}>
                <span className={`${styles.colorDot} ${styles.dotGold}`}></span>
                <span>Emisión</span>
              </div>
              <div className={styles.legendDotItem}>
                <span className={`${styles.colorDot} ${styles.dotPurple}`}></span>
                <span>Guion</span>
              </div>
            </div>

            {/* Icon Filters Tab */}
            <div className={styles.quickFilterTabs}>
              <button className={styles.quickFilterBtn} title="Grabaciones">
                <IconEpisodes size={13} style={{ verticalAlign: "middle", marginRight: "4px" }} /> {episodes.length}
              </button>
              <button className={styles.quickFilterBtn} title="Dictámenes">
                Dictámenes ({episodes.length * 2})
              </button>
              <button className={styles.quickFilterBtn} title="Publicados">
                Activos ({episodes.length})
              </button>
            </div>
          </div>

          {/* Pending Tasks / Checklist Section */}
          <div className={styles.tasksSection}>
            <div className={styles.tasksHeaderRow}>
              <span className={styles.taskCountBadge}>4</span>
              <span className={styles.taskSectionTitle}>Pendientes &amp; Próximos Pasos</span>
              <span className={styles.taskAccordionArrow}>▾</span>
            </div>

            <div className={styles.taskItemsList}>
              <div className={styles.taskItemCard}>
                <div className={styles.taskCheckboxCircle}></div>
                <div className={styles.taskTextContent}>
                  <div className={styles.taskTagLine}>EXP-04 / BALÍSTICA</div>
                  <h5 className={styles.taskItemHeading}>Revisar dictamen de trayectoria de impacto</h5>
                  <span className={styles.taskItemDue}>Para el 12 de Set &bull; Peritaje</span>
                </div>
              </div>

              <div className={styles.taskItemCard}>
                <div className={styles.taskCheckboxCircle}></div>
                <div className={styles.taskTextContent}>
                  <div className={styles.taskTagLine}>CLUB DE LECTURA</div>
                  <h5 className={styles.taskItemHeading}>Seleccionar 3 fotos de atmósfera para la tira</h5>
                  <span className={styles.taskItemDue}>Para el 15 de Set &bull; Diario</span>
                </div>
              </div>

              <div className={styles.taskItemCard}>
                <div className={styles.taskCheckboxCircle}></div>
                <div className={styles.taskTextContent}>
                  <div className={styles.taskTagLine}>BUZÓN DE OYENTES</div>
                  <h5 className={styles.taskItemHeading}>Responder correspondencia de Victoria Vance</h5>
                  <span className={styles.taskItemDue}>Pendiente &bull; Gmail</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
