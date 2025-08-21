export function getTime(): string {
    const date = new Date();
    const hour = date.getHours()
    if (hour >= 5 && hour < 12) {
        return "Good morning";
    } else if (hour >= 12 && hour < 18) {
        return "Hello";
    } else {
        return "Good evening";
    }
}

export function getUrgentDate(date: string): string {
    if (date) {
        const newDate = new Date(date);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(newDate);
    } else { return 'no Urgent Task' }
}