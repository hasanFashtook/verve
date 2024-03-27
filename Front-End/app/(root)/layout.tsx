
import Header from "../../components/shared/Header";
import { CartStoreProvider } from '../../providers/cart-store-provider'
import Footer from "../../components/shared/Footer";
import { SessionProvider } from "next-auth/react";
export default async function Layout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <>
      <SessionProvider>
        <CartStoreProvider>
          <Header />
          {children}
        </CartStoreProvider>
        <Footer />
      </SessionProvider>
    </>
  );
}