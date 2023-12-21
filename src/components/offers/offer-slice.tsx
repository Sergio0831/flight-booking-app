import { Slice } from '@/lib/definitions';
import OfferSliceSegment from './OfferSliceSegment';

type OfferSliceProps = {
  slice: Slice;
};

export default function OfferSlice({ slice }: OfferSliceProps) {
  const { destination, duration, origin, segments } = slice;

  return (
    <>
      {segments.map((segment) => (
        <OfferSliceSegment
          key={segment.segmentId}
          segment={segment}
          destination={destination}
          duration={duration}
          origin={origin}
        />
      ))}
    </>
  );
}
