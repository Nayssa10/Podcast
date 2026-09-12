"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import AudioPlayer from "@/components/AudioPlayer";
import ForensicFolderCard from "@/components/ForensicFolderCard";
import ReadingNotebookCard from "@/components/ReadingNotebookCard";
import ReadingDeskModal, { HighlightItem } from "@/components/ReadingDeskModal";
import ForensicDossierModal from "@/components/ForensicDossierModal";
import ScrollEpisodeNavigator from "@/components/ScrollEpisodeNavigator";
import { HostProfile } from "@/lib/store";
import { subscribeToDataChanges } from "@/lib/syncEvents";
import styles from "./page.module.css";

interface EpisodeData {
  number: string;
  date: string;
  title: string;
  type: "forensic" | "book";
  coverImage: string;
  evidenceImage?: string;
  photoStrip1?: string;
  photoStrip2?: string;
  photoStrip3?: string;
  description: string;
  url: string;
  duration: string;
  headlineQuestion?: string;
  authorName?: string;
  bookDetails: {
    title: string;
    author: string;
    description: string;
    coverIcon?: string;
  };
  forensicDetails: {
    criminologyDetails: string;
    keyPhysicalEvidence: string[];
    forensicFocus: string;
  };
  snippet?: {
    text: string;
    highlights: string[];
  };
  annotations?: Array<{ text: string; position: string }>;
  highlightsList?: HighlightItem[];
  headerScriptText?: string;
  headerSubText?: string;
}

