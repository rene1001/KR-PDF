/**
 * Privacy-first analytics helper for KR PDF.
 * Never collects, transmits, or logs document contents or file names.
 * Only records anonymous operational telemetry (tool id, processing time, status, language).
 */

export interface AnalyticsEvent {
  action: 'tool_opened' | 'file_selected' | 'conversion_started' | 'conversion_success' | 'conversion_error' | 'download_clicked' | 'language_changed';
  tool?: string;
  durationMs?: number;
  fileSizeBytes?: number;
  language?: string;
  errorType?: string;
}

export function trackEvent(event: AnalyticsEvent) {
  try {
    // Check if Google Analytics (gtag) is configured in window
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('event', event.action, {
        event_category: 'kr_pdf_tool',
        event_label: event.tool,
        value: event.durationMs ? Math.round(event.durationMs / 1000) : undefined,
        language: event.language || document.documentElement.lang,
      });
    }

    // Also store anonymous session stats in localStorage for local transparency
    const statsKey = 'kr_pdf_anon_stats';
    const existing = JSON.parse(localStorage.getItem(statsKey) || '{"conversions":0, "toolsUsed":{}}');
    if (event.action === 'conversion_success') {
      existing.conversions = (existing.conversions || 0) + 1;
      if (event.tool) {
        existing.toolsUsed[event.tool] = (existing.toolsUsed[event.tool] || 0) + 1;
      }
      localStorage.setItem(statsKey, JSON.stringify(existing));
    }
  } catch (e) {
    // Silently ignore analytics errors
  }
}

export function trackPageView(page: string, language?: string) {
  try {
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('config', win.GA_MEASUREMENT_ID || 'G-KRPDF', {
        page_path: `/#${page}`,
        page_title: page,
        language: language,
      });
    }
  } catch (e) {
    // Silently ignore
  }
}
