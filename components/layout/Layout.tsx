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
      <header className="navbar shadow-lg text-neutral-content p-2 h-14">
        <Link href="/">
          <a>
            <span className="hover:text-primary cursor-pointer text-xl font-medium">Streamgate</span>
          </a>
        </Link>
        <div></div>
      </header>
      <main className="text-primary-content w-full">{children}</main>
    </>
  );
};

export default Layout;
