"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../admin.module.css";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function NewEpisodePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // General fields
  const [number, setNumber] = useState("EP 04");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"forensic" | "book">("forensic");
  const [date, setDate] = useState(new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" }));
  const [duration, setDuration] = useState("06:00");
  const [audioUrl, setAudioUrl] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  const [description, setDescription] = useState("");

  // Images matching frontend placement
  const [coverImage, setCoverImage] = useState("/ep1_library_cover.jpg");
  const [evidenceImage, setEvidenceImage] = useState("/ep1_library_cover.jpg");
  const [photoStrip1, setPhotoStrip1] = useState("/ep1_library_cover.jpg");
  const [photoStrip2, setPhotoStrip2] = useState("/ep3_forensic_cover.jpg");
  const [photoStrip3, setPhotoStrip3] = useState("/ep2_perfume_cover.jpg");

  // Forensic fields
  const [criminologyDetails, setCriminologyDetails] = useState("");
  const [keyEvidence, setKeyEvidence] = useState("");
  const [forensicFocus, setForensicFocus] = useState("");

  // Book fields
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [snippetText, setSnippetText] = useState("");
  const [snippetHighlights, setSnippetHighlights] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: any = {
      number,
      title,
      type,
      date,
      duration,
      coverImage: coverImage || "/logo-clean.png",
      evidenceImage: evidenceImage || coverImage || "/ep1_library_cover.jpg",
      photoStrip1: photoStrip1 || "/ep1_library_cover.jpg",
      photoStrip2: photoStrip2 || "/ep3_forensic_cover.jpg",
      photoStrip3: photoStrip3 || coverImage || "/ep2_perfume_cover.jpg",
      url: audioUrl,
      description,
      status: "published"
    };

    if (type === "forensic") {
      payload.forensicDetails = {
        criminologyDetails,
        keyPhysicalEvidence: keyEvidence.split(",").map(s => s.trim()).filter(Boolean),
        forensicFocus
      };
    } else {
      payload.bookDetails = {
        title: bookTitle || title,
        author: bookAuthor,
        description: bookDescription,
        coverIcon: "book"
      };
      if (snippetText) {
        payload.snippet = {
          text: snippetText,
          highlights: snippetHighlights.split(",").map(s => s.trim()).filter(Boolean)
        };
      }
    }

    try {
      const res = await fetch("/api/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push("/admin/episodes");
      } else {
        alert("Error al guardar el episodio");
      }
    } catch {
      alert("Error al conectar con el servidor");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className={styles.pageHeaderGroup}>
        <div>
          <h2 className={styles.pageHeading}>Crear Nuevo Episodio</h2>
          <p className={styles.pageSubheading}>
            Completa los datos generales, sube las imágenes correspondientes y configura las fichas especializadas.
          </p>
        </div>

        <Link href="/admin/episodes" className={styles.secondaryBtn}>
          Cancelar
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.cardSection}>
        <h3 className={styles.cardTitle} style={{ marginBottom: "1.5rem" }}>1. Información General</h3>

        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Número de Expediente</label>
            <input
              type="text"
              className={styles.fieldInput}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Ej. EP 04"
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Tipo de Episodio</label>
            <select
              className={styles.fieldSelect}
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            >
              <option value="forensic">Criminalística / Forense</option>
              <option value="book">Romance Gótico / Lectura</option>
            </select>
          </div>

          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label className={styles.fieldLabel}>Título del Episodio</label>
            <input
              type="text"
              className={styles.fieldInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Episodio 4: El Secreto en las Cenizas"
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Fecha de Publicación</label>
            <input
              type="text"
              className={styles.fieldInput}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Duración (MM:SS)</label>
            <input
              type="text"
              className={styles.fieldInput}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Ej. 06:45"
              required
            />
          </div>

          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label className={styles.fieldLabel}>Audio MP3 (URL directa)</label>
            <input
              type="text"
              className={styles.fieldInput}
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              placeholder="https://..."
              required
            />
          </div>

          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label className={styles.fieldLabel}>Sinopsis / Descripción General</label>
            <textarea
              className={styles.fieldTextarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción del episodio que se mostrará en el catálogo..."
              required
            />
          </div>
        </div>

        {/* Gallery / Images Section */}
        <div className={styles.subCard} style={{ marginTop: "2rem" }}>
          <h4 className={styles.subCardTitle}>2. Imágenes del Episodio (Visibles en el Front)</h4>
          <p style={{ fontSize: "0.82rem", color: "#8E7F6E", marginTop: "-0.5rem", marginBottom: "1.25rem" }}>
            Sube o cambia los archivos para cada uno de los elementos visuales que se exhiben en la web principal.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <ImageUploadField
              label="Portada Principal del Episodio"
              value={coverImage}
              onChange={setCoverImage}
              description="Visible en las tarjetas del catálogo, carátula de reproducción y modal de lectura."
              aspectRatioLabel="Portada 1:1 o 3:4"
            />

            <ImageUploadField
              label="Evidencia Fotográfica / Escena del Crimen"
              value={evidenceImage}
              onChange={setEvidenceImage}
              description="Visible en el Expediente Criminalístico (Forensic Dossier) con efecto de cinta y clip."
              aspectRatioLabel="Foto Escena 1:1"
            />

            <div style={{ borderTop: "1px dashed #DCD3C7", paddingTop: "1rem", marginTop: "0.5rem" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#8C6B52" }}>
                Tira Fotográfica de Atmósfera (3 Fotogramas del Diario de Lectura)
              </span>
              <p style={{ fontSize: "0.78rem", color: "#8E7F6E", margin: "0.2rem 0 1rem 0" }}>
                Estas 3 fotos forman la tira vertical de película en el modal del Club de Lectura.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                <ImageUploadField
                  label="Fotograma 1: Atmósfera"
                  value={photoStrip1}
                  onChange={setPhotoStrip1}
                  description="Locación o ambientación gótica."
                  aspectRatioLabel="Horizontal 16:9"
                />

                <ImageUploadField
                  label="Fotograma 2: Detalles / Pista"
                  value={photoStrip2}
                  onChange={setPhotoStrip2}
                  description="Elemento forense o detalle de intriga."
                  aspectRatioLabel="Horizontal 16:9"
                />

                <ImageUploadField
                  label="Fotograma 3: Novela / Personajes"
                  value={photoStrip3}
                  onChange={setPhotoStrip3}
                  description="Protagonista o portada del libro."
                  aspectRatioLabel="Horizontal 16:9"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Type Section */}
        {type === "forensic" ? (
          <div className={styles.subCard}>
            <h4 className={styles.subCardTitle}>3. Ficha Pericial &amp; Criminalística</h4>
            <div className={styles.formGrid}>
              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>Reconstrucción de la Escena / Hechos</label>
                <textarea
                  className={styles.fieldTextarea}
                  value={criminologyDetails}
                  onChange={(e) => setCriminologyDetails(e.target.value)}
                  placeholder="Detalles sobre la trayectoria, reconstrucción balística o mecánica del hecho..."
                />
              </div>

              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>Evidencias Físicas Clave (separadas por comas)</label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={keyEvidence}
                  onChange={(e) => setKeyEvidence(e.target.value)}
                  placeholder="Ej. Casquillo percutido de 9mm, Manchas hemáticas de impacto, Guante de cuero"
                />
              </div>

              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>Foco Pericial (Balística, Toxicología, etc.)</label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={forensicFocus}
                  onChange={(e) => setForensicFocus(e.target.value)}
                  placeholder="Ej. Balística reconstructiva y análisis de residuos de disparo (GSR)"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.subCard}>
            <h4 className={styles.subCardTitle}>3. Ficha Literaria &amp; Romance Gótico</h4>
            <div className={styles.formGrid}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Título del Libro</label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Ej. La Sombra de Blackwood"
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Autor / Autora</label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                  placeholder="Ej. G. H. Vance"
                />
              </div>

              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>Sinopsis del Libro</label>
                <textarea
                  className={styles.fieldTextarea}
                  value={bookDescription}
                  onChange={(e) => setBookDescription(e.target.value)}
                  placeholder="Trama, tropos literarios y ambientación gótica..."
                />
              </div>

              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>Fragmento Literario Destacado</label>
                <textarea
                  className={styles.fieldTextarea}
                  value={snippetText}
                  onChange={(e) => setSnippetText(e.target.value)}
                  placeholder="Cita del libro para la ficha de lectura..."
                />
              </div>

              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>Frases a resaltar en la cita (separadas por comas)</label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={snippetHighlights}
                  onChange={(e) => setSnippetHighlights(e.target.value)}
                  placeholder="Ej. respiración cálida, verdad diferente"
                />
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <Link href="/admin/episodes" className={styles.secondaryBtn}>
            Cancelar
          </Link>
          <button type="submit" className={styles.primaryBtn} disabled={submitting}>
            {submitting ? "Guardando..." : "Publicar Episodio"}
          </button>
        </div>
      </form>
    </div>
  );
}
