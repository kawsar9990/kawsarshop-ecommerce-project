'use client'

import TrackingTavleView from './ReturnTrackingTableView';
import TrackingCardView from './ReturnTrackingCardView';

export default function Track({ returnHistory = [] }) {

if (returnHistory.length === 0) {
 return <div className="text-center py-10 text-gray-400 text-[10px] md:text-[13px]">No Items to track</div>;
}

return (
<>
      <TrackingTavleView returnHistory={returnHistory} />

      <TrackingCardView returnHistory={returnHistory} />
</>
  );
}