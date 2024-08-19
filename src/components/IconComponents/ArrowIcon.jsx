import React from "react";

const ArrowIcon = ({ direction, onClick }) => {
  return (
    <button
      className={`absolute top-1/2 ${direction === 'left' ? 'left-0' : 'right-0'} transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full`}
      onClick={onClick}
    >
      {direction === 'left' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
};

export default ArrowIcon;
