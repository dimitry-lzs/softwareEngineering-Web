// Helper function to format speciality display name
export default function formatString(speciality: string): string {
    return speciality
        .replace('_', ' ')
        .toLowerCase()
        .replace(/\b\w/g, (l) => l.toUpperCase());
}