"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./PhotoGalleryGrid.module.css";
import { IconUpload, IconTrash } from "./AdminIcons";

interface PhotoGalleryGridProps {
  photos: string[];
  onChange: (index: number, url: string) => void;
  labels?: string[];
}

interface GallerySlotItemProps {
  index: number;
  label: string;
  value: string;
  onUpdate: (url: string) => void;
}

function GallerySlotItem({ index, label, value, onUpdate }: GallerySlotItemProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onUpdate(data.url);
      } else {
        alert(data.error || "Error al subir la imagen");
      }
    } catch {
      alert("Error de conexión al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={styles.gallerySlot}>
      <div className={styles.slotHeader}>
        <span className={styles.slotBadge}>{label || `Fotograma #${index + 1}`}</span>
      </div>

      <div className={styles.slotFrame}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />

        {uploading ? (
          <div className={styles.uploadingState}>
            <div className={styles.spinner}></div>
            <span className={styles.spinnerText}>Subiendo...</span>
          </div>
        ) : value ? (
          <div
            className={styles.imageWrapper}
            onClick={() => fileInputRef.current?.click()}
            title="Haz clic para cambiar la foto"
          >
            <Image
              src={value}
              alt={`Fotograma ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 200px"
              className={styles.imageElement}
              unoptimized
            />
            <div className={styles.imageOverlay}>
              <div className={styles.overlayTop}>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdate("");
                  }}
                  title="Eliminar foto"
                  aria-label="Eliminar foto"
                >
                  <IconTrash size={12} />
                </button>
              </div>
              <div className={styles.overlayBottom}>
                <span className={styles.changeBtnBadge}>Cambiar</span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`${styles.dropZone} ${dragOver ? styles.dropZoneActive : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <IconUpload size={18} className={styles.dropIcon} />
            <p className={styles.dropText}>Subir foto</p>
            <span className={styles.dropSubtext}>16:9 • JPG, PNG</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PhotoGalleryGrid({
  photos,
  onChange,
  labels = ["Fotograma 1", "Fotograma 2", "Fotograma 3"],
}: PhotoGalleryGridProps) {
  // Always guarantee 3 slots
  const slots = [
    photos[0] || "",
    photos[1] || "",
    photos[2] || "",
  ];

  return (
    <div className={styles.galleryGrid}>
      {slots.map((photoUrl, idx) => (
        <GallerySlotItem
          key={idx}
          index={idx}
          label={labels[idx] || `Fotograma #${idx + 1}`}
          value={photoUrl}
          onUpdate={(url) => onChange(idx, url)}
        />
      ))}
    </div>
  );
}
