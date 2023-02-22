import type { AppProps } from 'next/app';
import { GlobalStyle } from '@/style';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
