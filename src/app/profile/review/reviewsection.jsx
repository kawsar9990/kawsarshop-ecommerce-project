'use client'

import ReviewTable from './reviewTable';
import ReviewCard from './reviewCard';

export default function ReviewSection({ orders }) {

return (
<>
      <ReviewTable orders={orders} />

      <ReviewCard orders={orders} />
</>
  );
}