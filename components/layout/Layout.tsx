import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Streamgate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="navbar shadow-lg bg-neutral text-neutral-content p-2 h-14">
        <Link href="/">
          <a>
            <span className="hover:text-primary cursor-pointer text-xl font-medium">Streamgate</span>
          </a>
        </Link>
        <div></div>
      </header>
      <main className="text-secondary-content w-full">{children}</main>
      <footer className="footer footer-center text-info flex items-center justify-center bg-slate-700 h-10 fixed bottom-0">
        Built by
        <a className="text-info" href="https://github.com/shad-k">
          Shadab Khan
        </a>
      </footer>
    </>
  );
};

export default Layout;
