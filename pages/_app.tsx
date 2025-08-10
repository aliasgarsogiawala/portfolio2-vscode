import { useEffect } from 'react';
import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';
import Head from '@/components/Head';
import { TerminalProvider } from '@/contexts/TerminalContext';
import { PluginProvider } from '@/src/plugins/store';

import '@/styles/globals.css';
import '@/styles/themes.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, []);

  return (
    <PluginProvider>
      <TerminalProvider>
        <Layout>
          <Head title={`Aliasgar Sogiawala | ${pageProps.title}`} />
          <Component {...pageProps} />
        </Layout>
      </TerminalProvider>
    </PluginProvider>
  );
}

export default MyApp;
