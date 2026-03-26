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
              position: 'relative',
              overflow: 'hidden', 
            }}
          >

            <Box 
              sx={{ 
                p: hasBorder ? 2 : 0,
                maxHeight: hasBorder && !isExpanded ? '250px' : '2000px',
                transition: 'max-height 0.5s ease-in-out', 
                overflow: 'hidden',
              }}
            >
              {children}

              {hasBorder && !isExpanded && (
                <Box sx={{
                  position: 'absolute', bottom: '20px', left: 0, width: '100%', height: '90px',
                  background: 'linear-gradient(transparent, #fff)', pointerEvents: 'none'
                }} />
              )}
            </Box>

            {hasBorder && (
              <Box sx={{ 
                display: 'flex', justifyContent: 'center', pb: 0, 
                borderTop: !isExpanded ? 'none' : '1px solid #f0f0f0',
                bgcolor: '#fff' 
              }}>
                <Button 
                  onClick={() => setIsExpanded(!isExpanded)} 
                  sx={{ 
                    textTransform: 'none', fontWeight: 'bold', color: '#E2136E',
                    '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                  }}
                >
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
        <div>
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
    )
}