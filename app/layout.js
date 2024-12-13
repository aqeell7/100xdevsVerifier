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
                <li><Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
                <li><Link href="/verify" className="text-gray-700 hover:text-blue-600">Verify</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-gray-100 py-10">
          <div className="container mx-auto px-4 grid md:grid-cols-4 gap-6">
            {/* Company Info */}
            <div>
              <h3 className="font-bold mb-3 text-gray-800">100xVerifier</h3>
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} 100xVerifier. Innovative Verification Technologies.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-700">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/docs", label: "Documentation" }
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-gray-600 hover:text-blue-600">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-700">Contact</h4>
              <p className="text-sm text-gray-600 mb-2">support@100xverifier.com</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-600 hover:text-blue-600">Twitter</Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600">LinkedIn</Link>
              </div>
            </div>

            {/* Compliance */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-700">Compliance</h4>
              <p className="text-xs text-gray-500">
                Committed to global data protection and security standards.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}