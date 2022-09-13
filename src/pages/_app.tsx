import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import CurrentUserContextProvider from "../context/CurrentUserContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CurrentUserContextProvider>
      <Component {...pageProps} />
    </CurrentUserContextProvider>
  );
};

export default MyApp;
