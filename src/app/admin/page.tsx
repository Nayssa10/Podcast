"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./admin.module.css";
import { Episode, ContactMessage } from "@/lib/store";
import { IconMessages } from "@/components/admin/AdminIcons";

export default function AdminDashboard() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/episodes").then(res => res.json()),
      fetch("/api/messages").then(res => res.json())
    ]).then(([eps, msgs]) => {
      setEpisodes(Array.isArray(eps) ? eps : []);
      setMessages(Array.isArray(msgs) ? msgs : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const unreadMessages = messages.filter(m => m.status === "unread");
  const forensicEpisodes = episodes.filter(e => e.type === "forensic");
  const bookEpisodes = episodes.filter(e => e.type === "book");

  // Mock days for the calendar widget
  const calendarDays = [
    { day: 1, isCurrent: false },
    { day: 2, isCurrent: false },
    { day: 3, isCurrent: false },
    { day: 4, isCurrent: false },
    { day: 5, isCurrent: true, hasEvent: true }, // Release day
    { day: 6, isCurrent: false },
    { day: 7, isCurrent: false },
    { day: 8, isCurrent: false },
    { day: 9, isCurrent: false },
    { day: 10, isCurrent: false },
    { day: 11, isCurrent: false },
    { day: 12, isCurrent: true, hasEvent: true },
    { day: 13, isCurrent: false },
    { day: 14, isCurrent: false },
    { day: 15, isCurrent: false },
    { day: 16, isCurrent: false },
    { day: 17, isCurrent: false },
    { day: 18, isCurrent: false },
    { day: 19, isCurrent: true, hasEvent: true },
    { day: 20, isCurrent: false },
    { day: 21, isCurrent: false },
    { day: 22, isCurrent: false },
    { day: 23, isCurrent: false },
    { day: 24, isCurrent: false },
    { day: 25, isCurrent: false },
    { day: 26, isCurrent: true, hasEvent: true },
    { day: 27, isCurrent: false },
    { day: 28, isCurrent: false },
    { day: 29, isCurrent: false },
    { day: 30, isCurrent: false },
  ];

  if (loading) {
    return <p style={{ color: "#8E7F6E", padding: "2rem" }}>Cargando panel de control...</p>;
  }

  return (
    <div className={styles.bentoDashboard}>
      {/* 2-Column Left/Center Main Area */}
      <div className={styles.bentoMainColumn}>
        {/* Top Row: 2 Cards Side-by-Side */}
        <div className={styles.topCardsRow}>
          {/* Card 1: Correspondencia Reciente (Linked Listeners) */}
          <div className={styles.bentoCard}>
            <div className={styles.bentoCardHeader}>
              <h3 className={styles.bentoCardTitle}>Correspondencia Reciente</h3>
              <Link href="/admin/messages" className={styles.seeMoreLink}>
                Ver más &gt;
              </Link>
            </div>

            <div className={styles.listenerList}>
              {messages.length === 0 ? (
                <p className={styles.emptyCardText}>No hay mensajes en el buzón.</p>
              ) : (
                messages.slice(0, 3).map((msg) => (
                  <div key={msg.id} className={styles.listenerRow}>
                    <div className={styles.listenerAvatar}>
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.listenerInfo}>
                      <span className={styles.listenerName}>{msg.name}</span>
                      <span className={styles.listenerSnippet}>{msg.message}</span>
                    </div>
                    <Link href="/admin/messages" className={styles.chatActionBtn} title="Ver mensaje">
                      <IconMessages size={14} />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Card 2: Próximas Emisiones / Casos (Upcoming Events) */}
          <div className={styles.bentoCard}>
            <div className={styles.bentoCardHeader}>
              <h3 className={styles.bentoCardTitle}>Próximas Emisiones</h3>
              <Link href="/admin/episodes" className={styles.seeMoreLink}>
                Ver más &gt;
              </Link>
            </div>

            <div className={styles.upcomingList}>
              {episodes.slice(0, 2).map((ep) => (
                <div key={ep.id} className={styles.upcomingPill}>
                  <div className={styles.upcomingThumbnail}>
                    <Image
                      src={ep.coverImage || "/logo-clean.png"}
                      alt={ep.title}
                      width={44}
                      height={44}
                      className={styles.upcomingImg}
                      unoptimized
                    />
                  </div>
                  <div className={styles.upcomingInfo}>
                    <span className={styles.upcomingTitle}>{ep.title}</span>
                    <div className={styles.upcomingMeta}>
                      <span>{ep.date}</span>
                      <span className={styles.metaDot}>•</span>
                      <span>{ep.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Row: Schedule & Calendar Card */}
        <div className={styles.bentoCard}>
          <div className={styles.bentoCardHeader}>
            <h3 className={styles.bentoCardTitle}>Agenda de Grabación &amp; Publicación</h3>
            <Link href="/admin/episodes/new" className={styles.seeMoreLink}>
              + Nuevo Episodio
            </Link>
          </div>

          <div className={styles.scheduleSplit}>
            {/* Mini Calendar */}
            <div className={styles.miniCalendarBox}>
              <div className={styles.calMonthHeader}>
                <span>&lt;</span>
                <strong>Setiembre 2026</strong>
                <span>&gt;</span>
              </div>
              <div className={styles.calDaysHeader}>
                <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
              </div>
              <div className={styles.calDaysGrid}>
                {calendarDays.map((item, idx) => (
                  <span
                    key={idx}
                    className={`${styles.calDay} ${item.hasEvent ? styles.calDayActive : ""}`}
                  >
                    {item.day}
                  </span>
                ))}
              </div>
            </div>

            {/* Schedule Timeline List */}
            <div className={styles.timelineList}>
              {episodes.slice(0, 3).map((ep, idx) => (
                <div key={ep.id} className={styles.timelineItem}>
                  <div className={styles.timelineDateBadge}>
                    <span className={styles.dateNumber}>{ep.number.replace("EP ", "#")}</span>
                    <span className={styles.dateTime}>{ep.duration}</span>
                  </div>
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineTitle}>{ep.title}</span>
                    <span className={styles.timelineTag}>
                      {ep.type === "forensic" ? "Peritaje Criminalístico" : "Romance"}
                    </span>
                  </div>
                  <Link href={`/admin/episodes/${ep.id}/edit`} className={styles.editPillBtn}>
                    Editar
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Visual Projects / Episodes Showcase */}
        <div className={styles.bentoCard}>
          <div className={styles.bentoCardHeader}>
            <h3 className={styles.bentoCardTitle}>Expedientes &amp; Galería Visual</h3>
            <Link href="/admin/episodes" className={styles.seeMoreLink}>
              Catálogo completo &gt;
            </Link>
          </div>

          <div className={styles.projectsGrid}>
            {episodes.map((ep) => (
              <Link key={ep.id} href={`/admin/episodes/${ep.id}/edit`} className={styles.projectCard}>
                <div className={styles.projectImgBox}>
                  <Image
                    src={ep.coverImage || "/logo-clean.png"}
                    alt={ep.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className={styles.projectCover}
                    unoptimized
                  />
                  <span className={styles.projectCategoryBadge}>
                    {ep.type === "forensic" ? "Forense" : "Romance"}
                  </span>
                </div>
                <div className={styles.projectInfo}>
                  <h4 className={styles.projectTitle}>{ep.title}</h4>
                  <span className={styles.projectMeta}>{ep.number} • {ep.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Performance & Metric Gauges Widget */}
      <aside className={styles.bentoRightColumn}>
        <div className={styles.statsCardWidget}>
          <h3 className={styles.statsWidgetTitle}>Rendimiento</h3>

          {/* Metric 1: Attendance / Episodes Gauge */}
          <div className={styles.gaugeBlock}>
            <span className={styles.gaugeLabel}>Episodios Activos</span>
            <div className={styles.circularGaugeWrapper}>
              <svg className={styles.gaugeSvg} viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" className={styles.gaugeTrack} />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className={styles.gaugeProgressRose}
                  strokeDasharray="314"
                  strokeDashoffset="62" /* 80% */
                />
              </svg>
              <div className={styles.gaugeCenterText}>
                <span className={styles.gaugePercentage}>100%</span>
                <span className={styles.gaugeSubtext}>{episodes.length} Casos</span>
              </div>
            </div>
          </div>

          {/* Metric 2: Homework / Forensics Gauge */}
          <div className={styles.gaugeBlock}>
            <span className={styles.gaugeLabel}>Rigor Forense</span>
            <div className={styles.circularGaugeWrapper}>
              <svg className={styles.gaugeSvg} viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" className={styles.gaugeTrack} />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className={styles.gaugeProgressTeal}
                  strokeDasharray="314"
                  strokeDashoffset="31" /* 90% */
                />
              </svg>
              <div className={styles.gaugeCenterText}>
                <span className={styles.gaugePercentage}>90%</span>
                <span className={styles.gaugeSubtext}>Dictámenes</span>
              </div>
            </div>
          </div>

          {/* Metric 3: Rating / Audience Gauge */}
          <div className={styles.gaugeBlock}>
            <span className={styles.gaugeLabel}>Atención a Oyentes</span>
            <div className={styles.circularGaugeWrapper}>
              <svg className={styles.gaugeSvg} viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" className={styles.gaugeTrack} />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className={styles.gaugeProgressGold}
                  strokeDasharray="314"
                  strokeDashoffset="78" /* 75% */
                />
              </svg>
              <div className={styles.gaugeCenterText}>
                <span className={styles.gaugePercentage}>75%</span>
                <span className={styles.gaugeSubtext}>Buzón al día</span>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className={styles.statsBottomAction}>
            <Link href="/admin/episodes" className={styles.statsSeeMoreBtn}>
              <span>Ver reporte general ➔</span>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
