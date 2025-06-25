/**
 * Avatar utilities for generating initials and colors consistently across the app
 */

/**
 * Generate initials from a person's name
 * @param name - Full name of the person
 * @returns String containing up to 2 initials
 */
export const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2); // Take only first 2 initials
};

/**
 * Generate a consistent color based on the name
 * @param name - Name to generate color for
 * @returns Hex color string
 */
export const getAvatarColor = (name: string): string => {
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#FF8A65', '#81C784', '#64B5F6', '#FFB74D', '#F06292'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

/**
 * Get a slightly darker shade of a color for gradient effects
 * @param color - Hex color string
 * @returns RGB color string (darker shade)
 */
export const getDarkerShade = (color: string): string => {
    // Simple function to darken the color by reducing brightness
    const rgb = color.match(/\w\w/g);
    if (!rgb) return color;

    const [r, g, b] = rgb.map(x => Math.max(0, parseInt(x, 16) - 30));
    return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Generate avatar background gradient
 * @param name - Name to generate gradient for
 * @returns CSS gradient string
 */
export const getAvatarGradient = (name: string): string => {
    const baseColor = getAvatarColor(name);
    const darkerColor = getDarkerShade(baseColor);
    return `linear-gradient(135deg, ${baseColor}, ${darkerColor})`;
};
