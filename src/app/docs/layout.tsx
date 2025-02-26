import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation - Next.js Dashboard',
  description: 'Documentation and guides for the Next.js Dashboard with Shadcn UI'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Your global providers, header, etc. */}
        {children}
      </body>
    </html>
  );
}