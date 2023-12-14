import { ModeToggle } from '../mode-toggle';

export default function Header() {
  return (
    <header className="flex justify-between">
      <h1 className="font-bold text-xl tracking-wide pb-6">SkyFlight</h1>
      <ModeToggle />
    </header>
  );
}
