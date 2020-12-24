import { PrivateContainer } from "components/PrivateContainer";
import { PublicContainer } from "components/PublicContainer";
import { AuthProvider } from "context/auth/auth.context";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { GlobalStyles } from "styles/global";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        {pathname === "/" ? (
          <PublicContainer>
            <Component {...pageProps} />
          </PublicContainer>
        ) : (
          <PrivateContainer>
            <Component {...pageProps} />
          </PrivateContainer>
        )}
      </AuthProvider>
    </>
  );
};

export default MyApp;
