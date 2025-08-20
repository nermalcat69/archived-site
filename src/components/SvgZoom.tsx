'use client';

import { useRef, useState, useEffect } from 'react';

interface SvgZoomProps {
  src: string;
  alt?: string;
  maxZoom?: number;
  containerHeight?: number;
}

export default function SvgZoom({
  src,
  alt = '',
  maxZoom = 2,
  containerHeight = 400,
}: SvgZoomProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => {
    setIsZoomed(false);
    const img = imgRef.current;
    if (img) {
      img.style.transformOrigin = 'center center';
    }
  };

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <div
        style={{
          overflow: 'hidden',
          height: `${containerHeight}px`,
          borderRadius: '8px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f3f4f6',
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        overflow: 'hidden',
        height: `${containerHeight}px`,
        borderRadius: '8px',
        position: 'relative',
        cursor: 'zoom-in',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          transition: 'transform 0.2s ease',
          transform: isZoomed ? `scale(${maxZoom})` : 'scale(1)',
        }}
      />
    </div>
  );
}
