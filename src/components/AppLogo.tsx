interface AppLogoProps {
  className?: string;
}

export function AppLogo({ className }: AppLogoProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="play-ui-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="15" height="15" rx="4.5" fill="url(#play-ui-mark)" opacity={0.45} />
      <rect x="9.5" y="9.5" width="15" height="15" rx="4.5" fill="url(#play-ui-mark)" opacity={0.75} />
      <rect x="14.5" y="14.5" width="11.5" height="11.5" rx="3.5" fill="url(#play-ui-mark)" />
    </svg>
  );
}
