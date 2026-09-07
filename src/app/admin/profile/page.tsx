"use client";

import React, { useEffect, useState } from "react";
import styles from "../admin.module.css";
import { HostProfile } from "@/lib/store";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<HostProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert("Error al guardar cambios");
      }
    } catch {
      alert("Error al conectar con el servidor");
    }
  };

  if (loading || !profile) {
    return <p style={{ color: "#8E7F6E" }}>Cargando información del perfil...</p>;
  }

  return (
    <div>
      <div className={styles.pageHeaderGroup}>
        <div>
          <h2 className={styles.pageHeading}>Perfil de Creadora &amp; Dossier</h2>
          <p className={styles.pageSubheading}>
            Semblanza, biografía y lema editorial que se muestran en el sitio web y el dossier.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.cardSection}>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Nombre de la Creadora</label>
            <input
              type="text"
              className={styles.fieldInput}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Subtítulo / Rol Principal</label>
            <input
              type="text"
              className={styles.fieldInput}
              value={profile.subtitle}
              onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
              required
            />
          </div>

          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label className={styles.fieldLabel}>Etiqueta de Rol (Dossier)</label>
            <input
              type="text"
              className={styles.fieldInput}
              value={profile.roleBadge}
              onChange={(e) => setProfile({ ...profile, roleBadge: e.target.value })}
              required
            />
          </div>

          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label className={styles.fieldLabel}>Biografía Principal (Pliego Editorial y Dossier)</label>
            <textarea
              className={styles.fieldTextarea}
              value={profile.basicInfo}
              onChange={(e) => setProfile({ ...profile, basicInfo: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label className={styles.fieldLabel}>Texto Descriptivo Secundario</label>
            <textarea
              className={styles.fieldTextarea}
              value={profile.extraInfoText}
              onChange={(e) => setProfile({ ...profile, extraInfoText: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label className={styles.fieldLabel}>Enfoque de Investigación / Lema</label>
            <input
              type="text"
              className={styles.fieldInput}
              value={profile.investigationFocus}
              onChange={(e) => setProfile({ ...profile, investigationFocus: e.target.value })}
              required
            />
          </div>

          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label className={styles.fieldLabel}>Cita Clásica (Edgar Allan Poe / Frase Destacada)</label>
            <textarea
              className={styles.fieldTextarea}
              value={profile.quote}
              onChange={(e) => setProfile({ ...profile, quote: e.target.value })}
              rows={2}
              required
            />
          </div>
        </div>

        {saved && (
          <p style={{ color: "#15803d", fontWeight: "600", fontSize: "0.88rem", margin: "1.5rem 0 0 0" }}>
            Perfil y dossier actualizados exitosamente.
          </p>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
          <button type="submit" className={styles.primaryBtn}>
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
