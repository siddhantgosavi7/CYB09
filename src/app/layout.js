import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CYB09 — Cybersecurity Awareness Simulator",
  description: "Interactive platform that simulates phishing, password attacks, social engineering and evaluates your cybersecurity awareness. Built for Smart India Hackathon.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GameProvider>
          <div className="app-layout">
            <Navbar />
            <main className="main-content">{children}</main>
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
