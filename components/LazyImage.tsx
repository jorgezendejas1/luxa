import React, { useRef, useEffect, useState } from 'react';

// Define the props, extending standard ImgHTMLAttributes for passthrough
interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef<HTMLImageElement>(null);
    // Check for IntersectionObserver support once
    const supportsIO = typeof window !== 'undefined' && 'IntersectionObserver' in window;

    useEffect(() => {
        // If Intersection Observer is not supported or ref is not set, we don't need to do anything.
        // The component will fall back to native lazy loading.
        if (!supportsIO || !ref.current) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the image is about to enter the viewport, update the state.
                if (entry.isIntersecting) {
                    setIsLoaded(true);
                    // Stop observing the image once it has been loaded.
                    observer.unobserve(entry.target);
                }
            },
            {
                // Load the image 200px before it enters the viewport for a smoother experience.
                rootMargin: '0px 0px 200px 0px',
            }
        );

        observer.observe(ref.current);

        // Cleanup function to disconnect the observer when the component unmounts.
        return () => observer.disconnect();
    }, [supportsIO]);

    // Fallback for browsers that do not support Intersection Observer.
    if (!supportsIO) {
        return <img src={src} alt={alt} {...props} loading="lazy" />;
    }

    return (
        <img
            ref={ref}
            // Use the actual src only when the image is loaded/intersecting.
            // A light-gray 1x1 pixel GIF is used as a placeholder to maintain layout.
            src={isLoaded ? src : 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='}
            alt={alt}
            {...props}
        />
    );
};

export default LazyImage;