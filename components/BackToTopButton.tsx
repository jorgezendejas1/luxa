import React from 'react';

interface BackToTopButtonProps {
    isVisible: boolean;
    onClick: () => void;
}

const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
    </svg>
);


const BackToTopButton: React.FC<BackToTopButtonProps> = ({ isVisible, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`fixed bottom-24 right-5 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 z-40 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
            }`}
            aria-label="Volver arriba"
        >
            <ArrowUpIcon />
        </button>
    );
};

export default BackToTopButton;