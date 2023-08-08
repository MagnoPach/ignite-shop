import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import { Container } from "../styles/pages/app";

import { CartContextProvider } from "../contexts/CartContext";
import { Cart } from "../components/Cart";
import { Header } from "../components/Header";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartContextProvider>
        <Header />

        <Cart />
        <Component {...pageProps} />
      </CartContextProvider>
    </Container>
  );
}
