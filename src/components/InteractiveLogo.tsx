"use client";

import React from "react";
import Image from "next/image";
import styles from "./InteractiveLogo.module.css";

interface InteractiveLogoProps {
  className?: string;
}

export default function InteractiveLogo({ className }: InteractiveLogoProps) {
  return (
    <div className={`${styles.imageWrapper} ${className || ""}`}>
      <Image
        src="/logo-banner-transparent.png"
        alt="Team Supernova Logo"
        width={1521}
        height={608}
        className={styles.bannerImage}
        priority
      />
      <div className={styles.magnifyingGlass}></div>
    </div>
  );
}
