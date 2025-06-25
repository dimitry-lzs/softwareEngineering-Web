import Avatar from '@mui/joy/Avatar';
import { useState } from 'react';
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
