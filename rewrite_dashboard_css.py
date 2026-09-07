css_content = """
.mainDashboardContainer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-bg);
  padding: 1rem 2rem;
}

/* Dashboard Header */
.dashboardHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 2rem 0;
}

.searchBarMockup {
  background-color: #faf7f0;
  border: 1px solid rgba(194, 141, 93, 0.3);
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-family-monospace);
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.8;
  width: 300px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
}

.dashboardNavButtons {
  display: flex;
  gap: 1rem;
}

.navPillBtn {
  background-color: transparent;
  border: 1px solid var(--color-accent-2);
  color: var(--color-text);
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  font-family: var(--font-family-sans);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.navPillBtn:hover {
  background-color: var(--color-accent-1);
  color: var(--color-bg);
  border-color: var(--color-accent-1);
}

/* Kotomi Dashboard Grid */
.kotomiDashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  flex: 1;
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}

@media (max-width: 900px) {
  .kotomiDashboard {
    grid-template-columns: 1fr;
  }
}

/* Left Column */
.dashboardLeft {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.domeBanner {
  background-color: var(--color-accent-1);
  border-radius: 8px 8px 60px 8px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.bannerImage {
  filter: brightness(0) invert(1);
  margin-bottom: 0.5rem;
}

.bannerSubtitle {
  font-family: var(--font-family-script);
  font-size: 2rem;
  color: var(--color-bg);
  opacity: 0.9;
  margin: 0;
}

.taglineCapsule {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(194, 141, 93, 0.1);
  border-radius: 50px;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  border: 1px solid rgba(194, 141, 93, 0.3);
}

.taglineText {
  font-family: var(--font-family-sans);
  font-size: 0.9rem;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.playLatestBtn {
  background-color: var(--color-accent-2);
  color: var(--color-bg);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.playLatestBtn:hover {
  transform: scale(1.1);
}

.episodesPillList {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.episodeRowBtn {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #faf7f0;
  border: 1px solid rgba(194, 141, 93, 0.2);
  border-radius: 8px;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.episodeRowBtn:hover {
  background-color: white;
  border-color: var(--color-accent-1);
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.epRowNumber {
  font-family: var(--font-family-monospace);
  font-weight: 700;
  color: var(--color-accent-1);
}

.epRowTitle {
  font-family: var(--font-family-serif);
  flex: 1;
  color: var(--color-text);
}

.epRowDuration {
  font-family: var(--font-family-monospace);
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.6;
}

.dashboardExtraInfo {
  background-color: #faf7f0;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--color-accent-2);
}

.dashboardExtraInfo p {
  font-family: var(--font-family-sans);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.leerMasBtn {
  background: none;
  border: none;
  color: var(--color-accent-1);
  font-family: var(--font-family-sans);
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 0;
}

/* Right Column */
.dashboardRight {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dashboardBasicInfo {
  background-color: transparent;
  padding: 1rem 0;
}

.basicInfoTitle {
  font-family: var(--font-family-monospace);
  font-size: 0.85rem;
  color: var(--color-accent-2);
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}

.dashboardBasicInfo p {
  font-family: var(--font-family-serif);
  font-size: 1.1rem;
  line-height: 1.6;
}

.dashboardSlider {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.cardSliderItem {
  background-color: #faf7f0;
  border: 1px solid rgba(194, 141, 93, 0.2);
  border-radius: 8px;
  min-width: 120px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.cardSliderItem:hover {
  transform: translateY(-5px);
  border-color: var(--color-accent-1);
}

.sliderIcon {
  font-size: 2.5rem;
}

.sliderEpName {
  font-family: var(--font-family-monospace);
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--color-accent-1);
}

.dashboardStatsPills {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.statPill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(194, 141, 93, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-family: var(--font-family-sans);
  font-size: 0.85rem;
}

.statLabel {
  font-weight: 600;
  color: var(--color-text);
}

.statValue {
  color: var(--color-accent-1);
  font-weight: bold;
}

.hostProfileCard {
  background-color: #faf7f0;
  border-radius: 8px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(194, 141, 93, 0.2);
  flex: 1;
  display: flex;
  align-items: center;
}

.watermarkContainer {
  position: absolute;
  right: -20px;
  bottom: -20px;
  opacity: 0.05;
  pointer-events: none;
}

.profileCardContent {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.profileAvatar {
  width: 80px;
  height: 80px;
  background-color: var(--color-accent-1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  flex-shrink: 0;
}

.profileName {
  font-family: var(--font-family-serif);
  font-size: 1.5rem;
  color: var(--color-accent-1);
  margin-bottom: 0.25rem;
}

.profileRole {
  font-family: var(--font-family-monospace);
  font-size: 0.8rem;
  color: var(--color-accent-2);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 0.75rem;
}

.profileBioQuote {
  font-family: var(--font-family-script);
  font-size: 1.2rem;
  color: var(--color-text);
  line-height: 1.4;
  margin: 0;
}

/* Modals Container */
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: rgba(46, 30, 28, 0.75);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  padding: 2rem 1rem;
}

.modalWrapper {
  position: relative;
  width: 100%;
  max-width: 750px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.closeModalBtn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 20;
  color: var(--color-accent-1);
}

/* Guest Check Modal */
.guestCheckModal {
  display: flex;
  gap: 2rem;
  position: relative;
}

@media (max-width: 768px) {
  .guestCheckModal {
    flex-direction: column;
  }
}

.guestCheckLeft {
  flex: 0 0 250px;
}

.guestCheckPolaroid {
  background: #fff;
  padding: 10px 10px 30px 10px;
  box-shadow: 2px 4px 15px rgba(0,0,0,0.2);
  transform: rotate(-3deg);
  position: relative;
}

.washiTape {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(2deg);
  width: 80px;
  height: 25px;
  background-color: rgba(230, 200, 200, 0.7);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  z-index: 5;
}

.polaroidImageMockup {
  height: 200px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

.burgundyBook { background-color: #5c2020; }
.greenBook { background-color: #205c3b; }

.simpleBookIcon {
  font-size: 4rem;
}

.polaroidCaptionText {
  font-family: var(--font-family-script);
  font-size: 1.5rem;
  text-align: center;
  margin-top: 10px;
  color: #333;
}

.guestCheckPaper {
  flex: 1;
  background-color: #ffeff4;
  background-image: linear-gradient(rgba(200, 150, 150, 0.2) 1px, transparent 1px);
  background-size: 100% 2rem;
  border: 1px solid #e8caca;
  padding: 3rem 2rem 2rem 2rem;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  border-radius: 2px;
}

.guestCheckNotepadSpirals {
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
}

.notepadRing {
  width: 15px;
  height: 25px;
  background: linear-gradient(to right, #ccc, #fff, #ccc);
  border: 1px solid #999;
  border-radius: 10px;
}

.receiptHeader {
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px dashed #e8caca;
  padding-bottom: 1rem;
}

.receiptTitle {
  font-family: var(--font-family-serif);
  color: #a05a5a;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}

.receiptMeta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-family-monospace);
  font-size: 0.8rem;
  color: #8c6a6a;
}

.tropesSection h3 {
  font-family: var(--font-family-monospace);
  font-size: 0.9rem;
  color: #a05a5a;
  margin-bottom: 1rem;
}

.tropesList {
  list-style: none;
  padding: 0;
  font-family: var(--font-family-sans);
  color: #553535;
  margin-bottom: 2rem;
}

.tropesList li {
  margin-bottom: 0.5rem;
}

.gothicSnippetContainer {
  font-family: Georgia, serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a3030;
  font-style: italic;
  position: relative;
  margin-bottom: 2rem;
}

.gothicHighlight {
  background-color: rgba(160, 90, 90, 0.2);
  color: #5c2020;
  padding: 0 4px;
}

.marginAnnotation {
  position: absolute;
  right: -80px;
  width: 100px;
  font-family: var(--font-family-script);
  font-size: 1.2rem;
  color: #cc4444;
  transform: rotate(-5deg);
}

.marginAnnotationNote {
  font-family: var(--font-family-script);
  font-size: 1.2rem;
  color: #333;
}

.scatteredPetals {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 2rem;
  opacity: 0.7;
}

.petal1 { position: absolute; right: 0; bottom: 0; transform: rotate(15deg); }
.petal2 { position: absolute; right: 30px; bottom: 10px; transform: rotate(-20deg); }
.petal3 { position: absolute; right: 15px; bottom: 30px; transform: rotate(45deg); }

.waxSealBlue {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  background-color: #203a5c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5), 0 2px 5px rgba(0,0,0,0.2);
}

.sealIcon {
  font-family: var(--font-family-serif);
  color: #fff;
  font-size: 1.5rem;
  opacity: 0.8;
}

/* Dossier Modal */
.dossierFolderModal {
  background-color: #dfcda7;
  border-radius: 4px;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  position: relative;
}

@media (max-width: 768px) {
  .dossierFolderModal {
    flex-direction: column;
  }
}

.dossierSidebar {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mugshotCard {
  background: #fff;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: relative;
}

.paperclip {
  position: absolute;
  top: -15px;
  left: 20px;
  width: 15px;
  height: 40px;
  border: 2px solid #999;
  border-radius: 10px;
}

.mugshotBox {
  height: 150px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-monospace);
  color: #777;
  font-size: 0.8rem;
  text-align: center;
}

.dossierTable {
  width: 100%;
  font-family: var(--font-family-monospace);
  font-size: 0.8rem;
  border-collapse: collapse;
}

.dossierTable th, .dossierTable td {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.dossierTable th {
  text-align: left;
  color: #555;
}

.dossierFingerprint {
  align-self: center;
  margin-top: auto;
  opacity: 0.6;
}

.fingerprintIcon {
  font-size: 4rem;
  color: #333;
}

.dossierMainSheet {
  flex: 1;
  background-color: #faf7f0;
  padding: 2rem;
  border: 1px solid #dcd4c3;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
  position: relative;
}

.dossierTitle {
  font-family: var(--font-family-monospace);
  font-size: 1.5rem;
  color: #333;
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
}

.stampsContainer {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.warningStampClassified, .warningStampConfidencial {
  border: 3px solid;
  padding: 0.25rem 0.5rem;
  font-family: var(--font-family-monospace);
  font-weight: bold;
  font-size: 1.2rem;
  transform: rotate(-15deg);
}

.warningStampClassified {
  color: #ab4747;
  border-color: #ab4747;
}

.warningStampConfidencial {
  color: #47ab59;
  border-color: #47ab59;
  transform: rotate(5deg);
}

.investigationDetails {
  font-family: var(--font-family-sans);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.evidenceSection h3, .focusSection h3 {
  font-family: var(--font-family-monospace);
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
}

.evidenceList {
  list-style: none;
  padding: 0;
  font-family: var(--font-family-monospace);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.evidenceList li {
  margin-bottom: 0.5rem;
}

.focusSection p {
  font-family: var(--font-family-sans);
  line-height: 1.5;
}

.modalKraftNote {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #dcb37b;
  padding: 1rem;
  width: 150px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
  transform: rotate(5deg);
}

.waxSealRed {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  background-color: #ab4747;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5), 0 2px 5px rgba(0,0,0,0.2);
}

.formContainer {
  margin-bottom: 2rem;
}
"""
with open('src/app/page.module.css', 'w') as f:
    f.write(css_content)

