export default function ContentPage({ title, subtitle }) {
  return (
    <section className="rounded-[30px] glass-panel p-10 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Glow Skin</p>
      <h1 className="display-heading mt-3 text-5xl text-navy-900 md:text-6xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600">{subtitle}</p>
    </section>
  );
}
