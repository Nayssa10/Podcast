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

const HOST_DATA = {
  nayssa: {
    id: 'nayssa',
    name: 'Nayssa Kristel',
    subtitle: 'Creadora & Conductora',
    searchQuery: 'Q buscar en el expediente...',
    roleBadge: 'voz principal, mente analítica, creadora.',
    recentItemsTitle: 'Episodios Recientes',
    recentItems: ['La Sombra de Blackwood', 'Susurros de la Bala', 'El Veneno del Amor'],
    extraInfoText: 'Como única creadora de Team Supernova, Nayssa fusiona el análisis literario profundo con la rigurosidad científica.',
    basicInfo: 'Voz única y creadora de Team Supernova. Especialista en entrelazar la belleza de la literatura gótica con la cruda realidad de la investigación criminal.',
    sliderIcons: ['✦', '◆', '✦'],
    stats: [
      { label: 'Episodios Publicados', value: '3+', icon: '01' },
      { label: 'Análisis Forense & Balística', value: '100%', icon: '02' },
      { label: 'Literatura & Romance Gótico', value: '100%', icon: '03' }
    ]
  }
};

export default function Home() {
  const [episodes, setEpisodes] = useState<EpisodeData[]>(MOCK_EPISODES);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number | null>(null);
  const [showDossierModal, setShowDossierModal] = useState(false);
  const activeHost = 'nayssa';

  useEffect(() => {
    fetch("/api/episodes")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEpisodes(data);
        }
      })
      .catch(() => {});
  }, []);

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
        setShowDossierModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const isModalOpen = selectedEpisodeIndex !== null || showDossierModal;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEpisodeIndex, showDossierModal]);

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
          <h1 className={styles.heroTitle}>Nayssa Kristel</h1>
          <h2 className={styles.heroSubtitle}>investigación & literatura</h2>
          <p className={styles.heroDescription}>
            Un espacio donde la belleza de la literatura gótica y el romance de misterio se encuentran con el análisis riguroso y la ciencia criminal.
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
            <span className={styles.heroTagline}>donde cada historia deja una huella</span>
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

      {/* Edgar Allan Poe Quote Section (Bridge between Hero & Episodes) */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteContainer}>
          <div className={styles.quoteDecorativeStar}>✦ ✦ ✦</div>
          <blockquote className={styles.poeQuote}>
            &ldquo;Deep into that darkness peering, long I stood there wondering, fearing, doubting, dreaming dreams no mortal ever dared to dream before.&rdquo;
          </blockquote>
          <cite className={styles.quoteAuthor}>&mdash; Edgar Allan Poe</cite>
        </div>
      </section>

      {/* Episode Grid Section */}
      <section id="episodes" className={styles.episodesSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionDivider}>
            <span className={styles.dividerLine}></span>
            <span className={styles.dividerStar}>✦</span>
            <span className={styles.dividerLine}></span>
          </div>
          <span className={styles.sectionOverline}>ARCHIVOS & EXPEDIENTES</span>
          <h2 className={styles.sectionTitle}>Episodios Recientes</h2>
          <p className={styles.sectionSubtitle}>
            Casos forenses y análisis de novelas góticas disponibles para escuchar.
          </p>
        </div>

        <ScrollEpisodeNavigator
          episodes={episodes}
          onSelectEpisode={(i) => setSelectedEpisodeIndex(i)}
        />
      </section>

      {/* About Section - Carta Epistolar / Manuscrito Vintage */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.epistolarySectionHeader}>
          <div className={styles.epistolaryDivider}>
            <span className={styles.dividerLine}></span>
            <span className={styles.dividerStar}>✦</span>
            <span className={styles.dividerLine}></span>
          </div>
          <span className={styles.epistolaryOverline}>NOTA EDITORIAL • TEAM SUPERNOVA</span>
          <h2 className={styles.epistolarySectionTitle}>Sobre el Podcast &amp; Creadora</h2>
        </div>

        <div className={styles.manuscriptSheet}>
          {/* Top Sheet Header: Archival info + Postage Stamp */}
          <div className={styles.sheetHeader}>
            <div className={styles.sheetMeta}>
              <span className={styles.sheetLocation}>ARCHIVO Nº 01 — TEAM SUPERNOVA</span>
              <span className={styles.sheetDate}>Expediente Oficial • 2026</span>
            </div>

            <div className={styles.vintageStamp}>
              <div className={styles.stampInner}>
                <Image
                  src="/logo-clean.png"
                  alt="Sello Postal Team Supernova"
                  width={34}
                  height={34}
                  className={styles.stampLogo}
                  unoptimized
                />
                <span className={styles.stampText}>SUPERNOVA</span>
                <span className={styles.stampValue}>01✦</span>
              </div>
              <div className={styles.stampCancelPostmark}>
                <span>★ ARCHIVE ★</span>
              </div>
            </div>
          </div>

          {/* Letter Body */}
          <div className={styles.sheetBody}>
            <h3 className={styles.letterSalutation}>Estimado oyente y lector de las sombras:</h3>

            <p className={styles.letterParagraph}>
              <span className={styles.dropCap}>V</span>oz única y creadora de Team Supernova. Especialista en entrelazar la belleza de la literatura gótica con la cruda realidad de la investigación criminal.
            </p>

            <p className={styles.letterParagraph}>
              {HOST_DATA[activeHost].extraInfoText} Cada emisión es un expediente abierto donde las autopsias literarias dialogan con el rigor de la balística y la toxicología forense.
            </p>

            <blockquote className={styles.letterMotto}>
              &ldquo;Desentrañando el misterio de la página a la escena del crimen.&rdquo;
            </blockquote>
          </div>

          {/* Bottom Sheet Footer: Signature & Wax Seal Button */}
          <div className={styles.sheetFooter}>
            <div className={styles.signatureBlock}>
              <span className={styles.signatureAttribution}>Atentamente,</span>
              <span className={styles.cursiveSignature}>Nayssa Kristel</span>
              <span className={styles.signatureRole}>Creadora &amp; Conductora</span>
            </div>

            <div className={styles.sealActionWrapper}>
              <button className={styles.waxSealBtn} onClick={() => setShowDossierModal(true)}>
                <span className={styles.waxSealIcon}>✦</span>
                <span className={styles.waxSealLabel}>Ver Dossier de Creadora</span>
                <span className={styles.waxSealArrow}>➔</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <footer id="contact" className={styles.footerSection}>
        <div className={styles.contactWrapper}>
          <ContactForm />
        </div>
        <div className={styles.footerBottomBar}>
          <div className={styles.footerBrandGroup}>
            <span className={styles.footerBrand}>team SUPERNOVA</span>
            <span className={styles.footerBrandSubtitle}>investigación &amp; literatura</span>
          </div>
          <div className={styles.footerLinks}>
            <a href="#" onClick={scrollToTop} className={styles.footerLink}>Inicio</a>
            <a href="#about" className={styles.footerLink}>Sobre mí</a>
            <a href="#episodes" className={styles.footerLink}>Episodios</a>
            <a href="#contact" className={styles.footerLink}>Contacto</a>
            <a href="/admin" className={styles.footerLink} style={{ opacity: 0.5 }}>Gestión</a>
          </div>
          <p className={styles.footerCopyright}>&copy; 2026 team SUPERNOVA. Todos los derechos reservados.</p>
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

      {/* Host Dossier Modal Overlay */}
      {showDossierModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDossierModal(false)}>
          <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
            <article className={styles.minimalModalCard}>
              <button className={styles.closeModalBtn} onClick={() => setShowDossierModal(false)} aria-label="Cerrar modal">✕</button>
              <div className={styles.modalHeader}>
                <span className={styles.modalBadge}>Dossier de Creadora</span>
                <h2 className={styles.modalTitle}>{HOST_DATA[activeHost].name}</h2>
                <p className={styles.modalSubtitle}>{HOST_DATA[activeHost].subtitle}</p>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.modalSection}>
                  <h3>Perfil</h3>
                  <p>{HOST_DATA[activeHost].basicInfo}</p>
                </div>
                <div className={styles.modalSection}>
                  <h3>Detalles y Rol</h3>
                  <p>{HOST_DATA[activeHost].roleBadge}</p>
                  <p style={{ marginTop: '0.5rem' }}>{HOST_DATA[activeHost].extraInfoText}</p>
                </div>
                <div className={styles.modalSection}>
                  <h3>Enfoque de Investigación</h3>
                  <p>&quot;Desentrañando el misterio de la página a la escena del crimen.&quot;</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}

    </div>
  );
}
