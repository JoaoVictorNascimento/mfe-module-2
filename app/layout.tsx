import '../styles.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Módulo 2 - Sistema de E-commerce',
  description: 'Módulo 2 com CSR',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
