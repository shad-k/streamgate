import { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import '../styles/globals.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
