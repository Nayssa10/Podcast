import re

def write_files():
    # 1. Write page.tsx
    page_tsx = """\"use client\";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AudioPlayer from "@/components/AudioPlayer";
import ContactForm from "@/components/ContactForm";
import styles from "./page.module.css";

const MOCK_EPISODES = [
  {
    number: "EP 01",
    date: "05 de Agosto, 2026",
    title: "Episodio 1: Sombras en la Biblioteca",
    type: "forensic",
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
    sliderIcons: ['📚', '🔍', '🎙️'],
    stats: [
      { label: 'Literatura', value: '10/10', icon: '📖' },
      { label: 'Criminología', value: '9/10', icon: '🔍' },
      { label: 'Investigación', value: '9/10', icon: '🧠' }
    ]
  }
};

export default function Home() {
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeHost] = useState<'nayssa'>('nayssa');

  const renderHighlightedSnippet = (text: string, highlights: string[] = []) => {
    if (!highlights.length) return text;
    const regex = new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')).join('|')})`, 'g');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      highlights.includes(part) ? <mark key={i} className={styles.gothicHighlight}>{part}</mark> : part
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEpisodeIndex(null);
        setShowContactForm(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.mainDashboardContainer}>
      {/* Top Header Row */}
      <header className={styles.dashboardHeader}>
        <div className={styles.searchBarMockup}>
          {HOST_DATA[activeHost].searchQuery}
        </div>
        <nav className={styles.dashboardNavButtons}>
          <button className={styles.navPillBtn}>Inicio</button>
          <button className={styles.navPillBtn}>Nosotros</button>
          <button className={styles.navPillBtn} onClick={() => setShowContactForm(true)}>Escríbenos</button>
        </nav>
      </header>

      {/* Main Grid Content */}
      <main className={styles.kotomiDashboard}>
        {/* Left Column */}
        <div className={styles.dashboardLeft}>
          
          <div className={styles.domeBanner}>
            <Image
              src="/logo-banner-transparent.png"
              alt="team supernova Logo"
              width={250}
              height={80}
              className={styles.bannerImage}
            />
            <h1 className={styles.bannerSubtitle}>investigación & literatura</h1>
          </div>

          <div className={styles.taglineCapsule}>
            <span className={styles.taglineText}>Nuevo Episodio Disponible</span>
            <button className={styles.playLatestBtn} onClick={() => setSelectedEpisodeIndex(0)}>
              ▶
            </button>
          </div>

          <div className={styles.episodesPillList}>
            {MOCK_EPISODES.map((ep, i) => (
              <div key={i} className={styles.episodeRowBtn} onClick={() => setSelectedEpisodeIndex(i)}>
                <span className={styles.epRowNumber}>{ep.number}</span>
                <span className={styles.epRowTitle}>{ep.title}</span>
                <span className={styles.epRowDuration}>{ep.duration}</span>
              </div>
            ))}
          </div>

          <div className={styles.dashboardExtraInfo}>
            <p>{HOST_DATA[activeHost].extraInfoText}</p>
            <button className={styles.leerMasBtn}>Leer más</button>
          </div>

        </div>

        {/* Right Column */}
        <div className={styles.dashboardRight}>
          
          <div className={styles.dashboardBasicInfo}>
            <h3 className={styles.basicInfoTitle}>INFORMACIÓN BÁSICA</h3>
            <p>{HOST_DATA[activeHost].basicInfo}</p>
          </div>

          <div className={styles.dashboardSlider}>
            {MOCK_EPISODES.map((ep, i) => (
              <div key={i} className={styles.cardSliderItem} onClick={() => setSelectedEpisodeIndex(i)}>
                <div className={styles.sliderIcon}>{ep.bookDetails.coverIcon}</div>
                <div className={styles.sliderEpName}>CASO {ep.number.replace('EP ', '')}</div>
              </div>
            ))}
          </div>

          <div className={styles.dashboardStatsPills}>
            {HOST_DATA[activeHost].stats.map((stat, i) => (
              <div key={i} className={styles.statPill}>
                <span className={styles.statIcon}>{stat.icon}</span>
                <span className={styles.statLabel}>{stat.label}:</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
            ))}
          </div>

          <div className={styles.hostProfileCard}>
            <div className={styles.watermarkContainer}>
              <Image src="/logo.png" alt="Watermark" className={styles.watermarkLogo} width={150} height={150} />
            </div>
            <div className={styles.profileCardContent}>
              <div className={styles.profileAvatar}>
                <span className={styles.avatarIcon}>🎙️</span>
              </div>
              <div className={styles.profileTextInfo}>
                <h3 className={styles.profileName}>{HOST_DATA[activeHost].name}</h3>
                <span className={styles.profileRole}>{HOST_DATA[activeHost].subtitle}</span>
                <p className={styles.profileBioQuote}>&quot;Desentrañando el misterio de la página a la escena del crimen.&quot;</p>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      {/* Modals Overlay */}
      {(selectedEpisodeIndex !== null || showContactForm) && (
        <div className={styles.modalOverlay} onClick={() => {
          setSelectedEpisodeIndex(null);
          setShowContactForm(false);
        }}>
          <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
            
            {/* Contact Form Modal */}
            {showContactForm && (
              <article className={styles.guestCheckModal}>
                <button className={styles.closeModalBtn} onClick={() => setShowContactForm(false)} aria-label="Cerrar modal">✕</button>
                <div className={styles.guestCheckPaper}>
                  <div className={styles.receiptHeader}>
                    <h2 className={styles.receiptTitle}>Guest Check</h2>
                    <div className={styles.receiptMeta}>
                      <span>Table: Contacto</span>
                      <span>Guests: 1</span>
                    </div>
                  </div>
                  <div className={styles.formContainer}>
                    <ContactForm />
                  </div>
                  <div className={styles.scatteredPetals}>
                    <span className={styles.petal1}>🥀</span>
                    <span className={styles.petal2}>🥀</span>
                    <span className={styles.petal3}>🥀</span>
                  </div>
                </div>
              </article>
            )}

            {/* Episode Details Modal */}
            {selectedEpisodeIndex !== null && !showContactForm && (() => {
              const selectedEpisode = MOCK_EPISODES[selectedEpisodeIndex];
              const isBook = selectedEpisode.type === "book";

              if (isBook) {
                const coverClass = selectedEpisode.number === "EP 02" ? styles.greenBook : styles.burgundyBook;
                return (
                  <article className={styles.guestCheckModal}>
                    <button className={styles.closeModalBtn} onClick={() => setSelectedEpisodeIndex(null)} aria-label="Cerrar modal">✕</button>
                    
                    <div className={styles.guestCheckLeft}>
                      <div className={styles.guestCheckPolaroid}>
                        <div className={styles.washiTape}></div>
                        <div className={`${styles.polaroidImageMockup} ${coverClass}`}>
                          <span className={styles.simpleBookIcon}>{selectedEpisode.bookDetails.coverIcon}</span>
                        </div>
                        <div className={styles.polaroidCaptionText}>{selectedEpisode.bookDetails.title}</div>
                      </div>
                    </div>
                    
                    <div className={styles.guestCheckPaper}>
                      <div className={styles.guestCheckNotepadSpirals}>
                        {[...Array(8)].map((_, i) => <div key={i} className={styles.notepadRing}></div>)}
                      </div>
                      <div className={styles.receiptHeader}>
                        <h2 className={styles.receiptTitle}>Guest Check</h2>
                        <div className={styles.receiptMeta}>
                          <span>Table: {selectedEpisode.number.replace('EP ', '')}</span>
                          <span>Guests: 2</span>
                        </div>
                      </div>
                      
                      <div className={styles.tropesSection}>
                        <h3>WHAT TO EXPECT WHEN READING</h3>
                        <ul className={styles.tropesList}>
                          <li>☑ Romance Gótico</li>
                          <li>☑ Misterio y Suspenso</li>
                          <li>☑ Tensión Narrativa</li>
                        </ul>
                      </div>

                      <div className={styles.gothicSnippetContainer}>
                        <p>{renderHighlightedSnippet(selectedEpisode.snippet?.text || "", selectedEpisode.snippet?.highlights)}</p>
                        {selectedEpisode.annotations?.map((ann, idx) => (
                          <div key={idx} className={styles.marginAnnotation} style={{ top: ann.position }}>
                            {ann.text}
                          </div>
                        ))}
                      </div>
                      
                      <div className={styles.scatteredPetals}>
                        <span className={styles.petal1}>🥀</span>
                        <span className={styles.petal2}>🥀</span>
                        <span className={styles.petal3}>🥀</span>
                      </div>
                      
                      <div className={styles.waxSealBlue}>
                        <span className={styles.sealIcon}>B</span>
                      </div>
                    </div>
                  </article>
                );
              }

              return (
                <article className={styles.dossierFolderModal}>
                  <button className={styles.closeModalBtn} onClick={() => setSelectedEpisodeIndex(null)} aria-label="Cerrar modal" style={{ color: '#000' }}>✕</button>
                  
                  <div className={styles.dossierSidebar}>
                    <div className={styles.mugshotCard}>
                      <div className={styles.paperclip}></div>
                      <div className={styles.mugshotBox}>SUBJECT PHOTO</div>
                    </div>
                    <table className={styles.dossierTable}>
                      <tbody>
                        <tr><th>HEIGHT</th><td>5'10"</td></tr>
                        <tr><th>WEIGHT</th><td>160 lbs</td></tr>
                        <tr><th>EYES</th><td>Brown</td></tr>
                      </tbody>
                    </table>
                    <div className={styles.dossierFingerprint}>
                      <div className={styles.fingerprintIcon}>🖣</div>
                    </div>
                  </div>

                  <div className={styles.dossierMainSheet}>
                    <h2 className={styles.dossierTitle}>MAFIA FILES / CASO {selectedEpisode.number}</h2>
                    <div className={styles.stampsContainer}>
                      <div className={styles.warningStampClassified}>CLASSIFIED</div>
                      <div className={styles.warningStampConfidencial}>CONFIDENCIAL</div>
                    </div>
                    
                    <p className={styles.investigationDetails}>{selectedEpisode.forensicDetails.criminologyDetails}</p>
                    
                    <div className={styles.evidenceSection}>
                      <h3>KEY PHYSICAL EVIDENCE</h3>
                      <ul className={styles.evidenceList}>
                        {selectedEpisode.forensicDetails.keyPhysicalEvidence.map((item, eIdx) => (
                          <li key={eIdx}>[✓] {item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={styles.focusSection}>
                      <h3>FORENSIC FOCUS</h3>
                      <p>{selectedEpisode.forensicDetails.forensicFocus}</p>
                    </div>

                    <div className={styles.modalKraftNote}>
                      <div className={styles.paperclip} style={{ top: '-10px', left: '15px', transform: 'rotate(-10deg)' }}></div>
                      <div className={styles.washiTape} style={{ top: '-5px', right: '5px', transform: 'rotate(15deg)' }}></div>
                      <p className={styles.marginAnnotationNote}>Revisar coartada...</p>
                    </div>

                    <div className={styles.waxSealRed}>
                      <span className={styles.sealIcon}>R</span>
                    </div>
                  </div>
                </article>
              );
            })()}

          </div>
        </div>
      )}

    </div>
  );
}
"""
    with open('src/app/page.tsx', 'w') as f:
        f.write(page_tsx)

if __name__ == "__main__":
    write_files()
