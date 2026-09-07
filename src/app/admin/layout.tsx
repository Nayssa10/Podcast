"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./admin.module.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/messages")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const unread = data.filter(m => m.status === "unread").length;
          setUnreadCount(unread);
        }
      })
      .catch(() => {});
  }, [pathname]);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "⊞" },
    { href: "/admin/episodes", label: "Episodios", icon: "🎙" },
    { href: "/admin/messages", label: "Buzón de Mensajes", count: unreadCount, icon: "✉" },
    { href: "/admin/profile", label: "Perfil & Dossier", icon: "✦" },
    { href: "/admin/settings", label: "Configuración & Redes", icon: "⚙" },
  ];

  return (
    <div className={styles.dashAppWrapper}>
      <div className={styles.dashContainer}>
        {/* Sidebar Navigation */}
        <aside className={styles.dashSidebar}>
          {/* Brand & Profile Section */}
          <div className={styles.sidebarHeader}>
            <div className={styles.brandTitleRow}>
              <span className={styles.brandLogoDot}>✦</span>
              <h2 className={styles.brandLogoTitle}>SUPERNOVA</h2>
            </div>
            
            <div className={styles.userProfileCard}>
              <div className={styles.userAvatarCircle}>
                <span>N</span>
              </div>
              <div className={styles.userInfoText}>
                <h4 className={styles.userNameHeading}>Nayssa Kristel</h4>
                <span className={styles.userSubtitle}>Creadora &amp; Conductora</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className={styles.sidebarMenu}>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.menuPill} ${isActive ? styles.menuPillActive : ""}`}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                  {Boolean(item.count && item.count > 0) && (
                    <span className={styles.menuBadge}>{item.count}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Bottom Action */}
          <div className={styles.sidebarFooterBox}>
            <Link href="/" className={styles.backToSiteBtn} target="_blank">
              <span>➔ Ver Sitio Web</span>
            </Link>
          </div>
        </aside>

        {/* Main Panel Content */}
        <main className={styles.dashMain}>
          {/* Top Bar Header */}
          <header className={styles.dashTopBar}>
            <div className={styles.topGreeting}>
              <h1 className={styles.greetingTitle}>¡HOLA, NAYSSA!</h1>
              <span className={styles.greetingSubtitle}>Panel de Control &amp; Gestión Forense-Literaria</span>
            </div>

            <div className={styles.topBarRight}>
              <div className={styles.searchPill}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Buscar expedientes, novelas o mensajes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <Link href="/admin/messages" className={styles.notificationBtn} title="Buzón de correspondencia">
                <span className={styles.bellIcon}>🔔</span>
                {unreadCount > 0 && <span className={styles.notifDot}></span>}
              </Link>
            </div>
          </header>

          {/* Body Section */}
          <div className={styles.dashBody}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
