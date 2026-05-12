'use client'

import CancelOrderTable from './CancelTableView';
import CancelCardView from './CancelCardView';

export default function CancelOrder({ orders }) {

return (
<>
      <CancelOrderTable orders={orders} />

      <CancelCardView orders={orders} />
</>
  );
}