import { Montserrat, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import { Analytics } from '@vercel/analytics/react';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '600', '700', '800', '900'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://paulavillamarin.com'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* Script inline: aplica el tema ANTES de renderizar para evitar flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light');}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${robotoMono.variable} antialiased bg-base`}
      >
        <CustomCursor />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
