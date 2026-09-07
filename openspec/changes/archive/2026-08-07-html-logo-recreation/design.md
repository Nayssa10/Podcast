# Technical Design: HTML/CSS/SVG Brand Logo Recreation

This technical design specifies the implementation details for recreating the brand logo of **team SUPERNOVA** as a live, responsive, and interactive React component in Next.js.

## 1. Technical Approach

The static hero image will be replaced by the `InteractiveLogo` component. To ensure the composition scales proportionally without layout distortion or text wrapping, the component will use **CSS Container Queries** (`container-type: inline-size`). All nested layout coordinates, sizes, font-sizes, and stroke-widths will be specified in container query width (`cqw`) units.

```tsx
// src/components/InteractiveLogo.tsx
import React from 'react';
import styles from './InteractiveLogo.module.css';

export interface InteractiveLogoProps {
  className?: string;
}

export default function InteractiveLogo({ className }: InteractiveLogoProps) {
  return (
    <div className={`${styles.logoWrapper} ${className || ''}`}>
      <div className={styles.logoInner}>
        {/* Render elements (Celestial, Texts, Cozy Desk, Evidence Desk, Centerpiece) */}
      </div>
    </div>
  );
}
```

---

## 2. Key Architecture Decisions

| Area | Option | Tradeoff | Decision |
|---|---|---|---|
| **Responsive Scaling** | Media queries vs. SVG viewBox vs. Container Queries | Media queries require step-changes. `viewBox` is scalable but restricts rich HTML/CSS features. Container queries enable fluid, local font and block scaling. | **Container Queries (`cqw`)** |
| **Asset Implementation** | External assets vs. Inline SVGs | External files reduce code length but complicate styling/animation. Inline SVGs allow class names, fills, and hover effects. | **Inline SVGs** for moon, fingerprint, stars, microphone, and leaf branch. |
| **Desk Elements** | Dynamic SVG paths vs. Styled CSS divs | SVGs require manual path plotting. CSS absolute blocks with rotations are easier to layout and style dynamically. | **CSS layouts** for Books, Kraft Folder, and Polaroid. |

---

## 3. Component Layout & Coordinates

All nested elements are absolutely positioned relative to `.logoInner` using `cqw` units:

* **Outer Circle Layout**:
  * `.logoWrapper`: `container-type: inline-size; width: 100%; aspect-ratio: 1; max-width: 700px; margin: 0 auto;`
  * `.logoInner`: `width: 96%; height: 96%; margin: 2%; border: 3px double var(--color-accent-1); border-radius: 50%; aspect-ratio: 1; position: relative;`

* **Overlapping Text ("team SUPERNOVA")**:
  * `"team"`: Monsieur La Doulaise (`font-size: 10cqw; top: 18cqw; left: 50%; transform: translateX(-50%); z-index: 2; font-family: var(--font-family-script);`)
  * `"SUPERNOVA"`: Cinzel (`font-size: 12cqw; top: 31cqw; left: 50%; transform: translateX(-50%); letter-spacing: 0.5cqw; font-family: var(--font-family-serif);`). The "O" contains an absolute SVG star (`.supernovaStar`).

* **Slogan & Taglines**:
  * Tagline `"LIBROS • ROMANCE • CRIMINALÍSTICA"`: Montserrat (`font-size: 2.2cqw; top: 46cqw; left: 50%; transform: translateX(-50%); letter-spacing: 0.5cqw;`). Includes absolute borders on the left and right.
  * Centerpiece: Microphone and soundwaves (`top: 55cqw; left: 50%; transform: translateX(-50%); width: 26cqw; height: auto;`).
  * Slogan `"donde cada historia deja una huella"`: Montserrat (`font-size: 2.8cqw; top: 68cqw; left: 50%; transform: translateX(-50%);`) with a handdrawn underline SVG and a small heart.

* **Top Elements (Celestial & Fingerprint)**:
  * Top-Left: SVG moon (`top: 18cqw; left: 18cqw; width: 12cqw;`), constellation SVG, and gold stars.
  * Top-Right: SVG fingerprint (`top: 15cqw; right: 18cqw; width: 14cqw;`) and handdrawn heart.

* **Bottom Cozy Desk**:
  * Stack of 4 books (`bottom: 8cqw; left: 6cqw;`). Label spines rotated via `writing-mode: vertical-rl;`.
  * Coffee Mug (`bottom: 5cqw; left: 24cqw; width: 16cqw; height: 16cqw;`) with a circular handle, steam SVGs, and "just one more chapter" script.
  * Gold leaf branch SVG placed behind the books and mug.

* **Bottom Evidence Desk**:
  * Kraft Folder (`bottom: 8cqw; right: 2cqw; width: 28cqw; height: 20cqw; rotate: -5deg;`).
  * Pinned Note (`top: 2cqw; left: 2cqw; rotate: 3deg;` relative to folder) labeled "cada detalle cuenta".
  * Polaroid Photo (`bottom: 2cqw; right: 6cqw; width: 18cqw; height: 20cqw; rotate: 6deg;`) containing Seattle skyline.

---

## 4. File Changes

### New Files
* `src/components/InteractiveLogo.tsx`: Standard functional React component rendering HTML and SVGs.
* `src/components/InteractiveLogo.module.css`: CSS containing absolute coordinates, fonts, hover animations, and the container definition.

### Modified Files
* `src/app/page.tsx`: Import `InteractiveLogo` and replace the static `logo.png` image with `<InteractiveLogo />` in the Hero section.
* `src/app/page.module.css`: Clean up `.heroLogo` properties and adjust margins/paddings surrounding the brand logo wrapper to accommodate the new component.

---

## 5. Testing Strategy

1. **Proportional Scaling**: Resize the parent container dynamically from `200px` to `800px` to verify all elements scale smoothly without layout displacement.
2. **Text Integrity**: Ensure vertical book spines and taglines retain alignment without wrapping or vertical overflowing.
3. **Cross-browser Compatibility**: Check that CSS Container Queries render correctly in Chromium, WebKit, and Gecko engines.
