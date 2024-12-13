import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "100xVerifier",
  description: "Secure Verification with ZKTLS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="w-full bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <Link href="/" className="text-2xl font-bold text-blue-600">
                100xVerifier
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                Secure Verification with ZKTLS
              </p>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link 
                    href="/" 
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/verify" 
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Verify
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="w-full bg-gray-100 py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} 100xVerifier. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}