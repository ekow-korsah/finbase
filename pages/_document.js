import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23D4AF37'/><text x='16' y='22' text-anchor='middle' font-family='Arial' font-size='18' font-weight='bold' fill='white'>F</text></svg>" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23D4AF37'/><text x='16' y='22' text-anchor='middle' font-family='Arial' font-size='18' font-weight='bold' fill='white'>F</text></svg>" />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html:
          `(function(){var t=localStorage.getItem('finbase-theme')||'dark';document.documentElement.dataset.theme=t;})()`
        }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
