'use client'

import * as React from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import Description from './Description';
import Specifications from './Specifications';
import CustomerReview from './CustomerReview';




function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function CustomTabPanel(props) {
  const { children, value, index, hasBorder, isEmpty, ...other } = props;
  const [isExpanded, setIsExpanded] = React.useState(false);


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
  {value === index && (
  <Box sx={{ py: 3 }}>
    {isEmpty ? (
      <Box sx={{ textAlign: 'center', color: 'gray', py: 1 }}>
        Not Found
      </Box>
    ) : (
      <Box 
      sx={{ 
      border: hasBorder ? '1px solid #E2136E' : 'none', 
      borderRadius: '8px',
      overflow: 'hidden', 
    }}
  >
   <Box 
     sx={{ 
       p: hasBorder ? 2 : 0,
       maxHeight: hasBorder && !isExpanded ? '250px' : '2000px',
       transition: 'max-height 0.5s ease-in-out', 
       position: 'relative',
       overflow: 'hidden',
   }}
>
{children}
{hasBorder && !isExpanded && (
  <Box sx={{
    position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80px',
    background: 'linear-gradient(transparent, #fff)', pointerEvents: 'none'}} />
)}
  </Box>
  {hasBorder && (
   <Box sx={{ 
     display: 'flex', justifyContent: 'center', borderTop: '1px solid #f0f0f0' }} >
         <Button 
           onClick={() => setIsExpanded(!isExpanded)} 
            sx={{ textTransform: 'none', color: '#E2136E', fontWeight: 'bold' }}>
           {isExpanded ? "See Less" : "See More"}
         </Button>
        </Box>
     )}
   </Box>
    )}
  </Box>
  )}
  </div>
  );
}



export default function TabsBox({ product }){
    
const [value, setValue] = React.useState(0);
const [reviewsData] = React.useState([{id:1}, {id:2}]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
   
 const descriptionData = product.description; 

  const tabData = [
    { 
      label: "Description", 
      component: <Description description={product.description} review={product.review}/> ,
      hasBorder: true,
      isEmpty: !descriptionData
    },
    { 
      label: "Specifications", 
      component: <Specifications/> ,
      hasBorder: true,
    },
    { 
      label: `Customer Review (${reviewsData.length})`, 
      component: <CustomerReview  product={product}/> ,
      isEmpty: reviewsData.length === 0
    },
  ];
    
    
return(
<div className="w-full mt-10 md:px-4 lg:px-0">


<div className="hidden lg:block">

<Box sx={{ width: '100%' }}>
<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs 
    value={value} 
    onChange={handleChange} 
    aria-label="product detail tabs"
    textColor="primary"
    indicatorColor="primary"
  >
    {tabData.map((tab, index) => (
      <Tab 
        key={index} 
        label={tab.label} 
        sx={{ fontWeight: '600', textTransform: 'none' }}
        {...a11yProps(index)} 
      />
    ))}
  </Tabs>
</Box>


  {tabData.map((tab, index) => (
    <CustomTabPanel key={index} value={value} index={index} isEmpty={tab.isEmpty} hasBorder={tab.hasBorder}>
      {tab.component}
    </CustomTabPanel>
))}
</Box>
</div>

<div className="flex flex-col gap-10 lg:hidden">
{tabData.map((tab, index) => (
<div key={index} className="flex flex-col gap-4">
<div className="flex items-center gap-2">
   <div className="h-6 w-1 bg-[#E2136E] rounded-full"></div>
   <h3 className="text-lg font-bold uppercase tracking-wide text-gray-800">
    {tab.label}
  </h3>
</div>
<div className={`w-full ${tab.hasBorder ? "border border-gray-200 rounded-xl p-4 shadow-sm bg-white" : ""}`}>
  {tab.isEmpty ? (
    <p className="text-center text-gray-400 py-4 italic">No Information Available</p>
  ) : (
    <div className="overflow-hidden">
       {tab.component}
    </div>
  )}
</div>
</div>
))}
</div>

</div>
    )
}