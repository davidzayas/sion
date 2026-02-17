interface LutherRoseProps {
  className?: string;
  size?: number;
}

export default function LutherRose({ className = "", size = 64 }: LutherRoseProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sello Luterano - Rosa de Lutero"
    >
      {/* Gold outer ring */}
      <circle cx="100" cy="100" r="98" fill="#D4A017" />
      <circle cx="100" cy="100" r="90" fill="#C5961A" stroke="#B8860B" strokeWidth="1" />

      {/* Blue background */}
      <circle cx="100" cy="100" r="82" fill="#1E3A5F" />

      {/* White rose petals */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 100 100)`}>
          <ellipse
            cx="100"
            cy="45"
            rx="28"
            ry="38"
            fill="white"
            stroke="#E8E8E8"
            strokeWidth="0.5"
          />
        </g>
      ))}

      {/* Inner white circle connecting petals */}
      <circle cx="100" cy="100" r="32" fill="white" />

      {/* Red heart */}
      <path
        d="M100 130 C100 130 70 105 70 85 C70 72 80 65 90 65 C95 65 100 70 100 70 C100 70 105 65 110 65 C120 65 130 72 130 85 C130 105 100 130 100 130Z"
        fill="#C41E3A"
        stroke="#A01830"
        strokeWidth="0.5"
      />

      {/* Black cross */}
      <rect x="94" y="62" width="12" height="60" rx="1" fill="#1A1A1A" />
      <rect x="80" y="74" width="40" height="12" rx="1" fill="#1A1A1A" />

      {/* Gold ring highlight */}
      <circle
        cx="100"
        cy="100"
        r="94"
        fill="none"
        stroke="#E8C84A"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  );
}
