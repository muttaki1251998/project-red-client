import { NextUIProvider } from "@nextui-org/react";
import { wrapper } from '../store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/Footer";
import "../app/globals.css"

function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const router = useRouter();
  const admin = useSelector((state) => state.admin.isAdminLoggedIn);

  useEffect(() => {
    // Unregister service workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister().then(success => {
            if (success) {
              console.log('ServiceWorker unregistered successfully');
            }
          });
        });
      }).catch(err => {
        console.log('ServiceWorker unregistration failed: ', err);
      });
    }

    const protectedRoutes = ['/admin'];
    const pathIsProtected = protectedRoutes.includes(router.pathname);

    if (!admin && pathIsProtected) {
      router.push('/');
    }
  }, [router, admin]);

  // List of routes where the navbar should not be shown
  const hideNavbarRoutes = ['/admin'];

  // Check if the current route matches any of the hideNavbarRoutes
  const shouldHideNavbar = hideNavbarRoutes.some(route => router.pathname.startsWith(route));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store.__persistor}>
        <NextUIProvider>
          {!shouldHideNavbar && <CustomNavbar />}
          <div className="content-wrapper">
            <Component {...props} />
          </div>
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }) => {
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
  };

  return {
    pageProps,
  };
});

export default wrapper.withRedux(MyApp);
