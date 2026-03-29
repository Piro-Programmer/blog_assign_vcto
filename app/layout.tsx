import './globals.css';
import Providers from './providers';
import Navbar from './components/common/Navbar/page';
import Footer from './components/common/Footer/page';
import { ThemeProvider } from 'next-themes';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Providers>{children}</Providers>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
