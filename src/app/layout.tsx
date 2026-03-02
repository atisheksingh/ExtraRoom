import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { FirebaseStatus } from '@/components/FirebaseStatus';
import { FirebaseDebugger } from '@/components/FirebaseDebugger';
import { StorageProvider } from '@/context/StorageContext';
import { AuthProvider } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ExtraRoom - Physical Cloud Storage',
  description: 'Your closet in the cloud. 10-minute flash retrieval.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-slate-50 antialiased")} suppressHydrationWarning>
        <AuthProvider>
          <StorageProvider>
            <FirebaseStatus />
            <FirebaseDebugger />
            <Navbar />
            <main className="container mx-auto py-6 px-4">
              {children}
            </main>
          </StorageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
