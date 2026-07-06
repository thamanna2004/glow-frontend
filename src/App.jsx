<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import VerifyOtp from "./features/auth/pages/VerifyOtp";
import ResetPassword from "./features/auth/pages/ResetPassword";
import Browse from "./features/auth/pages/Browse";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/browse" element={<Browse />} />
        <Route
          path="*"
          element={
            <main>
              <h1>Glow Skin</h1>
              <p>Skincare Ecommerce Website</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  
=======
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import RefreshRedirect from "./components/routing/RefreshRedirect";
import ScrollToTop from "./components/routing/ScrollToTop";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import WishlistPage from "./pages/WishlistPage";
import OrdersPage from "./pages/OrdersPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import ContentPage from "./pages/ContentPage";
import SearchPage from "./pages/SearchPage";
import CollectionPage from "./pages/CollectionPage";
import { aboutPages, contactPages } from "./data/contentPages";
import AdminDashboard from "./features/admin/pages/Dashboard";
import AdminProducts from "./features/admin/pages/Products";
import AdminCategories from "./features/admin/pages/Category";
import AdminOrders from "./features/admin/pages/Orders";
import AdminUsers from "./features/admin/pages/Users";
import AdminInventory from "./features/admin/pages/Inventory";
import AdminAnalytics from "./features/admin/pages/Analytics";
import AdminAiAnalytics from "./features/admin/pages/AiAnalytics";
import AdminSettings from "./features/admin/pages/Settings";

export default function App() {
  return (
    <>
      <RefreshRedirect />
      <ScrollToTop />
      <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/categories/skin" element={<CategoryPage />} />
        <Route path="/categories/skin/:groupSlug" element={<CategoryPage />} />
        <Route path="/categories/skin/:groupSlug/:itemSlug" element={<CategoryPage />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute roles={["user"]}>
              <AccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute roles={["user"]}>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route path="/new-arrivals" element={<CollectionPage collection="new-arrivals" />} />
        <Route
          path="/new-arrivals/:groupSlug"
          element={<CollectionPage collection="new-arrivals" />}
        />
        <Route path="/best-sellers" element={<CollectionPage collection="best-sellers" />} />
        <Route
          path="/best-sellers/:groupSlug"
          element={<CollectionPage collection="best-sellers" />}
        />

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />

        <Route
          path="/about"
          element={
            <ContentPage
              title="About Glow Skin"
              subtitle="We craft clean formulations with high-quality botanicals, minimalist rituals, and a premium skin-first philosophy."
            />
          }
        />
        {Object.entries(aboutPages).map(([slug, page]) => (
          <Route
            key={slug}
            path={`/about/${slug}`}
            element={<ContentPage title={page.title} subtitle={page.subtitle} />}
          />
        ))}
        <Route
          path="/contact"
          element={
            <ContentPage
              title="Contact Us"
              subtitle="Need help with routine selection or your order? Our skin concierge team is here to help."
            />
          }
        />
        {Object.entries(contactPages).map(([slug, page]) => (
          <Route
            key={slug}
            path={`/contact/${slug}`}
            element={<ContentPage title={page.title} subtitle={page.subtitle} />}
          />
        ))}
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="ai-analytics" element={<AdminAiAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}
>>>>>>> b31e3968d3bdf0b3f07ca7f78c4aa3dcc0dd2e8d
