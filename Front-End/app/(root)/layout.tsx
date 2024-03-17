
import Header from "../../components/shared/Header";
import { CartStoreProvider } from '../../providers/cart-store-provider'
import Footer from "../../components/shared/Footer";
export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      <CartStoreProvider>
      <Header />
        {children}
      </CartStoreProvider>
      <Footer />
    </>
  );
}