import Head from "next/head";
import "./globals.css";

export const apiUrl = 'http://localhost:3002'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="https://pbs.twimg.com/profile_images/1575509822606348292/iee7FiiP_400x400.jpg"></link>
      </Head>
      <body
        className={`antialiased bg-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
