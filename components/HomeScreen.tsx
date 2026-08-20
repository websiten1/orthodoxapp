"use client";

import { useState } from "react";
import styles from "./HomeScreen.module.css";
import {
  SearchIcon,
  MicIcon,
  LocationPinIcon,
  MailIcon,
  CandleIcon,
  HomeIcon,
  CalendarIcon,
  CrossIcon,
  ClockIcon,
  MenuIcon,
} from "./icons";

type HomeScreenProps = {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  ctaLabel?: string;
  avatarInitials?: string;
  locationLabel?: string;
  heroDotCount?: number;
  heroActiveDot?: number;
};

type TabId = "home" | "calendar" | "prayers" | "schedule" | "more";

const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "Acasă" },
  { id: "calendar", label: "Calendar" },
  { id: "prayers", label: "Rugăciuni" },
  { id: "schedule", label: "Program" },
  { id: "more", label: "Mai mult" },
];

const TODAY_CARDS = [
  { title: "Sfânta Liturghie", subtext: "1 slujbă", detail: "Utrenie și Sfânta Liturghie" },
  { title: "Vecernia", subtext: "1 slujbă", detail: "Vecernia de sâmbătă seara" },
];

const RECENT_CARDS = [
  { title: "Parohia Sf. Gheorghe" },
  { title: "Parohia Sf. Nicolae" },
];

export default function HomeScreen({
  heroImage = "/hero-ravenna.jpg",
  heroTitle = "Bine ați venit",
  heroSubtitle = "Parohia Sfânta Maria",
  ctaLabel = "AFLĂ MAI MULT",
  avatarInitials = "AR",
  locationLabel = "COLLEYVILLE",
  heroDotCount = 6,
  heroActiveDot = 1,
}: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  return (
    <div className={styles.screen}>
      {/* ZONE 1 — Hero */}
      <div className={styles.hero}>
        {heroImage ? (
          <img className={styles.heroImg} src={heroImage} alt="" />
        ) : (
          <div className={styles.heroPlaceholder}>HERO IMAGE</div>
        )}
        <div className={styles.heroOverlay} />

        <div className={styles.heroHeader}>
          <div className={styles.heroHeaderLeft}>
            <div className={styles.avatar} aria-label="Profil">
              {avatarInitials}
            </div>
            <div className={styles.locationPill}>
              <LocationPinIcon size={18} color="#ffffff" />
              <span className={styles.pillText}>{locationLabel}</span>
            </div>
          </div>
          <button className={styles.mailButton} aria-label="Mesaje">
            <MailIcon size={20} color="#ffffff" />
            <span className={styles.notifDot} />
          </button>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{heroTitle}</h1>
          <p className={styles.heroSubtitle}>{heroSubtitle}</p>
          <button className={styles.ctaButton}>
            <span className={styles.pillText}>{ctaLabel}</span>
          </button>
          <div className={styles.dots}>
            {Array.from({ length: heroDotCount }).map((_, i) => (
              <span key={i} className={i === heroActiveDot ? styles.dotActive : styles.dot} />
            ))}
          </div>
        </div>
      </div>

      {/* ZONE 2 — Search */}
      <div className={styles.searchRow}>
        <div className={styles.searchField}>
          <button aria-label="Caută">
            <SearchIcon size={20} color="var(--text-secondary)" />
            <span className={styles.searchPlaceholder}>Caută...</span>
          </button>
        </div>
        <button className={styles.micButton} aria-label="Căutare vocală">
          <MicIcon size={20} color="var(--text-secondary)" />
        </button>
      </div>

      {/* ZONE 3 — Astăzi */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Astăzi</h2>
        <div className={styles.carousel}>
          {TODAY_CARDS.map((c) => (
            <div className={styles.cardToday} key={c.title}>
              <div className={styles.cardTitle}>{c.title}</div>
              <div className={styles.cardSubtext}>{c.subtext}</div>
              <div className={styles.cardIconRow}>
                <div className={styles.iconSquare}>
                  <CandleIcon size={24} color="var(--accent-contrast)" />
                </div>
                <div className={styles.iconRowText}>{c.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ZONE 4 — Vizitate recent */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Vizitate recent</h2>
        <div className={styles.carousel}>
          {RECENT_CARDS.map((c) => (
            <div className={styles.cardVisited} key={c.title}>
              <div className={styles.visitedThumb} />
              <div className={styles.visitedTitle}>{c.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tabBarSpacer} />

      {/* ZONE 5 — Tab bar */}
      <nav className={styles.tabBar}>
        {TABS.map((tab) => {
          const active = tab.id === activeTab;
          const color = active ? "var(--text-primary)" : "var(--text-secondary)";
          return (
            <button
              key={tab.id}
              className={active ? `${styles.tabItem} ${styles.tabItemActive}` : styles.tabItem}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.id === "home" && <HomeIcon size={24} color={color} filled={active} />}
              {tab.id === "calendar" && <CalendarIcon size={24} color={color} filled={active} />}
              {tab.id === "prayers" && <CrossIcon size={24} color={color} filled={active} />}
              {tab.id === "schedule" && <ClockIcon size={24} color={color} filled={active} />}
              {tab.id === "more" && <MenuIcon size={24} color={color} />}
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
