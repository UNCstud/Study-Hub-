import './globals.css';
import Nav from '../components/Nav';

export const metadata = {
  title: 'MedGuess — Pre-Med Study Hub',
  description: 'Clinical diagnosis games, MCAT prep, UNC course resources, and med school timeline tools for pre-med students.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Paste your Google AdSense script tag here once approved */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
