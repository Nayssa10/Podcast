"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Contraseña inválida");
        setIsLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta nuevamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <div className={styles.brandHeader}>
          <div className={styles.logoIcon}>✦</div>
          <h1 className={styles.brandTitle}>SUPERNOVA</h1>
          <p className={styles.brandSubtitle}>Acceso Privado &amp; Conducción</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorBox}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="admin-password" className={styles.label}>
              Contraseña de Acceso
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña..."
                className={styles.input}
                autoFocus
                required
              />
              <button
                type="button"
                className={styles.toggleBtn}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                tabIndex={-1}
              >
                {showPassword ? "👁️" : "🔒"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading || !password}
          >
            {isLoading ? "Validando acceso..." : "Entrar al Panel"}
          </button>
        </form>

        <div className={styles.footerLinks}>
          <Link href="/" className={styles.backLink}>
            ← Volver al sitio principal
          </Link>
        </div>
      </div>
    </div>
  );
}
