type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function SearchIcon({ size = 20, color = "currentColor", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.8-3.8" />
    </svg>
  );
}

export function MicIcon({ size = 20, color = "currentColor", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5v4M9 21.5h6" />
    </svg>
  );
}

export function LocationPinIcon({ size = 18, color = "currentColor", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.1-7-11.2A7 7 0 0 1 19 9.8C19 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}

export function MailIcon({ size = 20, color = "currentColor", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5.5" width="18" height="13" rx="2.4" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </svg>
  );
}

export function CandleIcon({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5c1.4 1.7 2.1 2.9 2.1 3.9a2.1 2.1 0 1 1-4.2 0c0-1 .7-2.2 2.1-3.9z" />
      <rect x="9.3" y="9" width="5.4" height="12.5" rx="1.4" />
      <path d="M9.3 13.5h5.4" />
    </svg>
  );
}

export function HomeIcon({ size = 24, color = "currentColor", filled = false }: IconProps & { filled?: boolean }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2.6 2.6 10.8v9.6a1 1 0 0 0 1 1h5.4v-6.6h6v6.6h5.4a1 1 0 0 0 1-1v-9.6L12 2.6z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 10.8 12 3.3l8.5 7.5" />
      <path d="M5.5 9.5v9.7a1 1 0 0 0 1 1h3.9v-6.4h3.2v6.4h3.9a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

export function CalendarIcon({ size = 24, color = "currentColor", filled = false }: IconProps & { filled?: boolean }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <rect x="3.2" y="4.5" width="17.6" height="16" rx="2.4" />
        <rect x="6" y="12" width="3" height="3" fill="var(--bg-app)" />
        <rect x="10.5" y="12" width="3" height="3" fill="var(--bg-app)" />
        <rect x="15" y="12" width="3" height="3" fill="var(--bg-app)" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.2" y="4.8" width="17.6" height="16" rx="2.4" />
      <path d="M3.2 9.6h17.6M8 3v3.6M16 3v3.6" />
    </svg>
  );
}

export function CrossIcon({ size = 24, color = "currentColor", filled = false }: IconProps & { filled?: boolean }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M10.6 2.5h2.8v6.1h6.1v2.8h-6.1v10.1h-2.8V11.4H4.5V8.6h6.1V2.5z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M7 8h10M9 8V5.4M15 8V5.4" />
    </svg>
  );
}

export function ClockIcon({ size = 24, color = "currentColor", filled = false }: IconProps & { filled?: boolean }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <circle cx="12" cy="12.5" r="9" />
        <path d="M12 7v5.5l3.8 2.2" stroke="#000" strokeWidth={1.6} strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12.5" r="9" />
      <path d="M12 7.3v5.4l3.6 2.1" />
    </svg>
  );
}

export function MenuIcon({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round">
      <path d="M4 7h16M4 12.5h16M4 18h16" />
    </svg>
  );
}
