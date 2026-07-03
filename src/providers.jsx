import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import LoginModal from "./components/LoginModal";
import WishlistAddedModal from "./components/WishlistAddedModal";
import CartAddedModal from "./components/CartAddedModal";
import QuickViewModal from "./components/QuickViewModal";
import ToastNotification from "./components/ToastNotification";
import WelcomePopup from "./components/WelcomePopup";
import IntroLoader from "./components/IntroLoader";
import { IntroGate } from "./components/PageReveal";
import LoadingScreen from "./components/LoadingScreen";
import OrderSuccess from "./components/OrderSuccess";
import AIChat from "./components/ai/AIChat";
import FlyToCart from "./components/motion/FlyToCart";

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <IntroLoader />
      <IntroGate>{children}</IntroGate>
      <LoginModal />
      <WishlistAddedModal />
      <CartAddedModal />
      <QuickViewModal />
      <ToastNotification />
      <WelcomePopup />
      <LoadingScreen />
      <OrderSuccess />
      <FlyToCart />
      <AIChat />
    </QueryClientProvider>
  );
}
