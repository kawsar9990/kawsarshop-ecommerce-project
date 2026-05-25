'use client'

import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useAuth } from '@/src/context/AuthContext';
import { getUserReturnsHistoryAPI } from '@/src/services/returnServics';

import InitiateReturn from './InitiateReturn';
import AllReturn from './AllReturn';
import Track from './TrackingReturn';


export default function TabSlider({ orders = [] }) {
  const [value, setValue] = useState(0);
  const { token } = useAuth();
  const [returnHistory, setReturnHistory] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchReturnHistory = async () => {
    if (!token || token === 'null' || token === 'undefined') return;
    try{
      const res = await getUserReturnsHistoryAPI(token);
      if (res && res.success){
        setReturnHistory(res.returns || []);
      }
    }catch(err){
      console.error("Return history fetch error:", err.message);
    }
  }


  useEffect(() =>{
    if (token){
      fetchReturnHistory();
    }
  },[token])

const safeOrders = Array.isArray(orders) ? orders : [];
const deliveredAndValidOrders = safeOrders.filter(order => order.orderStatus === 'Delivered');
const safeReturnHistory = Array.isArray(returnHistory) ? returnHistory : [];


const totalDeliverdItemsCount = deliveredAndValidOrders.reduce((sum, order) => {
  const items = order.orderItems || order.itemsToReturn || [];
  return sum + items.length;
}, 0)


const tabs = [
{ label: "All Return", count: safeReturnHistory.length},
{ label: "Initiate Return", count: totalDeliverdItemsCount},
{ label: "Track Return", count: safeReturnHistory.length},
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
<MuiTab key={idx} 
label={tab.count > 0 ? `${tab.label} (${tab.count})` : tab.label} />
))}
</Tabs>

<Box sx={{ py: 3 }}>


{value === 0 && (
  <AllReturn 
    returnHistory={safeReturnHistory}
  />
)}


{value === 1 && (
  <InitiateReturn 
    orders={deliveredAndValidOrders} 
    token={token} 
    refreshHistory={fetchReturnHistory} 
    returnHistory={safeReturnHistory}
  />
)}


{value === 2 && (
  <Track 
    returnHistory={safeReturnHistory}
  />
)}

</Box>
</Box>
  );
}