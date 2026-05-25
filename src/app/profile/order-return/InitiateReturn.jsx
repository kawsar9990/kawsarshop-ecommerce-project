'use client'

import ReturnInitiateCardView from './ReturnInitiateCardView';
import ReturnInitiateTableView from './ReturnInitiateTableView';

export default function InitiateReturn({ orders, returnHistory = [] }) {

if (orders.length === 0) {
 return <div className="text-center py-10 text-gray-400 text-[10px] md:text-[13px]">No Items Eligible for Return.</div>;
}

return (
<>

<ReturnInitiateTableView 
orders={orders} 
returnHistory={returnHistory} 
/>

<ReturnInitiateCardView 
orders={orders} 
returnHistory={returnHistory}
/>

</>
);
}