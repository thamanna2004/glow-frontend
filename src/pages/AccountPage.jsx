import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function AccountPage() {
  const { user, logout } = useAuth();

  return (
    <section className="space-y-6 pb-10">
      <header className="rounded-[26px] glass-panel p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">User Account</p>
        <h1 className="display-heading mt-2 text-5xl text-navy-900 md:text-6xl">
          Hello, {user?.name}
        </h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[24px] glass-panel p-6">
          <h2 className="display-heading text-4xl text-navy-900">Profile</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/orders">
              <Button variant="outline">My Orders</Button>
            </Link>
            <Button variant="outline" onClick={logout}>
              Log Out
            </Button>
          </div>
        </article>

        <article className="rounded-[24px] glass-panel p-6">
          <h2 className="display-heading text-4xl text-navy-900">Recent Orders</h2>
          <p className="mt-4 text-sm text-slate-600">
            View your full order history and track deliveries.
          </p>
          <Link to="/orders" className="mt-5 inline-block">
            <Button>View Orders</Button>
          </Link>
        </article>
      </div>
    </section>
  );
}
