import Logo from '@/components/layouts/Logo';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      <Logo />
      <h2 className="text-5xl font-bold animate-pulse text-gray-900">Loading…</h2>
    </div>
  );
}
