// Utility-Funktion für zufällige Farben mit gutem Kontrast zu weißer Schrift
export const generateRandomDarkColor = () => {
    // Generiert dunklere Farben (0-150 statt 0-255) für besseren Kontrast
    const r = Math.floor(Math.random() * 150);
    const g = Math.floor(Math.random() * 150);
    const b = Math.floor(Math.random() * 150);

    return `rgb(${r}, ${g}, ${b})`;
};
