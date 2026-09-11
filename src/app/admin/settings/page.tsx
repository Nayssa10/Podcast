"use client";

import React, { useEffect, useState } from "react";
import styles from "../admin.module.css";
import { SiteSettings } from "@/lib/store";
import { useAdminData } from "@/context/AdminDataContext";

const DEFAULT_SETTINGS: SiteSettings = {
  contactNotificationEmail: "nayssakristel@gmail.com",
  resendApiKey: "",
  spotifyUrl: "https://open.spotify.com",
  instagramUrl: "https://www.instagram.com/team__supernova?stkn=b2VhdThlYXduaTVj",
  youtubeUrl: "https://youtube.com",
  tiktokUrl: "https://tiktok.com/@teamsupernova"
};

export default function AdminSettingsPage() {
  const { settings: globalSettings, refreshData } = useAdminData();
  const [settings, setSettings] = useState<SiteSettings>(globalSettings || DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (globalSettings) {
      setSettings(globalSettings);
    }
  }, [globalSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        setSaved(true);
        refreshData();
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert("Error al guardar cambios");
      }
    } catch {
      alert("Error al conectar con el servidor");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className={styles.pageHeaderGroup}>
        <div>
          <h2 className={styles.pageHeading}>Configuración General &amp; Redes</h2>
          <p className={styles.pageSubheading}>
            Correo receptor para notificaciones de Gmail y enlaces a plataformas oficiales.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.cardSection}>
        <h3 className={styles.cardTitle} style={{ marginBottom: "1.5rem" }}>Notificaciones por Correo</h3>

        <div className={styles.formGrid}>
          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label className={styles.fieldLabel}>Correo Electrónico Receptor (Gmail)</label>
            <input
              type="email"
              className={styles.fieldInput}
              value={settings.contactNotificationEmail}
              onChange={(e) => setSettings({ ...settings, contactNotificationEmail: e.target.value })}
              placeholder="nayssakristel@gmail.com"
              required
            />
            <span style={{ fontSize: "0.78rem", color: "#8E7F6E", marginTop: "0.25rem" }}>
              Los mensajes enviados desde el formulario web llegarán directamente a esta casilla.
            </span>
          </div>
        </div>

        <h3 className={styles.cardTitle} style={{ margin: "2rem 0 1.5rem 0", paddingTop: "1.5rem", borderTop: "1px solid #EAE3D9" }}>
          Enlaces de Plataformas Oficiales
        </h3>

        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Spotify Podcast URL</label>
            <input
              type="url"
              className={styles.fieldInput}
              value={settings.spotifyUrl}
              onChange={(e) => setSettings({ ...settings, spotifyUrl: e.target.value })}
              placeholder="https://open.spotify.com/show/..."
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Instagram URL</label>
            <input
              type="url"
              className={styles.fieldInput}
              value={settings.instagramUrl}
              onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
              placeholder="https://www.instagram.com/team__supernova?stkn=b2VhdThlYXduaTVj"
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel}>YouTube Channel URL</label>
            <input
              type="url"
              className={styles.fieldInput}
              value={settings.youtubeUrl}
              onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
              placeholder="https://youtube.com/@teamsupernova"
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel}>TikTok URL</label>
            <input
              type="url"
              className={styles.fieldInput}
              value={settings.tiktokUrl}
              onChange={(e) => setSettings({ ...settings, tiktokUrl: e.target.value })}
              placeholder="https://tiktok.com/@teamsupernova"
              required
            />
          </div>
        </div>

        {saved && (
          <p style={{ color: "#15803d", fontWeight: "600", fontSize: "0.88rem", margin: "1.5rem 0 0 0" }}>
            ✓ Configuración y redes actualizadas correctamente.
          </p>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
          <button type="submit" className={styles.primaryBtn} disabled={saving}>
            {saving ? "Guardando..." : saved ? "✓ Guardado" : "Guardar Configuración"}
          </button>
        </div>
      </form>
    </div>
  );
}
