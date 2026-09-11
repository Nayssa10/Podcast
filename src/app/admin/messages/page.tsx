"use client";

import React, { useState } from "react";
import styles from "../admin.module.css";
import { ContactMessage } from "@/lib/store";
import { useAdminData } from "@/context/AdminDataContext";

export default function AdminMessagesPage() {
  const { messages, isReady, updateMessageStatusLocally, deleteMessageLocally, refreshData } = useAdminData();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "replied">("all");

  const handleUpdateStatus = async (id: string, newStatus: "unread" | "read" | "replied") => {
    updateMessageStatusLocally(id, newStatus);
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, status: newStatus });
    }

    try {
      await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      refreshData();
    } catch {
      alert("Error al actualizar estado");
      refreshData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Deseas eliminar este mensaje?")) return;

    deleteMessageLocally(id);
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }

    try {
      await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
      refreshData();
    } catch {
      alert("Error al eliminar mensaje");
      refreshData();
    }
  };

  const handleOpenMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (msg.status === "unread") {
      handleUpdateStatus(msg.id, "read");
    }
  };

  const filtered = messages.filter(m => {
    if (filter === "all") return true;
    return m.status === filter;
  });

  return (
    <div>
      <div className={styles.pageHeaderGroup}>
        <div>
          <h2 className={styles.pageHeading}>Buzón de Correspondencia</h2>
          <p className={styles.pageSubheading}>
            Mensajes, comentarios de lectura y consultas recibidas a través de la web.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <button
          onClick={() => setFilter("all")}
          className={`${styles.filterBtn} ${filter === "all" ? styles.filterBtnActive : ""}`}
        >
          Todos ({messages.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`${styles.filterBtn} ${filter === "unread" ? styles.filterBtnActive : ""}`}
        >
          No leídos ({messages.filter(m => m.status === "unread").length})
        </button>
        <button
          onClick={() => setFilter("read")}
          className={`${styles.filterBtn} ${filter === "read" ? styles.filterBtnActive : ""}`}
        >
          Leídos ({messages.filter(m => m.status === "read").length})
        </button>
        <button
          onClick={() => setFilter("replied")}
          className={`${styles.filterBtn} ${filter === "replied" ? styles.filterBtnActive : ""}`}
        >
          Respondidos ({messages.filter(m => m.status === "replied").length})
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedMessage ? "1fr 1.25fr" : "1fr", gap: "2rem", alignItems: "start" }}>
        {/* Messages List Table */}
        <div className={styles.cardSection}>
          {messages.length === 0 && !isReady ? (
            <p style={{ color: "#8E7F6E" }}>Cargando correspondencia...</p>
          ) : filtered.length === 0 ? (
            <p style={{ color: "#8E7F6E" }}>No hay mensajes en esta categoría.</p>
          ) : (
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Remitente</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th style={{ textAlign: "right" }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => handleOpenMessage(msg)}
                    style={{ cursor: "pointer", backgroundColor: selectedMessage?.id === msg.id ? "#FAF5EE" : "transparent" }}
                  >
                    <td>
                      <div><strong>{msg.name}</strong></div>
                      <div style={{ fontSize: "0.78rem", color: "#8E7F6E" }}>{msg.email}</div>
                    </td>
                    <td style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                      {new Date(msg.createdAt).toLocaleDateString("es-PE", { day: "2-digit", month: "short" })}
                    </td>
                    <td>
                      <span className={`${styles.tagPill} ${msg.status === "unread" ? styles.statusUnread : styles.statusRead}`}>
                        {msg.status === "unread" ? "No leído" : msg.status === "replied" ? "Respondido" : "Leído"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(msg.id);
                        }}
                        className={`${styles.actionTextBtn} ${styles.deleteBtn}`}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Message Detail Card */}
        {selectedMessage && (
          <div className={styles.cardSection}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>{selectedMessage.name}</h3>
                <span style={{ fontSize: "0.85rem", color: "#8C6B52" }}>{selectedMessage.email}</span>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className={styles.secondaryBtn}
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
              >
                Cerrar
              </button>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "#8E7F6E", letterSpacing: "1px", fontWeight: "700" }}>
                Fecha y Hora de Recepción:
              </span>
              <div style={{ fontSize: "0.88rem", color: "#2B231D", marginTop: "0.2rem" }}>
                {new Date(selectedMessage.createdAt).toLocaleString("es-PE", { dateStyle: "full", timeStyle: "medium" })}
              </div>
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "#8E7F6E", letterSpacing: "1px", fontWeight: "700" }}>
                Mensaje Recibido:
              </span>
              <div style={{
                backgroundColor: "#FAF8F5",
                border: "1px solid #EAE3D9",
                borderRadius: "4px",
                padding: "1.25rem",
                marginTop: "0.4rem",
                fontSize: "0.92rem",
                lineHeight: "1.7",
                color: "#2B231D",
                whiteSpace: "pre-wrap"
              }}>
                {selectedMessage.message}
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", borderTop: "1px solid #EAE3D9", paddingTop: "1.25rem" }}>
              <a
                href={`mailto:${selectedMessage.email}?subject=Re:%20Contacto%20Team%20Supernova`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleUpdateStatus(selectedMessage.id, "replied")}
                className={styles.primaryBtn}
              >
                Responder por Correo
              </a>

              {selectedMessage.status !== "replied" && (
                <button
                  onClick={() => handleUpdateStatus(selectedMessage.id, "replied")}
                  className={styles.secondaryBtn}
                >
                  Marcar como Respondido
                </button>
              )}

              {selectedMessage.status !== "unread" && (
                <button
                  onClick={() => handleUpdateStatus(selectedMessage.id, "unread")}
                  className={styles.secondaryBtn}
                >
                  Marcar como No leído
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
