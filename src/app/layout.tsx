import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import { Providers } from '../components/theme-toggle/provider';
import Header from '../components/header/page';
import Footer from '../components/footer/page';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aspect Exams',
  description: 'Gerencie seus exames conosco!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${interTight.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
