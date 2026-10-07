'use client';
import { track } from '@vercel/analytics';

const REF_KEY = 'pv_ref';

/** Lee ?ref= de la URL una sola vez por sesión y lo registra. */
export function captureRef() {
  try {
    const ref = new URLSearchParams(window.location.search).get('ref');
    if (ref && sessionStorage.getItem(REF_KEY) !== ref) {
      sessionStorage.setItem(REF_KEY, ref);
      track('ref_visit', { ref });
    }
  } catch {}
}

function getRef() {
  try { return sessionStorage.getItem(REF_KEY) || undefined; } catch { return undefined; }
}

/** track() con el ref de la sesión adjunto, si existe. */
export function trackEvent(name, props = {}) {
  const ref = getRef();
  try { track(name, ref ? { ...props, ref } : props); } catch {}
}
