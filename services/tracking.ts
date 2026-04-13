
// This is a placeholder for a real tracking service (e.g., Google Analytics, Mixpanel)

export const trackEvent = (category: string, action: string, label?: string) => {
  console.log(`Tracking Event: [${category}] ${action}${label ? ` - ${label}` : ''}`);
  // In a real app, you would have something like:
  // window.gtag('event', action, { 'event_category': category, 'event_label': label });
};

export const trackCTAClick = (ctaName: string) => {
  trackEvent('CTA', 'Click', ctaName);
};

export const trackNavClick = (linkName: string) => {
  trackEvent('Navigation', 'Click', linkName);
};

export const trackPhoneClick = () => {
  trackEvent('Contact', 'Phone Click');
};

export const trackWhatsAppClick = (source?: string) => {
  trackEvent('Contact', 'WhatsApp Click', source);
};

export const trackServiceClick = (serviceName: string) => {
  trackEvent('Service', 'Click', serviceName);
};

export const trackExternalLink = (linkName: string) => {
  trackEvent('Outbound Link', 'Click', linkName);
};

export const trackCalculatorUse = (caseType: string, scope: string, estimatedValue: number) => {
    console.log(`Calculator Use: Type=${caseType}, Scope=${scope}, Value=${estimatedValue}`);
    trackEvent('Calculator', 'Use', `${caseType} | ${scope} | ${estimatedValue}`);
};

export const trackCalculatorCTA = () => {
    trackEvent('Calculator', 'CTA Click', 'Confirmar Presupuesto');
};

export const trackFormSubmission = (formData: object) => {
    trackEvent('Form', 'Submission Success');
    console.log('Form Data:', formData);
};

export const trackFormSubmissionError = (error: unknown) => {
    trackEvent('Form', 'Submission Error');
    console.error('Form Error:', error);
};