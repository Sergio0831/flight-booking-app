import { Loader2Icon } from 'lucide-react';

/**
 * Loader component for displaying a loading spinner.
 */
export default function Loader() {
  return (
    <div className="grid place-items-center">
      <Loader2Icon size={56} strokeWidth={3} className="animate-spin" />
    </div>
  );
}
