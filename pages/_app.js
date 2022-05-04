import '../styles/globals.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';
import { StoreProvider } from '../Context/Store';

//Binding events.
Router.events.on('routeChangeStart', () =>
  NProgress.start().set(0.4).configure({
    ease: 'ease',
    speed: 500,
    showSpinner: false,
    trickleSpeed: 800,
  })
);
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
