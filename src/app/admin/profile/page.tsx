"use client";

import React, { useEffect, useState } from "react";
import styles from "../admin.module.css";
import { HostProfile } from "@/lib/store";
import { useAdminData } from "@/context/AdminDataContext";

const DEFAULT_PROFILE: HostProfile = {
  name: "Nayssa Kristel",
  subtitle: "Creadora & Conductora",
  roleBadge: "voz principal, mente analítica, creadora.",
  basicInfo: "Voz única y creadora de Team Supernova. Especialista en entrelazar la belleza de la literatura gótica con la cruda realidad de la investigación criminal.",
  extraInfoText: "Como única creadora de Team Supernova, Nayssa fusiona el análisis literario profundo con la rigurosidad científica.",
  investigationFocus: "Desentrañando el misterio de la página a la escena del crimen.",
  quote: "Deep into that darkness peering, long I stood there wondering, fearing, doubting, dreaming dreams no mortal ever dared to dream before."
};

export default function AdminProfilePage() {
  const { profile: globalProfile, refreshData } = useAdminData();
  const [profile, setProfile] = useState<HostProfile>(globalProfile || DEFAULT_PROFILE);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (globalProfile) {
      setProfile(globalProfile);
    }
  }, [globalProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
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
          <h2 className={styles.pageHeading}>Perfil de Creadora &amp; Dossier</h2>
          <p className={styles.pageSubheading}>
            Semblanza, biografía y lema editorial que se muestran en el sitio web y el dossier.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Bloque 1: Identidad y Enfoque */}
        <div className={styles.cardSection}>
          <h3 className={styles.cardTitle} style={{ marginBottom: "1.25rem" }}>
            1. Identidad &amp; Enfoque Editorial
          </h3>
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

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Etiqueta de Rol (Dossier)</label>
              <input
                type="text"
                className={styles.fieldInput}
                value={profile.roleBadge}
                onChange={(e) => setProfile({ ...profile, roleBadge: e.target.value })}
                required
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Enfoque de Investigación / Lema</label>
              <input
                type="text"
                className={styles.fieldInput}
                value={profile.investigationFocus}
                onChange={(e) => setProfile({ ...profile, investigationFocus: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        {/* Bloque 2: Semblanza y Biografía */}
        <div className={styles.cardSection}>
          <h3 className={styles.cardTitle} style={{ marginBottom: "1.25rem" }}>
            2. Semblanza &amp; Biografía Editorial
          </h3>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Biografía Principal (Pliego Editorial)</label>
              <textarea
                className={styles.fieldTextarea}
                value={profile.basicInfo}
                onChange={(e) => setProfile({ ...profile, basicInfo: e.target.value })}
                rows={5}
                required
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Texto Descriptivo Secundario</label>
              <textarea
                className={styles.fieldTextarea}
                value={profile.extraInfoText}
                onChange={(e) => setProfile({ ...profile, extraInfoText: e.target.value })}
                rows={5}
                required
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginTop: "1.5rem" }}>
          {saved && (
            <span style={{ color: "#2E7D32", fontSize: "0.85rem", fontWeight: 700 }}>
              ✓ Perfil y dossier actualizados correctamente
            </span>
          )}
          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={saving}
            style={saved ? { backgroundColor: "#2E7D32", borderColor: "#2E7D32" } : undefined}
          >
            {saving ? "Guardando..." : saved ? "✓ Guardado" : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
