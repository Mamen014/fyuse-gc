// app/layout.js
import './globals.css';
import SessionWrapper from '../components/SessionWrapper';

export const metadata = {
  title: 'FYUSE',
  description: 'For You Style',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the application with SessionWrapper */}
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}