"use client";

import React, { useState } from "react";
import styles from "../app/page.module.css";

const SOCIAL_LINKS = [
  {
    name: "Spotify",
    handle: "team SUPERNOVA",
    url: "https://open.spotify.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.306c-.215.353-.674.464-1.027.248-2.812-1.718-6.353-2.107-10.524-1.155-.401.092-.8-.163-.892-.564-.092-.401.163-.8.564-.892 4.567-1.042 8.484-.595 11.631 1.336.353.216.464.675.248 1.027zm1.469-3.267c-.27.441-.849.58-1.29.31-3.218-1.978-8.125-2.55-11.932-1.394-.499.151-1.027-.134-1.178-.633-.151-.499.134-1.027.633-1.178 4.354-1.321 9.771-.682 13.457 1.583.441.27.58.849.31 1.29zm.126-3.41c-3.859-2.292-10.228-2.503-13.896-1.389-.592.18-1.221-.154-1.401-.746-.18-.592.154-1.221.746-1.401 4.218-1.281 11.247-1.037 15.688 1.597.533.316.707 1.008.391 1.541-.316.533-1.008.707-1.541.391z"/>
      </svg>
    ),
    tag: "Escuchar episodios"
  },
  {
    name: "Instagram",
    handle: "@team__supernova",
    url: "https://www.instagram.com/team__supernova?stkn=b2VhdThlYXduaTVj",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    tag: "Comunidad & Novedades"
  },
  {
    name: "YouTube",
    handle: "team SUPERNOVA",
    url: "https://youtube.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    tag: "Videopodcasts & Casos"
  },
  {
    name: "TikTok",
    handle: "@teamsupernova",
    url: "https://tiktok.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    tag: "Microanálisis & Tropos"
  }
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [socialLinks, setSocialLinks] = useState(SOCIAL_LINKS);

  React.useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(settings => {
        if (settings) {
          setSocialLinks(prev => prev.map(item => {
            if (item.name === "Instagram" && settings.instagramUrl) {
              return { ...item, url: settings.instagramUrl };
            }
            if (item.name === "Spotify" && settings.spotifyUrl) {
              return { ...item, url: settings.spotifyUrl };
            }
            if (item.name === "YouTube" && settings.youtubeUrl) {
              return { ...item, url: settings.youtubeUrl };
            }
            if (item.name === "TikTok" && settings.tiktokUrl) {
              return { ...item, url: settings.tiktokUrl };
            }
            return item;
          }));
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={styles.contactLayout}>
      {/* Left Column: Socials & Channels */}
      <div className={styles.contactInfoCol}>
        <div className={styles.contactOverlineGroup}>
          <span className={styles.contactDividerLine}></span>
          <span className={styles.contactOverline}>CONECTA &amp; SÍGUENOS</span>
        </div>

        <h3 className={styles.contactTitle}>Hablemos de crímenes, libros y sombras</h3>
        <p className={styles.contactDescription}>
          ¿Tienes alguna teoría sobre un caso, una recomendación de novela o quieres colaborar con el podcast? Escríbenos o sigue las novedades en nuestras plataformas oficiales.
        </p>

        <div className={styles.socialIconsRow}>
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconBtn}
              aria-label={social.name}
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className={styles.directEmailNote}>
          <span className={styles.directEmailLabel}>Canal directo:</span>
          <a href="mailto:nayssakris@gmail.com" className={styles.directEmailLink}>
            nayssakris@gmail.com
          </a>
        </div>
      </div>

      {/* Right Column: Clean Open Form */}
      <div className={styles.contactFormCol}>
        <form onSubmit={handleSubmit} className={styles.contactFormClean}>
          <div className={styles.formRowTwoCols}>
            <div className={styles.formGroupClean}>
              <label htmlFor="name" className={styles.formLabelClean}>Tu Nombre</label>
              <input
                type="text"
                id="name"
                className={styles.formInputClean}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Victoria Vance"
                disabled={status === "submitting"}
                required
              />
            </div>

            <div className={styles.formGroupClean}>
              <label htmlFor="email" className={styles.formLabelClean}>Correo Electrónico</label>
              <input
                type="email"
                id="email"
                className={styles.formInputClean}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.email@ejemplo.com"
                disabled={status === "submitting"}
                required
              />
            </div>
          </div>

          <div className={styles.formGroupClean}>
            <label htmlFor="message" className={styles.formLabelClean}>Mensaje / Consulta</label>
            <textarea
              id="message"
              className={styles.formTextareaClean}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje, hipótesis o comentario..."
              disabled={status === "submitting"}
              rows={2}
              required
            />
          </div>

          {status === "success" && (
            <p className={styles.successMessageClean}>
              ✓ ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
            </p>
          )}

          {status === "error" && (
            <p className={styles.errorMessageClean}>
              ⚠ Por favor, completa todos los campos requeridos.
            </p>
          )}

          <button
            type="submit"
            className={styles.formSubmitBtnClean}
            disabled={status === "submitting"}
          >
            <span>{status === "submitting" ? "Enviando mensaje..." : "Enviar Mensaje"}</span>
            <span className={styles.btnArrow}>➔</span>
          </button>
        </form>
      </div>
    </div>
  );
}
