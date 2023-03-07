import type { AppProps } from 'next/app';
import { GlobalStyle } from '@/style';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
