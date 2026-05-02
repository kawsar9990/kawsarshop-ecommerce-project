'use client'

import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AllOrders from './AllOrder';

export default function TabSlider({ orders = [] }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterOrders = (status) => {
    if (status === 'All') return orders;
    return orders.filter(order => order.status.toLowerCase() === status.toLowerCase());
  };

  const tabs = [
    { label: "All", status: "All" },
    { label: "To Pay", status: "Unpaid" },
    { label: "Pending", status: "Pending" },
    { label: "Confirmed", status: "Confirmed" },
    { label: "To Ship", status: "Processing" },
    { label: "Shipped", status: "Shipped" },
    { label: "Out For Delivery", status: "Out For Delivery" },
    { label: "Delivered", status: "Delivered" },
  ];

return (
<Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '8px', overflow: 'hidden' }}>
<Tabs
value={value}
onChange={handleChange}
variant="scrollable"
scrollButtons="auto"
allowScrollButtonsMobile
sx={{
  borderBottom: 1,
  borderColor: 'divider',
  '& .MuiTabs-indicator': { backgroundColor: '#E2136E', height: '3px' },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: { xs: '12px', md: '13px' },
    color: '#666',
    minWidth: 'auto',
    padding: '12px 16px',
    '&.Mui-selected': { color: '#E2136E' },
  },
}}>
{tabs.map((tab, idx) => (
<MuiTab key={idx} label={tab.label} />
))}
</Tabs>

<Box sx={{ py: 3 }}>
<AllOrders orders={filterOrders(tabs[value].status)} />
</Box>
</Box>
  );
}