export const CONSENT_KEY = "js_cookie_consent";

export type Consent = "granted" | "denied";

/**
 * Runs in <head> before GTM/GA load. Sets Google Consent Mode v2 defaults to
 * "denied" unless the visitor previously accepted.
 */
export const consentDefaultsScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  var c = null;
  try { c = localStorage.getItem('${CONSENT_KEY}'); } catch (e) {}
  var g = c === 'granted' ? 'granted' : 'denied';
  gtag('consent', 'default', {
    ad_storage: g,
    ad_user_data: g,
    ad_personalization: g,
    analytics_storage: g,
    wait_for_update: 500
  });
`;