const MOCK_EPISODES: EpisodeData[] = [
  {
    number: "EP 01",
    date: "05 de Agosto, 2026",
    title: "Episodio 1: Sombras en la Biblioteca",
    type: "forensic",
    coverImage: "/ep1_library_cover.jpg",
    description: "Analizamos el thriller romántico gótico del año, discutiendo la tensión entre los protagonistas y los métodos de criminalística forense que desvelan el misterio de la mansión Blackwood.",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "06:12",
    bookDetails: {
      title: "La Sombra de Blackwood",
      author: "G. H. Vance",
      description: "Un oscuro romance gótico donde una joven institutriz desvela secretos familiares ocultos tras las paredes de la mansión, enfrentando una red de mentiras y pasiones prohibidas.",
      coverIcon: "🏰"
    },
    forensicDetails: {
      criminologyDetails: "Análisis del estrangulamiento manual y reconstrucción de la trayectoria de caída desde la torre oeste de la mansión.",
      keyPhysicalEvidence: ["Cuerda de cáñamo con nudo marinero", "Fragmentos de vidrio azul cobalto", "Huellas de botas de montar en el lodo"],
      forensicFocus: "Toxicología forense (arsénico) e identificación de fibras textiles."
    },
    snippet: {
      text: "“¿Segura de que quieres abrir esa puerta, institutriz?”, me susurró al oído. Su respiración era cálida contra mi cuello helado, pero sus manos firmes revelaban una verdad diferente.”",
      highlights: ["institutriz", "verdad diferente"]
    },
    annotations: [
      { text: "¡ESTÁ OBSESIONADO! 🥀", position: "15%" },
      { text: "plssssss 😭", position: "48%" },
      { text: "no puedo con esto 💔", position: "78%" }
    ]
  },
  {
    number: "EP 02",
    date: "29 de Julio, 2026",
    title: "Episodio 2: El Perfume de la Coartada",
    type: "book",
    coverImage: "/ep2_perfume_cover.jpg",
    description: "Exploramos la química del amor y el veneno. Una inmersión profunda en la literatura de misterio y romance clásico, analizando las técnicas reales de toxicología utilizadas para resolver crímenes pasionales.",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "07:05",
    bookDetails: {
      title: "El Veneno del Amor",
      author: "Clara Thorne",
      description: "Una intriga de época victoriana donde una perfumista de la alta sociedad utiliza esencias mortales para vengar a sus seres queridos, mientras un inspector sigue su rastro aromático.",
      coverIcon: "🧪"
    },
    forensicDetails: {
      criminologyDetails: "Estudio toxicológico de envenenamiento sistemático. Clasificación de toxinas orgánicas y sintomatología de la víctima.",
      keyPhysicalEvidence: ["Frasco de perfume de cristal tallado", "Manchas de cianuro de hidrógeno en la taza", "Carta perfumada con trazas de belladona"],
      forensicFocus: "Espectrometría de masas y cromatografía líquida de alta resolución."
    },
    headerScriptText: "three",
    headerSubText: "SIDE CHARACTER HIGHLIGHTS",
    highlightsList: [
      {
        number: "1",
        numberColorClass: "pink",
        highlighterClass: "highlighterPink",
        character: "ROSIE SULLIVAN",
        lines: [
          { text: "“Tell that man to hurry up and put a ring on it, Liv,” Grammy says." },
          { text: "I wince. “That’s a bit like putting the cart before the horse.”" },
          {
            text: "“Y’all haven’t exactly done things in the proper order anyway, have ya? Might as well take it all the way to the chapel.”",
            isHighlighted: true,
          },
        ],
      },
      {
        number: "2",
        numberColorClass: "purple",
        highlighterClass: "highlighterPurple",
        character: "RUBY LYNN HAYES",
        lines: [
          { text: "Ruby cocks her head to one side, studying my face. " },
          { text: "“What’s your story?”", isHighlighted: true },
          { text: "“What do you mean?”" },
          {
            text: "“Orphan? Stalker ex-boyfriend? Tortured past? Scorned lover? The Hayes siblings have a history of falling for broken things.”",
            isHighlighted: true,
          },
        ],
      },
      {
        number: "3",
        numberColorClass: "blue",
        highlighterClass: "highlighterBlue",
        character: "GRIFFIN HAYES",
        lines: [
          {
            text: "“Olivia and I met on the plane back from Denver. The flight was diverted, and we ended up spending some time together.”",
          },
          {
            text: "“You sure know how to distract yourself from that fear of flying,” Griffin quips.",
            isHighlighted: true,
          },
        ],
      },
    ],
    snippet: {
      text: "“El veneno no tiene olor para el hombre que ama con locura. Bebió el elixir sin vacilar, mirándome directo a los ojos como si supiera que aquel trago sería su último aliento.”",
      highlights: ["veneno", "último aliento"]
    },
    annotations: [
      { text: "¡QUÉ INTENSO! 🧪", position: "25%" },
      { text: "lloro literal 🥺", position: "65%" }
    ]
  },
  {
    number: "EP 03",
    date: "22 de Julio, 2026",
    title: "Episodio 3: Susurros Celestiales y Evidencia Física",
    type: "forensic",
    coverImage: "/ep3_forensic_cover.jpg",
    description: "Una reseña detallada sobre novelas de romance policiaco contemporáneo. Analizamos la balística reconstructiva en la narrativa frente a la realidad del laboratorio forense.",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "05:44",
    bookDetails: {
      title: "Susurros de la Bala",
      author: "Marcus Vance",
      description: "Un tenso romance policial contemporáneo. Una agente del FBI y un detective de homicidios deben confiar el uno en el otro para atrapar a un asesino selectivo en las calles lluviosas de Seattle.",
      coverIcon: "🔍"
    },
    forensicDetails: {
      criminologyDetails: "Reconstrucción balística tridimensional de la escena. Ángulo de disparo y trayectoria del proyectil en espacio cerrado.",
      keyPhysicalEvidence: ["Casquillo percutido de 9mm de latón", "Estrías de bala compatibles con cañón estriado", "Residuos de disparo (pólvora) en guante de cuero"],
      forensicFocus: "Balística forense y microscopía electrónica de barrido."
    },
    snippet: {
      text: "“La bala había atravesado la pared de ladrillos, pero lo que realmente me detuvo fue el residuo de pólvora en su guante de cuero. Su coartada era perfecta; mi corazón, un desastre.”",
      highlights: ["residuo de pólvora", "un desastre"]
    },
    annotations: [
      { text: "¡SE PUSO TENSO! 🔍", position: "20%" },
      { text: "no me lo esperaba 😱", position: "55%" }
    ]
  }
];

const DEFAULT_HOST_PROFILE: HostProfile = {
  name: 'Nayssa Kristel',
  subtitle: 'investigación & literatura',
  roleBadge: 'voz principal, mente analítica, creadora.',
  basicInfo: 'Soy Nayssa Kristel, creadora de Team Supernova. Un espacio donde la belleza de la literatura gótica y el romance de misterio se encuentran con el análisis riguroso, la ciencia criminal y la toxicología forense.',
  extraInfoText: 'Como única creadora de Team Supernova, Nayssa fusiona el análisis literario profundo con la rigurosidad científica.',
  investigationFocus: 'Desentrañando el misterio de la página a la escena del crimen.',
  quote: 'Deep into that darkness peering, long I stood there wondering, fearing, doubting, dreaming dreams no mortal ever dared to dream before.'
};

