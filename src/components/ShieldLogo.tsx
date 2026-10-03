import React from "react";

interface ShieldLogoProps {
  policyId: string;
  className?: string;
}

export const ShieldLogo: React.FC<ShieldLogoProps> = ({ policyId, className = "w-16 h-16" }) => {
  // Map policy ID to custom colors matching the user's screenshot
  const theme = React.useMemo(() => {
    switch (policyId) {
      case "supreme":
        return {
          outerFill: "#fef3c7", // amber-100
          outerStroke: "#fde68a", // amber-200
          innerFill: "#f59e0b", // amber-500
          text: "S",
          fontSize: "26px"
        };
      case "elite":
        return {
          outerFill: "#fee2e2", // red-100
          outerStroke: "#fecaca", // red-200
          innerFill: "#ef4444", // red-500
          text: "E",
          fontSize: "26px"
        };
      case "prime100":
        return {
          outerFill: "#dbeafe", // blue-100
          outerStroke: "#bfdbfe", // blue-200
          innerFill: "#3b82f6", // blue-500
          text: "P100",
          fontSize: "14px"
        };
      case "prime500":
      default:
        return {
          outerFill: "#d1fae5", // emerald-100
          outerStroke: "#a7f3d0", // emerald-200
          innerFill: "#10b981", // emerald-500
          text: "P500",
          fontSize: "14px"
        };
    }
  }, [policyId]);

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Shield Shape */}
      <path
        d="M 50 12 C 68 12, 85 16, 85 24 C 85 58, 68 82, 50 92 C 32 82, 15 58, 15 24 C 15 16, 32 12, 50 12 Z"
        fill={theme.outerFill}
        stroke={theme.outerStroke}
        strokeWidth="2"
      />

      {/* Inner Shield Shape */}
      <path
        d="M 50 22 C 64 22, 77 25, 77 32 C 77 58, 64 77, 50 85 C 36 77, 23 58, 23 32 C 23 25, 36 22, 50 22 Z"
        fill={theme.innerFill}
      />

      {/* Centered Label */}
      <text
        x="50"
        y="57"
        textAnchor="middle"
        fill="#ffffff"
        fontSize={theme.fontSize}
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {theme.text}
      </text>
    </svg>
  );
};
