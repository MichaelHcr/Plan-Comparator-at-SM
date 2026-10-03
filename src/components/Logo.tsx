import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: "full" | "icon";
  className?: string;
  isDark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  className = "h-12 w-auto",
  isDark = false,
  ...props
}) => {
  const textColor = isDark ? "#ffffff" : "#8d1b22";
  const lightTextColor = isDark ? "#fca5a5" : "#a82025";

  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 110 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <defs>
          {/* Main primary red gradient for lighter petal half */}
          <linearGradient id="smRedLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef3340" />
            <stop offset="50%" stopColor="#d91d2a" />
            <stop offset="100%" stopColor="#b3141f" />
          </linearGradient>

          {/* Darker red gradient for 3D folded petal half */}
          <linearGradient id="smRedDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c8101e" />
            <stop offset="60%" stopColor="#990b16" />
            <stop offset="100%" stopColor="#73050e" />
          </linearGradient>

          {/* Radial gradient for the 4 spheres/dots */}
          <radialGradient id="smDotGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ff4d5a" />
            <stop offset="50%" stopColor="#d91d2a" />
            <stop offset="100%" stopColor="#800a12" />
          </radialGradient>
        </defs>

        {/* 4-Fold Symmetrical Clover composed of 4 Hearts with 3D Fold and White Dividing Gap */}
        <g transform="translate(55, 55)">
          {/* Heart Petals at 45°, 135°, 225°, 315° */}
          {[45, 135, 225, 315].map((angle) => (
            <g key={angle} transform={`rotate(${angle})`}>
              {/* Left half of heart (Lighter gradient) */}
              <path
                d="M -1.8 -4.5 
                   L -1.8 -32 
                   C -7 -38 -15 -38 -20 -33 
                   C -25 -28 -25 -20 -19 -14 
                   C -13 -8 -4.5 -3.5 -1.8 -4.5 Z"
                fill="url(#smRedLight)"
              />
              {/* Right half of heart (Darker shaded 3D fold gradient) */}
              <path
                d="M 1.8 -4.5 
                   L 1.8 -32 
                   C 7 -38 15 -38 20 -33 
                   C 25 -28 25 -20 19 -14 
                   C 13 -8 4.5 -3.5 1.8 -4.5 Z"
                fill="url(#smRedDark)"
              />
              {/* Smooth outer rounded heart cap bridge */}
              <path
                d="M -19 -14 
                   C -25 -20 -25 -28 -20 -33 
                   C -15 -38 -7 -38 -1.8 -32 
                   L 1.8 -32 
                   C 7 -38 15 -38 20 -33 
                   C 25 -28 25 -20 19 -14
                   C 13 -8 2 -3 0 0
                   C -2 -3 -13 -8 -19 -14 Z"
                fill="url(#smRedLight)"
                opacity="0.25"
              />
            </g>
          ))}

          {/* 4 Outer Red Spheres/Dots at 0°, 90°, 180°, 270° (Top, Right, Bottom, Left) */}
          {[0, 90, 180, 270].map((deg) => (
            <circle
              key={deg}
              cx={deg === 90 ? 44 : deg === 270 ? -44 : 0}
              cy={deg === 0 ? -44 : deg === 180 ? 44 : 0}
              r="6.5"
              fill="url(#smDotGrad)"
            />
          ))}

          {/* Central crisp white cross divide */}
          <path
            d="M -42 -2.2 L 42 -2.2 L 42 2.2 L -42 2.2 Z"
            fill={isDark ? "#0f172a" : "#ffffff"}
            transform="rotate(45)"
          />
          <path
            d="M -42 -2.2 L 42 -2.2 L 42 2.2 L -42 2.2 Z"
            fill={isDark ? "#0f172a" : "#ffffff"}
            transform="rotate(-45)"
          />
        </g>
      </svg>
    );
  }

  // Full Horizontal Student Medicover Logo (Emblem + Wordmark)
  return (
    <svg
      viewBox="0 0 395 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Main primary red gradient */}
        <linearGradient id="smFullRedLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef3340" />
          <stop offset="50%" stopColor="#d91d2a" />
          <stop offset="100%" stopColor="#b3141f" />
        </linearGradient>

        {/* Shaded 3D fold gradient */}
        <linearGradient id="smFullRedDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8101e" />
          <stop offset="60%" stopColor="#990b16" />
          <stop offset="100%" stopColor="#73050e" />
        </linearGradient>

        {/* Radial gradient for the 4 spheres */}
        <radialGradient id="smFullDotGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ff4d5a" />
          <stop offset="50%" stopColor="#d91d2a" />
          <stop offset="100%" stopColor="#800a12" />
        </radialGradient>
      </defs>

      {/* EMBLEM (Left side, centered around X=52, Y=50) */}
      <g transform="translate(52, 50)">
        {/* 4 Heart Petals at 45°, 135°, 225°, 315° */}
        {[45, 135, 225, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            {/* Left half of heart */}
            <path
              d="M -1.8 -4.5 
                 L -1.8 -32 
                 C -7 -38 -15 -38 -20 -33 
                 C -25 -28 -25 -20 -19 -14 
                 C -13 -8 -4.5 -3.5 -1.8 -4.5 Z"
              fill="url(#smFullRedLight)"
            />
            {/* Right half of heart */}
            <path
              d="M 1.8 -4.5 
                 L 1.8 -32 
                 C 7 -38 15 -38 20 -33 
                 C 25 -28 25 -20 19 -14 
                 C 13 -8 4.5 -3.5 1.8 -4.5 Z"
              fill="url(#smFullRedDark)"
            />
          </g>
        ))}

        {/* 4 Outer Red Spheres/Dots at Top, Right, Bottom, Left */}
        <circle cx="0" cy="-43" r="6" fill="url(#smFullDotGrad)" />
        <circle cx="43" cy="0" r="6" fill="url(#smFullDotGrad)" />
        <circle cx="0" cy="43" r="6" fill="url(#smFullDotGrad)" />
        <circle cx="-43" cy="0" r="6" fill="url(#smFullDotGrad)" />

        {/* Central crisp white cross divide */}
        <path
          d="M -40 -2 L 40 -2 L 40 2 L -40 2 Z"
          fill={isDark ? "#0f172a" : "#ffffff"}
          transform="rotate(45)"
        />
        <path
          d="M -40 -2 L 40 -2 L 40 2 L -40 2 Z"
          fill={isDark ? "#0f172a" : "#ffffff"}
          transform="rotate(-45)"
        />
      </g>

      {/* TYPOGRAPHY (Right side) */}
      {/* "STUDENT" */}
      <text
        x="118"
        y="42"
        fill={lightTextColor}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        fontSize="30"
        fontWeight="400"
        letterSpacing="0.10em"
      >
        STUDENT
      </text>

      {/* "MEDICOVER" */}
      <text
        x="118"
        y="80"
        fill={textColor}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        fontSize="35"
        fontWeight="900"
        letterSpacing="0.015em"
      >
        MEDICOVER
      </text>
    </svg>
  );
};
