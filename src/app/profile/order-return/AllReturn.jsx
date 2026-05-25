'use client'

import ReturnCardView from './ReturnAllCardView';
import ReturnTableView from './ReturnAllTableView';

export default function AllReturn({ returnHistory = [] }) {

if (returnHistory.length === 0) {
 return <div className="text-center py-10 text-gray-400 text-[10px] md:text-[13px]">No orders For Return found in this category.</div>;
}

return (
<>
      <ReturnCardView returnHistory={returnHistory} />

      <ReturnTableView returnHistory={returnHistory} />
</>
  );
}