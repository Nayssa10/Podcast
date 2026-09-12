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
  const { profile: globalProfile, updateProfileLocally, refreshData } = useAdminData();
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
      updateProfileLocally(profile);
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          updateProfileLocally(json.data);
          setProfile(json.data);
        }
        setSaved(true);
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
          <h2 className={styles.pageHeading}>Perfil de la Creadora</h2>
          <p className={styles.pageSubheading}>
            Información de portada y presentación que se muestran en el sitio web.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Bloque 1: Identidad & Portada */}
        <div className={styles.cardSection}>
          <h3 className={styles.cardTitle} style={{ marginBottom: "1.25rem" }}>
            1. Portada Principal (Hero)
          </h3>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Nombre de la Creadora</label>
              <input
                type="text"
                className={styles.fieldInput}
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Ej. Nayssa Kristel"
                required
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Subtítulo / Especialidad</label>
              <input
                type="text"
                className={styles.fieldInput}
                value={profile.subtitle}
                onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
                placeholder="Ej. investigación & literatura"
                required
              />
            </div>

            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.fieldLabel}>Lema o Frase al Pie de Portada (Opcional)</label>
              <input
                type="text"
                className={styles.fieldInput}
                value={profile.investigationFocus || ""}
                onChange={(e) => setProfile({ ...profile, investigationFocus: e.target.value })}
                placeholder="Ej. donde cada historia deja una huella"
              />
            </div>

            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.fieldLabel}>Descripción de Portada (Párrafo del Hero)</label>
              <textarea
                className={styles.fieldTextarea}
                value={profile.extraInfoText || ""}
                onChange={(e) => setProfile({ ...profile, extraInfoText: e.target.value })}
                rows={3}
                placeholder="Un espacio donde la belleza de la literatura gótica y el romance de misterio..."
                required
              />
            </div>
          </div>
        </div>

        {/* Bloque 2: Sección Sobre mí */}
        <div className={styles.cardSection}>
          <h3 className={styles.cardTitle} style={{ marginBottom: "1.25rem" }}>
            2. Sección &quot;Sobre mí&quot;
          </h3>
          <div className={styles.formGrid}>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.fieldLabel}>Texto de Presentación y Bienvenida</label>
              <textarea
                className={styles.fieldTextarea}
                value={profile.basicInfo || ""}
                onChange={(e) => setProfile({ ...profile, basicInfo: e.target.value })}
                rows={5}
                placeholder="Soy Nayssa Kristel, creadora de Team Supernova..."
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
