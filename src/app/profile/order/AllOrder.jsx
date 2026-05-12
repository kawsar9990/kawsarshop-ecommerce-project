'use client'

import OrderTableView from './OrderTableView';
import OrderCardView from './OrderCardView';

export default function AllOrders({ orders }) {

return (
<>
      <OrderTableView orders={orders} />

      <OrderCardView orders={orders} />
</>
  );
}