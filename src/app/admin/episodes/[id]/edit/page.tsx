"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import styles from "../../../admin.module.css";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Episode } from "@/lib/store";

export default function EditEpisodePage() {
  const router = useRouter();
  const params = useParams();
  const episodeId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"forensic" | "book">("forensic");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [description, setDescription] = useState("");

  // Images matching frontend placement
  const [coverImage, setCoverImage] = useState("");
  const [evidenceImage, setEvidenceImage] = useState("");
  const [photoStrip1, setPhotoStrip1] = useState("");
  const [photoStrip2, setPhotoStrip2] = useState("");
  const [photoStrip3, setPhotoStrip3] = useState("");

  // Forensic
  const [criminologyDetails, setCriminologyDetails] = useState("");
  const [keyEvidence, setKeyEvidence] = useState("");
  const [forensicFocus, setForensicFocus] = useState("");

  // Book
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [snippetText, setSnippetText] = useState("");
  const [snippetHighlights, setSnippetHighlights] = useState("");

  useEffect(() => {
    fetch("/api/episodes")
      .then(res => res.json())
      .then((data: Episode[]) => {
        const ep = data.find(item => item.id === episodeId);
        if (ep) {
          setNumber(ep.number);
          setTitle(ep.title);
          setType(ep.type);
          setDate(ep.date);
          setDuration(ep.duration);
          setCoverImage(ep.coverImage || "");
          setEvidenceImage(ep.evidenceImage || ep.coverImage || "");
          setPhotoStrip1(ep.photoStrip1 || "");
          setPhotoStrip2(ep.photoStrip2 || "");
          setPhotoStrip3(ep.photoStrip3 || "");
          setAudioUrl(ep.url);
          setDescription(ep.description);

          if (ep.forensicDetails) {
            setCriminologyDetails(ep.forensicDetails.criminologyDetails || "");
            setKeyEvidence((ep.forensicDetails.keyPhysicalEvidence || []).join(", "));
            setForensicFocus(ep.forensicDetails.forensicFocus || "");
          }

          if (ep.bookDetails) {
            setBookTitle(ep.bookDetails.title || "");
            setBookAuthor(ep.bookDetails.author || "");
            setBookDescription(ep.bookDetails.description || "");
          }

          if (ep.snippet) {
            setSnippetText(ep.snippet.text || "");
            setSnippetHighlights((ep.snippet.highlights || []).join(", "));
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [episodeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: any = {
      id: episodeId,
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
      payload.bookDetails = undefined;
      payload.snippet = undefined;
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
      payload.forensicDetails = undefined;
    }

    try {
      const res = await fetch("/api/episodes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push("/admin/episodes");
      } else {
        alert("Error al actualizar el episodio");
      }
    } catch {
      alert("Error al conectar con el servidor");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p style={{ color: "#8E7F6E" }}>Cargando datos del episodio...</p>;
  }

  return (
    <div>
      <div className={styles.pageHeaderGroup}>
        <div>
          <h2 className={styles.pageHeading}>Editar Expediente: {number}</h2>
          <p className={styles.pageSubheading}>
            Modifica la información, actualiza las imágenes y sincroniza el catálogo del podcast.
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
              required
            />
          </div>

          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label className={styles.fieldLabel}>Sinopsis / Descripción General</label>
            <textarea
              className={styles.fieldTextarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                />
              </div>

              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>Evidencias Físicas Clave</label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={keyEvidence}
                  onChange={(e) => setKeyEvidence(e.target.value)}
                />
              </div>

              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>Foco Pericial (Balística, Toxicología, etc.)</label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={forensicFocus}
                  onChange={(e) => setForensicFocus(e.target.value)}
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
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Autor / Autora</label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                />
              </div>

              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>Sinopsis del Libro</label>
                <textarea
                  className={styles.fieldTextarea}
                  value={bookDescription}
                  onChange={(e) => setBookDescription(e.target.value)}
                />
              </div>

              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>Fragmento Literario Destacado</label>
                <textarea
                  className={styles.fieldTextarea}
                  value={snippetText}
                  onChange={(e) => setSnippetText(e.target.value)}
                />
              </div>

              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>Frases a resaltar en la cita</label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={snippetHighlights}
                  onChange={(e) => setSnippetHighlights(e.target.value)}
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
            {submitting ? "Actualizando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
