import './globals.css';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Suhasa Nayak — AI-First Senior Product Designer',
  description:
    'Suhasa Nayak untangles complex enterprise problems into interfaces people can actually use. Portfolio, case studies, and resume.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Nav />
        <main id="main-content">{children}</main>
        <footer>
          <p>© {new Date().getFullYear()} Suhasa Nayak — designed & built with retro anime energy.</p>
        </footer>
      </body>
    </html>
  );
}
