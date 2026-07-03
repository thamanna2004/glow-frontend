import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import useUiStore from "../../store/uiStore";

function getCartTarget() {
  const el = document.getElementById("navbar-cart-target");
  if (!el) return { x: window.innerWidth - 48, y: 32 };
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

export default function FlyToCart() {
  const flyToCart = useUiStore((s) => s.flyToCart);
  const clearFlyToCart = useUiStore((s) => s.clearFlyToCart);
  const reduceMotion = useReducedMotion();
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (!flyToCart) return;
    setTarget(getCartTarget());
    const timer = window.setTimeout(clearFlyToCart, 700);
    return () => window.clearTimeout(timer);
  }, [flyToCart, clearFlyToCart]);

  if (reduceMotion || !flyToCart || !target) return null;

  const { imageUrl, from } = flyToCart;
  const size = 56;

  return createPortal(
    <AnimatePresence>
      {flyToCart && (
        <motion.img
          key={flyToCart.id}
          src={imageUrl}
          alt=""
          initial={{
            position: "fixed",
            left: from.x - size / 2,
            top: from.y - size / 2,
            width: size,
            height: size,
            borderRadius: 16,
            zIndex: 200,
            opacity: 1,
            scale: 1,
            boxShadow: "0 12px 32px rgba(36,52,42,0.25)",
          }}
          animate={{
            left: target.x - 18,
            top: target.y - 18,
            width: 36,
            height: 36,
            borderRadius: 10,
            opacity: 0.15,
            scale: 0.4,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none object-cover"
        />
      )}
    </AnimatePresence>,
    document.body
  );
}
