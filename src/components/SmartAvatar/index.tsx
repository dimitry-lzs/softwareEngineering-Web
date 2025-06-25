import Avatar from '@mui/joy/Avatar';
import { useState, useEffect, useRef } from 'react';
import { getInitials, getAvatarGradient } from '../../utils/avatarUtils';

type SmartAvatarProps = {
    src?: string;
    name: string;
    size?: 'sm' | 'md' | 'lg';
    sx?: object;
    className?: string;
};

export default function SmartAvatar({ src, name, size = 'md', sx = {}, className }: SmartAvatarProps) {
    const [imageError, setImageError] = useState(false);
    const [isInAspectRatio, setIsInAspectRatio] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // Multiple ways to detect if we're inside an AspectRatio container
        const checkIfInAspectRatio = () => {
            const currentRef = containerRef.current || imgRef.current;
            if (!currentRef) return false;

            // Check parent elements for AspectRatio indicators
            let element = currentRef.parentElement;
            while (element) {
                // Check for MUI AspectRatio class names
                if (element.classList.contains('MuiAspectRatio-content') ||
                    element.classList.contains('MuiAspectRatio-root') ||
                    element.getAttribute('data-aspect-ratio') ||
                    // Check for sx prop patterns that suggest AspectRatio
                    (element.style.width === '100%' && element.style.height === '100%' && element.style.position === 'relative')) {
                    return true;
                }
                element = element.parentElement;
                // Don't go too far up the DOM tree
                if (!element || element === document.body) break;
            }

            // Also check if the sx prop suggests we're in an AspectRatio
            if (sx && typeof sx === 'object') {
                const sxObj = sx as any;
                if ((sxObj.width === '100%' && sxObj.height === '100%') ||
                    (sxObj.flex && (sxObj.minWidth || sxObj.maxWidth))) {
                    return true;
                }
            }

            return false;
        };

        // Check immediately and after a short delay to account for DOM updates
        setIsInAspectRatio(checkIfInAspectRatio());

        const timer = setTimeout(() => {
            setIsInAspectRatio(checkIfInAspectRatio());
        }, 100);

        return () => clearTimeout(timer);
    }, [sx]);

    // Check if we should render as container-filling element
    const shouldFillContainer = isInAspectRatio || (sx && typeof sx === 'object' && (sx as any).width === '100%');

    // If we should fill container, render optimized for that
    if (shouldFillContainer) {
        if (src && src.trim() && !imageError) {
            return (
                <img
                    ref={imgRef}
                    src={src}
                    alt={name}
                    className={className}
                    onError={() => setImageError(true)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 'inherit',
                        display: 'block',
                        ...(typeof sx === 'object' ? sx : {})
                    }}
                />
            );
        }

        return (
            <div
                ref={containerRef}
                className={className}
                style={{
                    width: '100%',
                    height: '100%',
                    background: getAvatarGradient(name),
                    color: 'white',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: size === 'sm' ? '1.2rem' : size === 'lg' ? '2.5rem' : '1.8rem',
                    borderRadius: 'inherit',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    position: 'relative',
                    ...(typeof sx === 'object' ? sx : {})
                }}
            >
                <div
                    style={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)',
                        borderRadius: 'inherit',
                        pointerEvents: 'none',
                    }}
                />
                <span style={{ position: 'relative', zIndex: 1 }}>
                    {getInitials(name)}
                </span>
            </div>
        );
    }

    // Regular Avatar usage (not in AspectRatio)
    if (src && src.trim() && !imageError) {
        return (
            <Avatar
                src={src}
                alt={name}
                size={size}
                sx={sx}
                className={className}
                onError={() => setImageError(true)}
            />
        );
    }

    return (
        <Avatar
            size={size}
            className={className}
            sx={{
                background: getAvatarGradient(name),
                color: 'white',
                fontWeight: 'bold',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)',
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                },
                ...sx
            }}
        >
            {getInitials(name)}
        </Avatar>
    );
}