export default function Home() {
  const [episodes, setEpisodes] = useState<EpisodeData[]>(MOCK_EPISODES);
  const [profile, setProfile] = useState<HostProfile>(DEFAULT_HOST_PROFILE);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number | null>(null);

  const loadData = React.useCallback(() => {
    const t = Date.now();
    fetch(`/api/episodes?t=${t}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEpisodes(data);
        }
      })
      .catch(() => {});

    fetch(`/api/profile?t=${t}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error && data.name) {
          setProfile(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToDataChanges(() => {
      loadData();
    });
    return unsubscribe;
  }, [loadData]);

  const renderHighlightedSnippet = (text: string, highlights: string[] = []) => {
    if (!highlights.length) return text;
    const regex = new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      highlights.includes(part) ? <mark key={i} className={styles.gothicHighlight}>{part}</mark> : part
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEpisodeIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const isModalOpen = selectedEpisodeIndex !== null;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEpisodeIndex]);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.mainContainer}>
      {/* Navigation Header - Solid Editorial Style */}
      <header className={styles.navbar}>
        <div className={styles.navBrand} onClick={scrollToTop}>
          <div className={styles.brandLogoFrame}>
            <Image
              src="/logo.png"
              alt="team SUPERNOVA"
              width={34}
              height={34}
              className={styles.brandLogoImg}
            />
          </div>
          <div className={styles.brandTextGroup}>
            <span className={styles.brandTitle}>team SUPERNOVA</span>
            <span className={styles.brandSubtitle}>investigación & literatura</span>
          </div>
        </div>

        <nav className={styles.navLinks}>
          <a href="#" onClick={scrollToTop} className={styles.navLink}>Inicio</a>
          <a href="#episodes" onClick={scrollToSection("episodes")} className={styles.navLink}>Episodios</a>
          <a href="#about" onClick={scrollToSection("about")} className={styles.navLink}>Sobre mí</a>
          <a href="#contact" onClick={scrollToContact} className={styles.navLink}>Contacto</a>
        </nav>

        <div className={styles.navAction}>
          <button 
            className={styles.navCtaBtn}
            onClick={() => setSelectedEpisodeIndex(0)}
            aria-label="Escuchar último episodio"
          >
            Escuchar Episodio
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContentLeft}>
          <div className={styles.heroBadgeGroup}>
            <span className={styles.heroBadge}>✦ Podcast Literario & Forense ✦</span>
          </div>
          <h1 className={styles.heroTitle}>{profile.name}</h1>
          <h2 className={styles.heroSubtitle}>{profile.subtitle}</h2>
          <p className={styles.heroDescription}>
            {profile.extraInfoText || "Un espacio donde la belleza de la literatura gótica y el romance de misterio se encuentran con el análisis riguroso y la ciencia criminal."}
          </p>
          <div className={styles.heroCtas}>
            <a 
              href="#episodes" 
              onClick={scrollToSection("episodes")}
              className={styles.heroPrimaryBtn}
            >
              Escuchar Episodios
            </a>
            <a 
              href="#about" 
              onClick={scrollToSection("about")}
              className={styles.heroSecondaryBtn}
            >
              Sobre el Caso
            </a>
          </div>
          <div className={styles.heroQuoteFooter}>
            <span className={styles.heroStar}>✦</span>
            <span className={styles.heroTagline}>{profile.investigationFocus || "donde cada historia deja una huella"}</span>
            <span className={styles.heroStar}>✦</span>
          </div>
        </div>
        <div className={styles.heroContentRight}>
          <div className={styles.logoFramelessContainer}>
            <Image
              src="/logo-clean.png"
              alt="team SUPERNOVA Logo"
              width={480}
              height={480}
              className={styles.heroLogoFrameless}
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Intro / Welcome Section (Centrado y limpio) */}
      <section id="about" className={styles.introWelcomeSection}>
        <div className={styles.introWelcomeContainer}>
          <div className={styles.introContentCol}>
            <span className={styles.introCursiveHeader}>¡Hola! Te doy la bienvenida ♥</span>
            <h3 className={styles.introMainTitle}>Me alegra que estés aquí.</h3>
            <p className={styles.introParagraph}>
              {profile.basicInfo}
            </p>
          </div>
        </div>
      </section>

      {/* Latest Episodes Section (3-Column Editorial Grid) */}
      <section id="episodes" className={styles.latestEditorialSection}>
        <div className={styles.editorialSectionHeader}>
          <span className={styles.editorialOverline}>EXPEDIENTES &amp; LECTURAS RECIENTES</span>
          <span className={styles.editorialHeartDivider}>♥ ✦ ♥</span>
          <h2 className={styles.editorialSectionTitle}>Últimos Episodios Publicados</h2>
          <p className={styles.editorialSectionSubtitle}>
            Casos criminales, peritajes forenses y análisis literarios listos para escuchar.
          </p>
        </div>

        <div className={styles.editorialCardsGrid}>
          {episodes.map((ep, idx) => {
            const cleanTitle = ep.title.split(": ")[1] || ep.title;
            const isForensic = ep.type === "forensic";
            const categoryLabel = isForensic ? "Criminalística" : "Romance";
            const imageSrc = ep.coverImage || ep.evidenceImage || (isForensic ? "/ep1_library_cover.jpg" : "/ep2_perfume_cover.jpg");
            const episodeIndexStr = String(idx + 1).padStart(2, "0");

            return (
              <article
                key={ep.number || idx}
                className={styles.podcastCoverCard}
                onClick={() => setSelectedEpisodeIndex(idx)}
              >
                {/* Giant Watermark Episode Number in Background */}
                <span className={styles.cardWatermarkNum} aria-hidden="true">
                  {episodeIndexStr}
                </span>

                {/* Card Top Row: Overline + Category Pill */}
                <div className={styles.cardTopRow}>
                  <div className={styles.cardHeaderBadge}>
                    <span className={styles.cardHeaderStar}>✦</span>
                    <span>NUEVO EPISODIO</span>
                  </div>
                  <span className={styles.cardCategoryPill}>
                    {isForensic ? "⚖️" : "🥀"} {categoryLabel}
                  </span>
                </div>

                {/* Centerpiece: Floating Mini Player Card */}
                <div className={styles.miniPlayerFrame}>
                  {/* Media Cover with Overlay Badges */}
                  <div className={styles.miniPlayerCoverWrapper}>
                    <Image
                      src={imageSrc}
                      alt={cleanTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className={styles.miniPlayerCoverImg}
                      unoptimized
                    />
                    <div className={styles.miniPlayerHostPill}>
                      <span className={styles.miniPlayerHostDot}>●</span> Nayssa Kristel
                    </div>
                    {ep.duration && (
                      <div className={styles.miniPlayerDurationBadge}>
                        {ep.duration}
                      </div>
                    )}
                  </div>

                  {/* Track Info & Details inside Player Frame */}
                  <div className={styles.miniPlayerInfo}>
                    <span className={styles.miniPlayerEpNumber}>{ep.number || `EPISODIO ${episodeIndexStr}`}</span>
                    <h3 className={styles.miniPlayerTitle}>{cleanTitle}</h3>
                    <p className={styles.miniPlayerSubtitle}>
                      {ep.bookDetails?.author ? `Novela de ${ep.bookDetails.author}` : "team SUPERNOVA Podcast"}
                    </p>

                    {/* Compact Audio Controller */}
                    <div
                      className={styles.miniPlayerAudioWrapper}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AudioPlayer
                        track={{
                          title: ep.title,
                          description: ep.description,
                          url: ep.url,
                          duration: ep.duration,
                        }}
                        variant="compact"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Action CTA Button */}
                <div className={styles.cardBottomBar}>
                  <button
                    type="button"
                    className={styles.cardDetailActionBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEpisodeIndex(idx);
                    }}
                  >
                    {isForensic ? "Examinar Expediente ➔" : "Leer Diario de Lectura ➔"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Warm Editorial Footer Section */}
      <footer id="contact" className={styles.warmFooterSection}>
        <div className={styles.warmFooterContainer}>
          <div className={styles.contactWrapper} style={{ marginBottom: 0, width: "100%" }}>
            <ContactForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.warmFooterBottomBar}>
          <p>&copy; 2026 team SUPERNOVA. Todos los derechos reservados.</p>
          <div className={styles.warmFooterLinks}>
            <a href="#" onClick={scrollToTop} className={styles.warmFooterLink}>Inicio</a>
            <a href="#about" onClick={scrollToSection("about")} className={styles.warmFooterLink}>Sobre mí</a>
            <a href="#episodes" onClick={scrollToSection("episodes")} className={styles.warmFooterLink}>Episodios</a>
            <a href="#contact" onClick={scrollToContact} className={styles.warmFooterLink}>Contacto</a>
          </div>
        </div>
      </footer>

      {/* Reading Category Desk Modal */}
      {selectedEpisodeIndex !== null && episodes[selectedEpisodeIndex] && episodes[selectedEpisodeIndex].type === "book" && (
        <ReadingDeskModal
          episode={episodes[selectedEpisodeIndex]}
          onClose={() => setSelectedEpisodeIndex(null)}
        />
      )}

      {/* Forensic Category Dossier Modal */}
      {selectedEpisodeIndex !== null && episodes[selectedEpisodeIndex] && episodes[selectedEpisodeIndex].type === "forensic" && (
        <ForensicDossierModal
          episode={episodes[selectedEpisodeIndex] as any}
          onClose={() => setSelectedEpisodeIndex(null)}
        />
      )}

    </div>
  );
}
