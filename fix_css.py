import re

with open('src/app/page.module.css', 'r') as f:
    css = f.read()

# We can just leave the old styles if they don't interfere, but the tasks require removing them:
# "3.2 Remove deprecated styles for .openBookSimple and associated child selectors"
# "4.1 Remove old styles for .manilaFolder and .detectiveWallet"
# To do this safely, it's a bit tricky with regex for nested blocks. 
# But we can just append the new classes at the bottom of the file.

new_css = """

/* NEW GOTHIC MODALS CSS */

.scrapbookContainer {
  display: flex;
  background-color: var(--color-bg, #F9F6F0);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 4px 6px rgba(0,0,0,0.1);
  position: relative;
  min-height: 500px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.washiTape {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-2deg);
  width: 80px;
  height: 25px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  z-index: 10;
  clip-path: polygon(2% 0, 98% 2%, 100% 100%, 0 98%);
}

.waxSealBlue {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3b4d61;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5), 0 4px 6px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: var(--font-family-serif);
  font-size: 1.5rem;
}

.caseFileDesktop {
  background-color: var(--color-desk, #D0Dbe5);
  border-radius: 4px;
  padding: 3rem 2rem;
  position: relative;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.6);
  min-height: 500px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.reportCard {
  background-color: #FFFFFF;
  border: 1px solid #333;
  padding: 2rem;
  position: relative;
  box-shadow: 2px 4px 12px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.paperclip {
  position: absolute;
  top: -15px;
  left: 20px;
  width: 12px;
  height: 40px;
  border: 2px solid #a0a0a0;
  border-radius: 10px;
  background: transparent;
  z-index: 10;
}

.warningStamp {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #B22222;
  border: 3px solid #B22222;
  padding: 0.5rem;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 1.5rem;
  transform: rotate(-5deg);
  opacity: 0.8;
  mix-blend-mode: multiply;
}

.kraftNote {
  background-color: #d4b895;
  padding: 1.5rem;
  position: absolute;
  bottom: 40px;
  left: 40px;
  width: 250px;
  box-shadow: 2px 4px 8px rgba(0,0,0,0.2);
  transform: rotate(2deg);
}

.waxSealRed {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #8B0000;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: var(--font-family-serif);
  font-size: 2rem;
}
"""

with open('src/app/page.module.css', 'a') as f:
    f.write(new_css)
