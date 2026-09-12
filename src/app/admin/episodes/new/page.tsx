"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../admin.module.css";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { useAdminData } from "@/context/AdminDataContext";
import { notifyDataChanged } from "@/lib/syncEvents";

const parseMultilineList = (text: string): string[] => {
  if (!text) return [];
  if (text.includes("\n")) {
    return text
      .split("\n")
      .map(s => s.replace(/^[-*•\d.)\]\s]+/, "").trim())
      .filter(Boolean);
  }
  return text
    .split(/[\n;]/)
    .map(s => s.trim())
    .filter(Boolean);
};

export default function NewEpisodePage() {
  const router = useRouter();
  const { updateEpisodeLocally, refreshData } = useAdminData();
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [number, setNumber] = useState("EP 04");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"forensic" | "book">("forensic");
  const [date, setDate] = useState(new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" }));
  const [duration, setDuration] = useState("06:00");
  const [audioUrl, setAudioUrl] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  const [description, setDescription] = useState("");

  // Images
  const [coverImage, setCoverImage] = useState("/ep1_library_cover.jpg");
  const [evidenceImage, setEvidenceImage] = useState("/ep1_library_cover.jpg");
  const [photoStrip1, setPhotoStrip1] = useState("/ep1_library_cover.jpg");
  const [photoStrip2, setPhotoStrip2] = useState("/ep3_forensic_cover.jpg");
  const [photoStrip3, setPhotoStrip3] = useState("/ep2_perfume_cover.jpg");

  // Forensic
  const [criminologyDetails, setCriminologyDetails] = useState("");
  const [keyEvidence, setKeyEvidence] = useState("");
  const [forensicFocus, setForensicFocus] = useState("");

  // Book
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPages, setBookPages] = useState("378");
  const [bookRating, setBookRating] = useState(4);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [bookIsRecommended, setBookIsRecommended] = useState(true);
  const [bookFormatPhysical, setBookFormatPhysical] = useState(false);
  const [bookFormatDigital, setBookFormatDigital] = useState(true);
  const [bookFormatAudiobook, setBookFormatAudiobook] = useState(true);
  const [bookSagaInfo, setBookSagaInfo] = useState("1");
  const [bookOpinion, setBookOpinion] = useState("");
  const [bookCharacters, setBookCharacters] = useState<Array<{ name: string; role: string }>>([
    { name: "Marcus", role: "El Conde" },
    { name: "Dani", role: "Protagonista" }
  ]);
  const [tropeLove, setTropeLove] = useState(5);
  const [tropeAnger, setTropeAnger] = useState(5);
  const [tropeSadness, setTropeSadness] = useState(5);
  const [tropeFantasy, setTropeFantasy] = useState(5);
  const [tropeSpicy, setTropeSpicy] = useState(5);
  const [tropeLaugh, setTropeLaugh] = useState(5);
  const [tropeEnding, setTropeEnding] = useState(5);

  const [snippetText, setSnippetText] = useState("");
  const [snippetHighlights, setSnippetHighlights] = useState("");

  const addCharacter = () => setBookCharacters([...bookCharacters, { name: "", role: "" }]);
  const updateCharacter = (idx: number, field: "name" | "role", val: string) => {
    const updated = [...bookCharacters];
    updated[idx][field] = val;
    setBookCharacters(updated);
  };
  const removeCharacter = (idx: number) => {
    if (bookCharacters.length <= 1) {
      setBookCharacters([{ name: "", role: "" }]);
    } else {
      setBookCharacters(bookCharacters.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newId = Date.now().toString();

    const payload: any = {
      id: newId,
      number,
      title,
      type,
      date,
      duration,
      coverImage: coverImage || "/logo-clean.png",
      evidenceImage: type === "forensic" ? (evidenceImage || coverImage) : undefined,
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
        keyPhysicalEvidence: parseMultilineList(keyEvidence),
        forensicFocus: parseMultilineList(forensicFocus)
      };
      payload.bookDetails = undefined;
      payload.snippet = undefined;
    } else {
      const validCharacters = bookCharacters.filter(c => c.name.trim() || c.role.trim());
      payload.bookDetails = {
        title: bookTitle || title,
        author: bookAuthor || "Nayssa Kristel",
        description: description,
        pages: Number(bookPages) || 378,
        rating: Number(bookRating) || 4,
        isRecommended: Boolean(bookIsRecommended),
        formats: {
          physical: Boolean(bookFormatPhysical),
          digital: Boolean(bookFormatDigital),
          audiobook: Boolean(bookFormatAudiobook)
        },
        sagaInfo: bookSagaInfo || "1",
        opinion: bookOpinion || snippetText,
        characters: validCharacters.length > 0 ? validCharacters : [
          { name: "Marcus", role: "El Conde" },
          { name: "Dani", role: "Protagonista" }
        ],
        tropeRatings: {
          love: Number(tropeLove) || 5,
          anger: Number(tropeAnger) || 5,
          sadness: Number(tropeSadness) || 5,
          fantasy: Number(tropeFantasy) || 5,
          spicy: Number(tropeSpicy) || 5,
          laugh: Number(tropeLaugh) || 5,
          ending: Number(tropeEnding) || 5
        },
        coverIcon: "📖"
      };
      payload.forensicDetails = undefined;
      if (snippetText) {
        payload.snippet = {
          text: snippetText,
          highlights: snippetHighlights ? snippetHighlights.split(",").map(s => s.trim()).filter(Boolean) : []
        };
      } else {
        payload.snippet = undefined;
      }
    }

    try {
      const res = await fetch("/api/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          updateEpisodeLocally(json.data);
        }
        await refreshData();
        notifyDataChanged("episodes");
        router.push("/admin/episodes");
      } else {
        alert("Error al crear el episodio");
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
          <h2 className={styles.pageHeading}>Nuevo Expediente</h2>
          <p className={styles.pageSubheading}>
            Completa la ficha técnica para añadir un nuevo caso o lectura al catálogo.
          </p>
        </div>

        <Link href="/admin/episodes" className={styles.secondaryBtn}>
          Cancelar
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        {/* =========================================
            FILA SUPERIOR: 1. INFORMACIÓN GENERAL + 2. IMÁGENES AL LADO
           ========================================= */}
        <div className={styles.formTopRow}>
          {/* Contenedor 1: Información General */}
          <div className={styles.cardSection} style={{ marginBottom: 0 }}>
            <h3 className={styles.cardTitle} style={{ marginBottom: "1.25rem" }}>
              1. Información General
            </h3>

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
                  placeholder="Ej. Episodio 4: El Velo del Silencio"
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
                  placeholder="06:00"
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
                  rows={2}
                  placeholder="Descripción del episodio que se mostrará en el catálogo..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Contenedor 2: Imágenes al lado */}
          <div className={styles.cardSection} style={{ marginBottom: 0 }}>
            <h3 className={styles.cardTitle} style={{ marginBottom: "1.25rem" }}>
              2. Imágenes del Episodio
            </h3>

            {type === "forensic" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <ImageUploadField
                  label="Portada Principal"
                  value={coverImage}
                  onChange={setCoverImage}
                  description="Visible en el catálogo y reproductor."
                  aspectRatioLabel="1:1 o 3:4"
                />

                <ImageUploadField
                  label="Evidencia Fotográfica"
                  value={evidenceImage}
                  onChange={setEvidenceImage}
                  description="Visible en el expediente criminalístico."
                  aspectRatioLabel="Foto Escena 1:1"
                />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <ImageUploadField
                  label="Portada del Libro / Novela"
                  value={coverImage}
                  onChange={setCoverImage}
                  description="Portada principal en el modal de lectura."
                  aspectRatioLabel="Portada 3:4"
                />

                <div style={{ borderTop: "1px dashed #DCD3C7", paddingTop: "0.85rem" }}>
                  <span style={{ fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "#8C6B52", display: "block", marginBottom: "0.6rem" }}>
                    Moodboard (2 Fotogramas)
                  </span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <ImageUploadField
                      label="Fotograma 1"
                      value={photoStrip1}
                      onChange={setPhotoStrip1}
                      description="Libreta espiral."
                      aspectRatioLabel="16:9"
                    />
                    <ImageUploadField
                      label="Fotograma 2"
                      value={photoStrip2}
                      onChange={setPhotoStrip2}
                      description="Polaroid brillos."
                      aspectRatioLabel="16:9"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================
            FILA INFERIOR (ABAJO DE ELLOS): 3. FICHA ESPECÍFICA A ANCHO COMPLETO
           ========================================= */}
        {type === "forensic" ? (
          <div className={styles.cardSection}>
            <h3 className={styles.cardTitle} style={{ marginBottom: "1.25rem" }}>
              3. Ficha Pericial &amp; Criminalística
            </h3>
            <div className={styles.formGrid}>
              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>Reconstrucción de la Escena / Hechos</label>
                <textarea
                  className={styles.fieldTextarea}
                  value={criminologyDetails}
                  onChange={(e) => setCriminologyDetails(e.target.value)}
                  rows={3}
                  placeholder="Detalles sobre la reconstrucción pericial..."
                />
              </div>

              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>
                  Cadena de Custodia • Muestras y Evidencias Físicas (un elemento por línea)
                </label>
                <textarea
                  rows={5}
                  className={styles.fieldTextarea}
                  value={keyEvidence}
                  onChange={(e) => setKeyEvidence(e.target.value)}
                  placeholder={"Escribe cada muestra o indicio en una línea separada. Ejemplo:\nMarcas de estrangulamiento: lesiones perimortem observadas...\nLesiones corporales: contusiones múltiples...\nEscenas de los hechos: indicios recolectados..."}
                />
              </div>

              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <label className={styles.fieldLabel}>
                  Foco Pericial (un punto o disciplina por línea)
                </label>
                <textarea
                  rows={4}
                  className={styles.fieldTextarea}
                  value={forensicFocus}
                  onChange={(e) => setForensicFocus(e.target.value)}
                  placeholder={"Balística forense: análisis del arma utilizada...\nBiología y genética forense: análisis de manchas de sangre...\nDactiloscopía: estudio de huellas encontradas..."}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.cardSection}>
            <h3 className={styles.cardTitle} style={{ marginBottom: "1.25rem" }}>
              3. Ficha de Reseña de Lectura (Diario del Club)
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {/* Columna Izquierda: Datos del Libro */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Título del Libro</label>
                    <input
                      type="text"
                      className={styles.fieldInput}
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      placeholder="Ej. El Veneno del Amor"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Autor / Autora</label>
                    <input
                      type="text"
                      className={styles.fieldInput}
                      value={bookAuthor}
                      onChange={(e) => setBookAuthor(e.target.value)}
                      placeholder="Ej. Clara Thorne"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Páginas</label>
                    <input
                      type="text"
                      className={styles.fieldInput}
                      value={bookPages}
                      onChange={(e) => setBookPages(e.target.value)}
                      placeholder="Ej. 378"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Calificación (Estrellas)</label>
                    <div style={{ display: "flex", gap: "0.25rem", alignItems: "center", minHeight: "42px" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setBookRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1.6rem",
                            lineHeight: 1,
                            padding: "0 0.15rem",
                            color: star <= (hoverRating ?? bookRating) ? "#B8860B" : "#D4C5B9",
                            transition: "transform 0.15s ease, color 0.15s ease",
                          }}
                          title={`${star} de 5 estrellas`}
                          aria-label={`${star} estrellas`}
                        >
                          ★
                        </button>
                      ))}
                      <span style={{ fontSize: "0.85rem", color: "#8C6B52", fontWeight: 600, marginLeft: "0.5rem" }}>
                        {(hoverRating ?? bookRating)} / 5
                      </span>
                    </div>
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>¿Recomiendo?</label>
                    <select
                      className={styles.fieldSelect}
                      value={bookIsRecommended ? "yes" : "no"}
                      onChange={(e) => setBookIsRecommended(e.target.value === "yes")}
                    >
                      <option value="yes">✓ Sí</option>
                      <option value="no">✕ No</option>
                    </select>
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Saga / Tomo</label>
                    <input
                      type="text"
                      className={styles.fieldInput}
                      value={bookSagaInfo}
                      onChange={(e) => setBookSagaInfo(e.target.value)}
                      placeholder="Ej. 1"
                    />
                  </div>

                  <div className={`${styles.formField} ${styles.fullWidth}`}>
                    <label className={styles.fieldLabel}>Formatos</label>
                    <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.15rem" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={bookFormatPhysical}
                          onChange={(e) => setBookFormatPhysical(e.target.checked)}
                        />
                        Físico
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={bookFormatDigital}
                          onChange={(e) => setBookFormatDigital(e.target.checked)}
                        />
                        Digital
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={bookFormatAudiobook}
                          onChange={(e) => setBookFormatAudiobook(e.target.checked)}
                        />
                        Audiolibro
                      </label>
                    </div>
                  </div>

                  <div className={`${styles.formField} ${styles.fullWidth}`}>
                    <label className={styles.fieldLabel}>Mini Opinión (Caja de reseña manuscrita)</label>
                    <textarea
                      className={styles.fieldTextarea}
                      value={bookOpinion}
                      onChange={(e) => setBookOpinion(e.target.value)}
                      rows={2}
                      placeholder="Opinión personal sobre la lectura..."
                    />
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Personajes & Tropos */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Personajes */}
                <div style={{ background: "rgba(255, 255, 255, 0.7)", padding: "0.9rem", borderRadius: "12px", border: "1px solid #DCD3C7" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label className={styles.fieldLabel} style={{ margin: 0 }}>⫸ Personajes de la Novela</label>
                    <button
                      type="button"
                      onClick={addCharacter}
                      className={styles.secondaryBtn}
                      style={{ fontSize: "0.7rem", padding: "0.2rem 0.55rem" }}
                    >
                      + Añadir
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: "190px", overflowY: "auto", paddingRight: "0.2rem" }}>
                    {bookCharacters.map((char, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
                        <input
                          type="text"
                          className={styles.fieldInput}
                          value={char.name}
                          onChange={(e) => updateCharacter(idx, "name", e.target.value)}
                          placeholder="Nombre (Marcus)"
                          style={{ width: "45%", padding: "0.4rem 0.6rem" }}
                        />
                        <input
                          type="text"
                          className={styles.fieldInput}
                          value={char.role}
                          onChange={(e) => updateCharacter(idx, "role", e.target.value)}
                          placeholder="Rol (El Conde)"
                          style={{ flex: 1, padding: "0.4rem 0.6rem" }}
                        />
                        <button
                          type="button"
                          onClick={() => removeCharacter(idx)}
                          className={styles.secondaryBtn}
                          style={{ padding: "0.35rem 0.55rem", borderRadius: "8px", border: "1px solid #DCD3C7", cursor: "pointer" }}
                          title="Eliminar"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medidores de Tropos */}
                <div style={{ background: "rgba(255, 255, 255, 0.7)", padding: "0.9rem", borderRadius: "12px", border: "1px solid #DCD3C7" }}>
                  <label className={styles.fieldLabel} style={{ display: "block", marginBottom: "0.5rem" }}>
                    Medidores de Tropos &amp; Emociones (1 a 5)
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", gap: "0.45rem" }}>
                    <div>
                      <label style={{ fontSize: "0.68rem", color: "#8C6B52", fontWeight: 600, display: "block", marginBottom: "0.15rem" }}>Amor ♥</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        className={styles.fieldInput}
                        value={tropeLove}
                        onChange={(e) => setTropeLove(Number(e.target.value))}
                        style={{ padding: "0.35rem 0.45rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.68rem", color: "#8C6B52", fontWeight: 600, display: "block", marginBottom: "0.15rem" }}>Enojo 😡</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        className={styles.fieldInput}
                        value={tropeAnger}
                        onChange={(e) => setTropeAnger(Number(e.target.value))}
                        style={{ padding: "0.35rem 0.45rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.68rem", color: "#8C6B52", fontWeight: 600, display: "block", marginBottom: "0.15rem" }}>Tristeza 😢</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        className={styles.fieldInput}
                        value={tropeSadness}
                        onChange={(e) => setTropeSadness(Number(e.target.value))}
                        style={{ padding: "0.35rem 0.45rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.68rem", color: "#8C6B52", fontWeight: 600, display: "block", marginBottom: "0.15rem" }}>Fantasía ✦</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        className={styles.fieldInput}
                        value={tropeFantasy}
                        onChange={(e) => setTropeFantasy(Number(e.target.value))}
                        style={{ padding: "0.35rem 0.45rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.68rem", color: "#8C6B52", fontWeight: 600, display: "block", marginBottom: "0.15rem" }}>Spicy 🔥</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        className={styles.fieldInput}
                        value={tropeSpicy}
                        onChange={(e) => setTropeSpicy(Number(e.target.value))}
                        style={{ padding: "0.35rem 0.45rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.68rem", color: "#8C6B52", fontWeight: 600, display: "block", marginBottom: "0.15rem" }}>Risa 😆</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        className={styles.fieldInput}
                        value={tropeLaugh}
                        onChange={(e) => setTropeLaugh(Number(e.target.value))}
                        style={{ padding: "0.35rem 0.45rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.68rem", color: "#8C6B52", fontWeight: 600, display: "block", marginBottom: "0.15rem" }}>Final ✦</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        className={styles.fieldInput}
                        value={tropeEnding}
                        onChange={(e) => setTropeEnding(Number(e.target.value))}
                        style={{ padding: "0.35rem 0.45rem" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ marginTop: "1.75rem", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
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
