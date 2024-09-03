import { AuthProvider } from '../components/AuthProvider';
import './global.css';

export const metadata = {
  title: 'SendEase',
  description: 'Effektivisera och förenkla dina leveranser',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
