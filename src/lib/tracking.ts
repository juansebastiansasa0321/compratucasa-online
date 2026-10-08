export const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
            event_category: 'contacto',
            event_label: 'click_whatsapp',
            value: 1
        });
    }
};
