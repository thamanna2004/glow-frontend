import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { useAuth } from "../features/auth/hooks/useAuth";
import useCartStore from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import useUiStore from "../store/uiStore";
import UserMenu from "./auth/UserMenu";
import AdminMenu from "./auth/AdminMenu";
import CategoriesNavTrigger from "./category/CategoriesNavTrigger";
import SkinMegaMenu from "./category/SkinMegaMenu";
import NavDropdownTrigger, { NavDropdownPanel } from "./nav/NavDropdown";
import SearchBar from "./SearchBar";
import { navDropdownMenus } from "../data/navMenuData";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isAuthenticated, isAdmin } = useAuth();
  const openAuthModal = useUiStore((state) => state.openAuthModal);
  const count = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const wishlistCount = useWishlistStore((state) => state.items.length);

  const activeMenu =
    activeDropdown === "categories"
      ? null
      : navDropdownMenus.find((menu) => menu.id === activeDropdown) || null;

  const closeDropdowns = () => setActiveDropdown(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full animate-[navbarFadeIn_700ms_ease-out]">
      <nav
        className={`luxury-glass w-full border-b transition-all duration-500 ${
          scrolled
            ? "border-sand/50 shadow-[0_16px_48px_-20px_rgba(43,36,32,0.14)]"
            : "border-beige/40 shadow-[0_8px_32px_-16px_rgba(43,36,32,0.08)]"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-5">
          <Link to="/" className="group relative shrink-0 transition duration-300 hover:opacity-90">
            <Logo showTagline size="md" />
          </Link>

          <div className="hidden flex-1 px-4 lg:block lg:max-w-md xl:max-w-lg">
            <SearchBar />
          </div>

          <div className="hidden items-center gap-5 md:flex md:gap-6">
            {isAdmin ? (
              <AdminMenu />
            ) : isAuthenticated ? (
              <UserMenu />
            ) : (
              <ActionButton
                label="Login"
                icon={<UserIcon />}
                onClick={() => openAuthModal({ tab: "login" })}
              />
            )}

            {!isAdmin && (
              <ActionLink to="/wishlist" label="Wishlist" icon={<HeartIcon />} badge={wishlistCount} />
            )}

            {!isAdmin && <ActionLink to="/cart" label="Cart" icon={<BagIcon />} badge={count} cartTarget />}
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ice-200 bg-white/80 text-navy-900 transition duration-300 hover:bg-white md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <div
          className="relative hidden border-t border-ice-100/70 lg:block"
          onMouseLeave={closeDropdowns}
        >
          <SkinMegaMenu
            open={activeDropdown === "categories"}
            onClose={closeDropdowns}
          />
          <NavDropdownPanel menu={activeMenu} onClose={closeDropdowns} />

          <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-7 px-4 py-3.5 md:px-8 xl:gap-9">
            <CategoriesNavTrigger
              open={activeDropdown === "categories"}
              onOpenChange={(isOpen) => setActiveDropdown(isOpen ? "categories" : null)}
            />
            {navDropdownMenus.map((menu) => (
              <NavDropdownTrigger
                key={menu.id}
                menu={menu}
                activeId={activeDropdown}
                onOpenChange={setActiveDropdown}
              />
            ))}
          </div>
        </div>
      </nav>

      <div
        className={`w-full overflow-hidden border-b border-sand/40 bg-cream/95 backdrop-blur-2xl transition-all duration-500 ease-out lg:hidden ${
          open ? "max-h-[85vh] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl animate-[slideDown_400ms_ease-out] px-4 py-5 md:px-8">
          <div className="mb-4 lg:hidden">
            <SearchBar />
          </div>
          <div className="flex flex-col gap-1">
            <CategoriesNavTrigger mobile onNavigate={() => setOpen(false)} />
            {navDropdownMenus.map((menu) => (
              <NavDropdownTrigger
                key={`mobile-${menu.id}`}
                menu={menu}
                mobile
                onNavigate={() => setOpen(false)}
              />
            ))}
          </div>
          <div className="mt-5 flex justify-around border-t border-ice-100 pt-5">
            {isAdmin ? (
              <AdminMenu />
            ) : isAuthenticated ? (
              <UserMenu />
            ) : (
              <ActionButton
                label="Login"
                icon={<UserIcon />}
                onClick={() => openAuthModal({ tab: "login" })}
              />
            )}
            {!isAdmin && (
              <ActionLink to="/wishlist" label="Wishlist" icon={<HeartIcon />} badge={wishlistCount} />
            )}
            {!isAdmin && <ActionLink to="/cart" label="Cart" icon={<BagIcon />} badge={count} cartTarget />}
          </div>
        </div>
      </div>
    </header>
  );
}

function ActionLink({ to, label, icon, badge, cartTarget = false }) {
  const cartPulseKey = useUiStore((s) => s.cartPulseKey);

  return (
    <Link to={to} className="nav-link-luxury group flex flex-col items-center gap-1.5 text-forest">
      <motion.span
        id={cartTarget ? "navbar-cart-target" : undefined}
        key={cartTarget ? cartPulseKey : label}
        animate={
          cartTarget && cartPulseKey > 0
            ? { scale: [1, 1.18, 0.95, 1], rotate: [0, -8, 8, 0] }
            : { scale: 1 }
        }
        transition={{ duration: 0.45 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-forest transition duration-300 group-hover:bg-sage-light/50 group-hover:text-gold group-hover:shadow-[0_0_20px_rgba(184,148,94,0.2)]"
      >
        {icon}
        {badge !== undefined && badge > 0 && (
          <motion.span
            key={badge}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -right-1 -top-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-forest px-1 text-[10px] font-semibold text-cream"
          >
            {badge}
          </motion.span>
        )}
      </motion.span>
      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 transition duration-300 group-hover:text-gold">
        {label}
      </span>
    </Link>
  );
}

function ActionButton({ label, icon, badge, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="nav-link-luxury group flex flex-col items-center gap-1.5 text-forest"
    >
      <motion.span
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-forest transition duration-300 group-hover:bg-sage-light/50 group-hover:text-gold group-hover:shadow-[0_0_20px_rgba(184,148,94,0.2)]"
      >
        {icon}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-forest px-1 text-[10px] font-semibold text-cream">
            {badge}
          </span>
        )}
      </motion.span>
      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 transition duration-300 group-hover:text-gold">
        {label}
      </span>
    </button>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.75]">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.75]">
      <path d="M12 21s-7.2-4.6-9-8.5A5.5 5.5 0 0 1 12 6.7a5.5 5.5 0 0 1 9 5.8C19.2 16.4 12 21 12 21Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.75]">
      <path d="M6 7h12l-1.2 11.2a1.8 1.8 0 0 1-1.8 1.6H9a1.8 1.8 0 0 1-1.8-1.6L6 7z" />
      <path d="M9 7V5.5A3 3 0 0 1 12 3a3 3 0 0 1 3 2.5V7" />
    </svg>
  );
}
