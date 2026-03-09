import { GA_MEASUREMENT_ID, event } from './gtag';

export const trackWhatsappClick = () => {
    event({
        action: 'whatsapp_click',
        category: 'cta',
        label: 'Home WhatsApp',
    });
};

export const trackScheduleVisitClick = () => {
    event({
        action: 'schedule_visit_click',
        category: 'cta',
        label: 'Home Schedule Visit',
    });
};

export const trackContactFormSubmit = () => {
    event({
        action: 'contact_form_submit',
        category: 'form',
        label: 'Contact Page',
    });
};