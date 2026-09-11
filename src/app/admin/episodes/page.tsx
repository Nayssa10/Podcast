"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./episodes.module.css";
import { Episode, ContactMessage } from "@/lib/store";
import { IconSearch, IconSettings, IconEpisodes } from "@/components/admin/AdminIcons";

function calculateCompleteness(ep: Episode): number {
  let score = 0;
  if (ep.title && ep.title.trim().length > 0) score += 20;
  if (ep.url && ep.url.startsWith("http")) score += 20;
  if (ep.coverImage && ep.coverImage.trim().length > 0) score += 20;
  if (ep.description && ep.description.trim().length > 10) score += 20;
  if (
    (ep.type === "forensic" && ep.forensicDetails?.criminologyDetails) ||
    (ep.type === "book" && ep.bookDetails?.title)
  ) {
    score += 20;
  }
  return score;
}

function getCurrentWeekRange(): string {
  const now = new Date();
  const currentDay = now.getDay();
  const distanceToMonday = (currentDay + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - distanceToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"];
  const startDay = String(monday.getDate()).padStart(2, "0");
  const endDay = String(sunday.getDate()).padStart(2, "0");
  const monthStr = months[sunday.getMonth()];

  return `${monthStr} ${startDay} - ${monthStr} ${endDay}`;
}

export default function AdminEpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filter, setFilter] = useState<"all" | "forensic" | "book">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const fetchData = () => {
    Promise.all([
      fetch("/api/episodes", { cache: "no-store" }).then(res => res.json()),
      fetch("/api/messages", { cache: "no-store" }).then(res => res.json())
    ])
      .then(([eps, msgs]) => {
        setEpisodes(Array.isArray(eps) ? eps : []);
        setMessages(Array.isArray(msgs) ? msgs : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás segura de eliminar el episodio "${title}"?`)) return;

    try {
      const res = await fetch(`/api/episodes?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
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

  const totalEpisodes = episodes.length;
  const forensicCount = episodes.filter(e => e.type === "forensic").length;
  const bookCount = episodes.filter(e => e.type === "book").length;
  const publishedCount = episodes.filter(e => e.status !== "draft").length;

  const forensicPct = totalEpisodes > 0 ? Math.round((forensicCount / totalEpisodes) * 100) : 0;
  const romancePct = totalEpisodes > 0 ? Math.round((bookCount / totalEpisodes) * 100) : 0;
  const publishedPct = totalEpisodes > 0 ? Math.round((publishedCount / totalEpisodes) * 100) : 0;

  // Average completeness across all episodes
  const avgCompleteness = totalEpisodes > 0
    ? Math.round(episodes.reduce((acc, ep) => acc + calculateCompleteness(ep), 0) / totalEpisodes)
    : 0;

  // Concentric SVG offsets (circumference: outer 440, middle 340, inner 240)
  const outerOffset = 440 - (440 * (forensicPct / 100));
  const middleOffset = 340 - (340 * (romancePct / 100));
  const innerOffset = 240 - (240 * (publishedPct / 100));

  // Dynamic Pending Tasks
  const unreadMessages = messages.filter(m => m.status === "unread");
  const incompleteEpisodes = episodes.filter(e => calculateCompleteness(e) < 100);

  const currentWeekText = getCurrentWeekRange();

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

      {/* Category Filter Tabs Strip */}
      <div className={styles.announcementStrip}>
        <div className={styles.filterPillsGroup}>
          <button
            onClick={() => setFilter("all")}
            className={`${styles.categoryTabBtn} ${filter === "all" ? styles.categoryTabActive : ""}`}
          >
            Todos ({totalEpisodes})
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
        <span className={styles.stripNote}>
          Temporada 2026 &bull; {publishedCount} publicados &bull; {totalEpisodes - publishedCount} borradores
        </span>
      </div>

      {/* Main 2-Column Bento Grid: Left Cards + Right To-Do/Activity Sidebar */}
      <div className={styles.mainEpisodesGrid}>
        {/* Left Grid Area */}
        <div className={styles.cardsColumn}>
          {loading ? (
            <p style={{ color: "#8E7F6E", padding: "2rem" }}>Cargando catálogo...</p>
          ) : (
            <div className={styles.cardsGrid}>
              {/* Card 1: Overview Summary Card */}
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
                    <span className={styles.statBoxNumber}>{totalEpisodes}</span>
                    <span className={styles.statBoxLabel}>Registrados</span>
                  </div>
                  <div className={styles.statBox}>
                    <span className={styles.statBoxNumber}>{avgCompleteness}%</span>
                    <span className={styles.statBoxLabel}>Completos</span>
                  </div>
                </div>

                <div className={styles.summaryCardFooter}>
                  <Link href="/admin/profile" className={styles.summaryCardLink}>
                    Ver dossier de creadora &gt;
                  </Link>
                </div>
              </div>

              {/* Dynamic Episode Cards */}
              {filteredEpisodes.map((ep) => {
                const epCompleteness = calculateCompleteness(ep);
                return (
                  <article key={ep.id} className={styles.classroomEpisodeCard}>
                    {/* Top Image Container with real calculated badges */}
                    <div className={styles.cardImageContainer}>
                      <Image
                        src={ep.coverImage || "/logo-clean.png"}
                        alt={ep.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className={styles.cardCoverImg}
                        unoptimized
                      />
                      
                      {/* Top Left Badge: Completeness Score */}
                      <span className={styles.percentBadge}>
                        {epCompleteness}%
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
                        Temporada 2026 &bull; {ep.duration || "00:00"} min &bull; {ep.status === "draft" ? "Borrador" : "Publicado"}
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

                        {ep.url && (
                          <a
                            href={ep.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionIconBtn}
                            title="Reproducir audio"
                          >
                            <span className={styles.actionIconSvg}>🔊</span>
                          </a>
                        )}

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
                );
              })}
            </div>
          )}
        </div>

        {/* Right To-Do & Activity Sidebar (Calculated from Real Data) */}
        <aside className={styles.rightActivityPanel}>
          {/* Header */}
          <div className={styles.todoPanelHeader}>
            <h3 className={styles.todoTitle}>Control &amp; Métricas</h3>
            <span className={styles.syncBadge}>✦ En Vivo</span>
          </div>

          {/* Week Selector with current date */}
          <div className={styles.weekSelectorRow}>
            <span className={styles.weekPillLabel}>Semana</span>
            <div className={styles.weekNavArrows}>
              <span className={styles.weekDateRange}>{currentWeekText}</span>
            </div>
          </div>

          {/* Multi-Ring Activity Chart Widget */}
          <div className={styles.multiRingChartCard}>
            <div className={styles.concentricCirclesWrapper}>
              <svg className={styles.concentricSvg} viewBox="0 0 160 160">
                {/* Outer Ring: Forense */}
                <circle cx="80" cy="80" r="70" className={styles.ringTrack} />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  className={styles.ringOuter}
                  strokeDasharray="440"
                  strokeDashoffset={outerOffset}
                />

                {/* Middle Ring: Romance */}
                <circle cx="80" cy="80" r="54" className={styles.ringTrack} />
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  className={styles.ringMiddle}
                  strokeDasharray="340"
                  strokeDashoffset={middleOffset}
                />

                {/* Inner Ring: Publicados */}
                <circle cx="80" cy="80" r="38" className={styles.ringTrack} />
                <circle
                  cx="80"
                  cy="80"
                  r="38"
                  className={styles.ringInner}
                  strokeDasharray="240"
                  strokeDashoffset={innerOffset}
                />
              </svg>

              <div className={styles.ringCenterValue}>
                <span className={styles.ringPercentText}>{publishedPct}%</span>
                <span className={styles.ringFractionText}>{publishedCount}/{totalEpisodes} Activos</span>
              </div>
            </div>

            {/* Dots Category Legend with Real Percentages */}
            <div className={styles.dotsLegendGrid}>
              <div className={styles.legendDotItem}>
                <span className={`${styles.colorDot} ${styles.dotRose}`}></span>
                <span>Forense ({forensicPct}%)</span>
              </div>
              <div className={styles.legendDotItem}>
                <span className={`${styles.colorDot} ${styles.dotTeal}`}></span>
                <span>Romance ({romancePct}%)</span>
              </div>
              <div className={styles.legendDotItem}>
                <span className={`${styles.colorDot} ${styles.dotGold}`}></span>
                <span>Publicados ({publishedPct}%)</span>
              </div>
              <div className={styles.legendDotItem}>
                <span className={`${styles.colorDot} ${styles.dotPurple}`}></span>
                <span>Borradores ({100 - publishedPct}%)</span>
              </div>
            </div>

            {/* Quick Filter Tabs with Real Counts */}
            <div className={styles.quickFilterTabs}>
              <button
                onClick={() => setFilter("all")}
                className={styles.quickFilterBtn}
                title="Episodios Totales"
              >
                <IconEpisodes size={13} style={{ verticalAlign: "middle", marginRight: "4px" }} /> {totalEpisodes}
              </button>
              <button
                onClick={() => setFilter("forensic")}
                className={styles.quickFilterBtn}
                title="Episodios Forenses"
              >
                Forense ({forensicCount})
              </button>
              <button
                onClick={() => setFilter("book")}
                className={styles.quickFilterBtn}
                title="Episodios de Novelas & Romance"
              >
                Romance ({bookCount})
              </button>
            </div>
          </div>

          {/* Pending Tasks / Dynamic Action List */}
          <div className={styles.tasksSection}>
            <div className={styles.tasksHeaderRow}>
              <span className={styles.taskCountBadge}>
                {unreadMessages.length + incompleteEpisodes.length || 0}
              </span>
              <span className={styles.taskSectionTitle}>Pendientes Reales</span>
              <span className={styles.taskAccordionArrow}>▾</span>
            </div>

            <div className={styles.taskItemsList}>
              {unreadMessages.length > 0 && (
                <Link href="/admin/messages" className={styles.taskItemCard} style={{ textDecoration: "none" }}>
                  <div className={styles.taskCheckboxCircle}></div>
                  <div className={styles.taskTextContent}>
                    <div className={styles.taskTagLine}>BUZÓN DE OYENTES ({unreadMessages.length})</div>
                    <h5 className={styles.taskItemHeading}>
                      Responder a {unreadMessages[0].name}
                    </h5>
                    <span className={styles.taskItemDue}>Mensaje pendiente de lectura</span>
                  </div>
                </Link>
              )}

              {incompleteEpisodes.map((ep) => (
                <Link
                  key={ep.id}
                  href={`/admin/episodes/${ep.id}/edit`}
                  className={styles.taskItemCard}
                  style={{ textDecoration: "none" }}
                >
                  <div className={styles.taskCheckboxCircle}></div>
                  <div className={styles.taskTextContent}>
                    <div className={styles.taskTagLine}>{ep.number} / EXPEDIENTE</div>
                    <h5 className={styles.taskItemHeading}>
                      Completar ficha técnica de &quot;{ep.title}&quot;
                    </h5>
                    <span className={styles.taskItemDue}>Faltan campos &bull; {calculateCompleteness(ep)}%</span>
                  </div>
                </Link>
              ))}

              {unreadMessages.length === 0 && incompleteEpisodes.length === 0 && (
                <div className={styles.taskItemCard}>
                  <div className={styles.taskCheckboxCircle} style={{ backgroundColor: "#8C6B52" }}></div>
                  <div className={styles.taskTextContent}>
                    <div className={styles.taskTagLine}>ESTADO GENERAL</div>
                    <h5 className={styles.taskItemHeading}>¡Excelente! Todos los casos y buzón al día</h5>
                    <span className={styles.taskItemDue}>Sin pendientes urgentes</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
