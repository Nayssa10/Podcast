"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./admin.module.css";
import {
  IconDashboard,
  IconEpisodes,
  IconMessages,
  IconProfile,
  IconSettings,
  IconBell,
  IconExternalLink,
  IconLogout,
} from "@/components/admin/AdminIcons";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (pathname === "/admin/login") return;

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

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", Icon: IconDashboard },
    { href: "/admin/episodes", label: "Episodios", Icon: IconEpisodes },
    { href: "/admin/messages", label: "Buzón de Mensajes", count: unreadCount, Icon: IconMessages },
    { href: "/admin/profile", label: "Perfil & Dossier", Icon: IconProfile },
    { href: "/admin/settings", label: "Configuración & Redes", Icon: IconSettings },
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
              const { Icon } = item;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.menuPill} ${isActive ? styles.menuPillActive : ""}`}
                >
                  <span className={styles.menuIcon}>
                    <Icon size={17} />
                  </span>
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
              <IconExternalLink size={15} />
              <span>Ver Sitio Web</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className={styles.logoutBtn}
              title="Cerrar sesión"
            >
              <IconLogout size={15} />
              <span>Cerrar Sesión</span>
            </button>
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
              <Link href="/admin/messages" className={styles.notificationBtn} title="Buzón de correspondencia">
                <IconBell size={18} />
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
