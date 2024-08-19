import React from 'react';

const SpinnerIcon = ({ width, height, arrowColor = 'black', textColor = 'black' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="relative transition-all duration-700 ease-in-out"
  >
    <text x="50%" y="50%" textAnchor="middle" fill={textColor} dy=".3em" fontSize="24">SB</text>
    <g className="animate-spin">
      <path
        d="M50,10 A40,40 0 0,1 90,50"
        stroke={arrowColor}
        strokeWidth="2"
        fill="none"
      />
      <polygon points="89,50 79,45 79,55" fill={arrowColor} />
      <path
        d="M90,50 A40,40 0 0,1 50,90"
        stroke={arrowColor}
        strokeWidth="2"
        fill="none"
      />
      <polygon points="50,89 45,79 55,79" fill={arrowColor} />
      <path
        d="M50,90 A40,40 0 0,1 10,50"
        stroke={arrowColor}
        strokeWidth="2"
        fill="none"
      />
      <polygon points="11,50 21,55 21,45" fill={arrowColor} />
      <path
        d="M10,50 A40,40 0 0,1 50,10"
        stroke={arrowColor}
        strokeWidth="2"
        fill="none"
      />
      <polygon points="50,11 55,21 45,21" fill={arrowColor} />
    </g>
    <style>
      {`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 4s linear infinite;
          transform-origin: center;
        }
      `}
    </style>
  </svg>
);

export default SpinnerIcon;
