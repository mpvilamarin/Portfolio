import { ImageResponse } from 'next/og';

export const alt = 'Paula Villamarín — Desarrolladora Frontend & Diseñadora';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Imagen para compartir la home (LinkedIn, WhatsApp, etc.). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          backgroundColor: '#0D0709',
          backgroundImage:
            'radial-gradient(circle at 85% 30%, rgba(244,63,94,0.22), transparent 55%)',
          color: '#FFF1F2',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, color: '#9D8B8E', letterSpacing: 6 }}>
          <span style={{ color: '#F43F5E' }}>//&nbsp;</span>PORTAFOLIO
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 36, lineHeight: 0.95 }}>
          <span style={{ fontSize: 120, fontWeight: 300 }}>PAULA</span>
          <span style={{ fontSize: 120, fontWeight: 900 }}>VILLAMARÍN</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 44 }}>
          <div style={{ width: 96, height: 3, backgroundColor: '#F43F5E', marginRight: 24 }} />
          <span style={{ fontSize: 36, color: '#FFF1F2' }}>
            Desarrolladora Frontend · Diseñadora Gráfica
          </span>
        </div>
      </div>
    ),
    size
  );
}
