import { Segment } from '@/lib/definitions';
import { formatDuration } from '@/lib/utils';
import { format } from 'date-fns';
import { PlaneTakeoffIcon } from 'lucide-react';

type OfferSliceSegmentProps = {
  segment: Segment;
  duration: string;
  origin: string;
  destination: string;
};

export default function OfferSliceSegment({
  segment,
  duration,
  origin,
  destination,
}: OfferSliceSegmentProps) {
  const { airlineLogo, departingAt, arrivingAt } = segment;

  return (
    <div className="flex items-center justify-between">
      <div className="text-muted font-bold grid text-center">
        <span className="text-md">{format(new Date(departingAt), 'dd')}</span>
        <span className="text-s">{format(new Date(departingAt), 'MMM')}</span>
      </div>
      <img src={airlineLogo} className="w-8 h-8 flex-auto" alt="Airline Logo" />
      <div className="flex flex-auto xs:justify-end gap-x-3">
        <div className="grid text-center">
          <span className="font-bold">{format(new Date(departingAt), 'HH:mm')}</span>
          <span className="text-muted">{origin}</span>
        </div>
        <div className="grid items-center justify-items-center">
          <PlaneTakeoffIcon size={18} strokeWidth={1}/>
          <span className="text-xs text-muted">{formatDuration(duration)}</span>
        </div>
        <div className="grid text-center">
          <span className="font-bold">{format(new Date(arrivingAt), 'HH:mm')}</span>
          <span className="text-muted">{destination}</span>
        </div>
      </div>
    </div>
  );
}
