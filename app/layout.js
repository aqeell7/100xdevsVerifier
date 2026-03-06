import { Bricolage_Grotesque } from 'next/font/google';
import { ThemeProvider } from './components/theme-provider';
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

export const metadata = {
  title: "100xDevs Verifier | Premium Edition",
  description: "Modern Verifier Dashboard built for 100xDevs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolage.variable} antialiased selection:bg-electric selection:text-white min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
