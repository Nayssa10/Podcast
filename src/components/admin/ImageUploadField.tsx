"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./ImageUploadField.module.css";
import { IconUpload, IconTrash, IconImagePlaceholder } from "./AdminIcons";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description?: string;
  aspectRatioLabel?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  description,
  aspectRatioLabel = "JPG, PNG, WebP",
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate type
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
        onChange(data.url);
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
    <div className={styles.uploadFieldWrapper}>
      <div className={styles.labelHeader}>
        <label className={styles.fieldLabel}>{label}</label>
        <span className={styles.formatBadge}>{aspectRatioLabel}</span>
      </div>

      {description && <p className={styles.helperText}>{description}</p>}

      <div className={styles.uploadContainer}>
        {/* Preview Area */}
        <div className={styles.previewBox}>
          {value ? (
            <div className={styles.imageThumbnail}>
              <Image
                src={value}
                alt={label}
                fill
                sizes="120px"
                className={styles.previewImg}
                unoptimized
              />
              <button
                type="button"
                className={styles.removeFloatingBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
                title="Eliminar imagen"
                aria-label="Eliminar imagen"
              >
                <IconTrash size={13} />
              </button>
            </div>
          ) : (
            <div className={styles.placeholderThumbnail}>
              <IconImagePlaceholder size={24} className={styles.placeholderIcon} />
              <span className={styles.placeholderTag}>Sin Imagen</span>
            </div>
          )}
        </div>

        {/* Dropzone */}
        <div
          className={`${styles.dropZone} ${dragOver ? styles.dropZoneActive : ""} ${uploading ? styles.uploadingZone : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
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
              <span>Subiendo archivo...</span>
            </div>
          ) : (
            <div className={styles.dropZoneContent}>
              <IconUpload size={20} className={styles.uploadIconSvg} />
              <div className={styles.uploadActionText}>
                <strong>{value ? "Cambiar foto" : "Subir foto"}</strong> o arrastrar aquí
              </div>
              <div className={styles.uploadSubtext}>
                JPG, PNG o WebP
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
