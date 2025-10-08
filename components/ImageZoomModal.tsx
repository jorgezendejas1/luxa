import React, { useState, useEffect, useRef } from 'react';

// Icons
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
);
const ZoomInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3h-6" /></svg>
);
const ZoomOutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>
);
const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M20 20v-5h-5M4 4l16 16" /></svg>
);


interface ImageZoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
}

const ImageZoomModal: React.FC<ImageZoomModalProps> = ({ isOpen, onClose, imageUrl }) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const resetZoom = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    useEffect(() => {
        if (isOpen) {
            resetZoom();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    
    const handleZoom = (factor: number) => {
        const newScale = Math.max(1, Math.min(scale * factor, 5));
        if (newScale === 1) {
            setPosition({ x: 0, y: 0 });
        }
        setScale(newScale);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale <= 1) return;
        e.preventDefault();
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !imageRef.current || !containerRef.current) return;
        setPosition(prevPos => {
            const containerRect = containerRef.current!.getBoundingClientRect();
            // We use getBoundingClientRect on the image itself to account for the current scale
            const imageRect = imageRef.current!.getBoundingClientRect();
            
            // Calculate maximum movement boundaries dynamically based on current zoom
            const maxX = Math.max(0, (imageRect.width - containerRect.width) / 2);
            const maxY = Math.max(0, (imageRect.height - containerRect.height) / 2);

            const newX = Math.max(-maxX, Math.min(prevPos.x + e.movementX, maxX));
            const newY = Math.max(-maxY, Math.min(prevPos.y + e.movementY, maxY));
            
            return { x: newX, y: newY };
        });
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };
    
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        handleZoom(e.deltaY > 0 ? 0.9 : 1.1);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in-opacity" role="dialog" aria-modal="true">
            {/* Close Button (Top Right) */}
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-pink-500 transition-colors z-20" aria-label="Cerrar vista de zoom">
                <CloseIcon />
            </button>
            
            {/* Zoom Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 bg-opacity-70 p-2 rounded-full flex items-center space-x-2 z-20">
                <button onClick={() => handleZoom(0.8)} className="p-2 text-white hover:bg-gray-700 rounded-full" aria-label="Alejar zoom"><ZoomOutIcon /></button>
                <button onClick={resetZoom} className="p-2 text-white hover:bg-gray-700 rounded-full" aria-label="Restablecer zoom"><ResetIcon /></button>
                <button onClick={() => handleZoom(1.25)} className="p-2 text-white hover:bg-gray-700 rounded-full" aria-label="Acercar zoom"><ZoomInIcon /></button>
            </div>

            {/* Image Container */}
            <div
                ref={containerRef}
                className="w-full h-full flex items-center justify-center overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onWheel={handleWheel}
            >
                <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Vista ampliada del producto"
                    className={`max-w-full max-h-full transition-transform duration-100 ease-out ${scale > 1 ? 'cursor-grab' : ''} ${isDragging ? 'cursor-grabbing' : ''}`}
                    style={{ transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)` }}
                    draggable="false"
                />
            </div>
        </div>
    );
};

export default ImageZoomModal;
