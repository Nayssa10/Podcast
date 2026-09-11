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

  const totalEpisodes = episodes.length;
  const publishedEpisodes = episodes.filter(e => e.status !== "draft");
  const forensicEpisodes = episodes.filter(e => e.type === "forensic");
  const unreadMessages = messages.filter(m => m.status === "unread");
  const answeredMessages = messages.filter(m => m.status !== "unread");

  const publishedPct = totalEpisodes > 0 ? Math.round((publishedEpisodes.length / totalEpisodes) * 100) : 0;
  const forensicPct = totalEpisodes > 0 ? Math.round((forensicEpisodes.length / totalEpisodes) * 100) : 0;
  const mailboxPct = messages.length > 0 ? Math.round((answeredMessages.length / messages.length) * 100) : 100;

  const publishedOffset = 314 - (314 * (publishedPct / 100));
  const forensicOffset = 314 - (314 * (forensicPct / 100));
  const mailboxOffset = 314 - (314 * (mailboxPct / 100));

  const now = new Date();
  const currentMonthName = now.toLocaleString("es-PE", { month: "long", year: "numeric" });
  const currentDayNum = now.getDate();

  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    return {
      day,
      isCurrent: day === currentDayNum,
      hasEvent: day === currentDayNum || day === 5 || day === 15 || day === 25,
    };
  });

  if (loading) {
    return <p style={{ color: "#8E7F6E", padding: "2rem" }}>Cargando panel de control...</p>;
  }

  return (
    <div className={styles.bentoDashboard}>
      {/* 2-Column Left/Center Main Area */}
      <div className={styles.bentoMainColumn}>
        {/* Top Row: 2 Cards Side-by-Side */}
        <div className={styles.topCardsRow}>
          {/* Card 1: Correspondencia Reciente */}
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

          {/* Card 2: Próximas Emisiones / Casos */}
          <div className={styles.bentoCard}>
            <div className={styles.bentoCardHeader}>
              <h3 className={styles.bentoCardTitle}>Emisiones Registradas</h3>
              <Link href="/admin/episodes" className={styles.seeMoreLink}>
                Ver más &gt;
              </Link>
            </div>

            <div className={styles.upcomingList}>
              {episodes.length === 0 ? (
                <p className={styles.emptyCardText}>No hay episodios creados.</p>
              ) : (
                episodes.slice(0, 2).map((ep) => (
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
                        <span>{ep.duration || "00:00 min"}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
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
                <strong style={{ textTransform: "capitalize" }}>{currentMonthName}</strong>
              </div>
              <div className={styles.calDaysHeader}>
                <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
              </div>
              <div className={styles.calDaysGrid}>
                {calendarDays.map((item, idx) => (
                  <span
                    key={idx}
                    className={`${styles.calDay} ${item.isCurrent ? styles.calDayActive : ""}`}
                  >
                    {item.day}
                  </span>
                ))}
              </div>
            </div>

            {/* Schedule Timeline List */}
            <div className={styles.timelineList}>
              {episodes.length === 0 ? (
                <p className={styles.emptyCardText}>No hay grabaciones programadas.</p>
              ) : (
                episodes.slice(0, 3).map((ep) => (
                  <div key={ep.id} className={styles.timelineItem}>
                    <div className={styles.timelineDateBadge}>
                      <span className={styles.dateNumber}>{ep.number.replace("EP ", "#")}</span>
                      <span className={styles.dateTime}>{ep.duration || "00:00"}</span>
                    </div>
                    <div className={styles.timelineContent}>
                      <span className={styles.timelineTitle}>{ep.title}</span>
                      <span className={styles.timelineTag}>
                        {ep.type === "forensic" ? "Peritaje Criminalístico" : "Romance Gótico"}
                      </span>
                    </div>
                    <Link href={`/admin/episodes/${ep.id}/edit`} className={styles.editPillBtn}>
                      Editar
                    </Link>
                  </div>
                ))
              )}
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

      {/* Right Column: Performance & Metric Gauges Widget (Calculated from Real Data) */}
      <aside className={styles.bentoRightColumn}>
        <div className={styles.statsCardWidget}>
          <h3 className={styles.statsWidgetTitle}>Rendimiento Real</h3>

          {/* Metric 1: Publicados Gauge */}
          <div className={styles.gaugeBlock}>
            <span className={styles.gaugeLabel}>Episodios Publicados</span>
            <div className={styles.circularGaugeWrapper}>
              <svg className={styles.gaugeSvg} viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" className={styles.gaugeTrack} />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className={styles.gaugeProgressRose}
                  strokeDasharray="314"
                  strokeDashoffset={publishedOffset}
                />
              </svg>
              <div className={styles.gaugeCenterText}>
                <span className={styles.gaugePercentage}>{publishedPct}%</span>
                <span className={styles.gaugeSubtext}>{publishedEpisodes.length}/{totalEpisodes} Casos</span>
              </div>
            </div>
          </div>

          {/* Metric 2: Criminalística vs Romance Gauge */}
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
                  strokeDashoffset={forensicOffset}
                />
              </svg>
              <div className={styles.gaugeCenterText}>
                <span className={styles.gaugePercentage}>{forensicPct}%</span>
                <span className={styles.gaugeSubtext}>{forensicEpisodes.length} Forenses</span>
              </div>
            </div>
          </div>

          {/* Metric 3: Atención a Oyentes Gauge */}
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
                  strokeDashoffset={mailboxOffset}
                />
              </svg>
              <div className={styles.gaugeCenterText}>
                <span className={styles.gaugePercentage}>{mailboxPct}%</span>
                <span className={styles.gaugeSubtext}>
                  {unreadMessages.length === 0 ? "Buzón al día" : `${unreadMessages.length} pendientes`}
                </span>
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
