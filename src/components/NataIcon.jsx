import React from "react";

const NataIcon = ({ width = 24, height = 24, fillCrust = "#f4c542", fillCustard = "#fcd34d", stroke = "#b89d29" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Rounded background circle */}
    <circle cx="32" cy="32" r="30" fill="#fff8dc" stroke={stroke} strokeWidth="2" />
    
    {/* The rest of the Nata pastry shapes */}
    <ellipse cx="32" cy="30" rx="20" ry="18" fill={fillCrust} stroke={stroke} strokeWidth="1" />
    <circle cx="32" cy="30" r="14" fill={fillCustard} stroke={stroke} strokeWidth="1" />
    <ellipse cx="32" cy="30" rx="18" ry="10" fill={fillCrust} stroke={stroke} strokeWidth="1" />
    <ellipse cx="32" cy="30" rx="14" ry="8" fill={fillCustard} stroke={stroke} strokeWidth="1" />
  </svg>
);

export default NataIcon;
