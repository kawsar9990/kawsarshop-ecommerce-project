'use client'

import notify from '@/src/utils/toast';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createOrderAPI } from '@/src/services/ordersServics';
import { useAuth } from '@/src/context/AuthContext';
import { syncCartAPI } from '@/src/services/cartServices';
import { clearCart } from '@/src/redux/slices/cartSlice';
import { useLoader } from '@/src/context/ItemLoaderContext';


export default function ShippingConfram({ agreed, selectedMethod, addresses, shippingMethod }){
const router = useRouter();
const dispatch = useDispatch();
const { user, token } = useAuth();
const { cartItems, totalAmount } = useSelector((state) => state.cart);
const [loading, setLoading] = useState(false);
const {showLoader, hideLoader} = useLoader();


const isPaymentSelected = ['cashin', 'paypal', 'crd', 'bkash', 'nagad', 'rocket'].includes(selectedMethod);
const isButtonActive = agreed && isPaymentSelected && !loading;

const handleOrderClick = async () => {
    if (!agreed) {
      notify.warning("Please agree Custom and duties Conditions");
      return;
    };

    if (!addresses || addresses.length === 0) {
      notify.error("Please select shipping address");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      notify.error("Your cart is empty!");
      return;
    }

   if (selectedMethod !== 'cashin') {
      notify.warning("API not working at the moment.");
      return;
    } 

    showLoader()
    setLoading(true);
   try{
      const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
      const shippingPrice = shippingMethod.price || 13;
      const totalDeliveryCharge = cartItems.reduce((acc, item) => {
        return acc + shippingPrice * item.quantity;
      }, 0)
      const shippingThreshold = 5000;
      const finalShippingPrice = totalAmount >= shippingThreshold ? 0 : totalDeliveryCharge;
      const grandTotal = totalAmount + finalShippingPrice;

      const orderData = {
        userId: user?.id || user?._id,

        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity || 1,
          image: item.image,
          price: item.price,
          oldprice: item.oldprice || 0,
          discountPercent: item.discountPercent,
          product: item._id,
          stock: item.stock,
          slug: item.slug,
          sku: item.sku,
          category: item.category,
          subCategory: item.subCategory || null,
          size: item.selectedSize ? [item.selectedSize] : (item.size || []), 
          catetitle: item.catetitle,
          title: item.title,
        })),

        shippingAddress: {
          name: defaultAddress.fullName,
          phone: defaultAddress.phone,
          state: defaultAddress.state,
          city: defaultAddress.city,
          country: defaultAddress.country,
          address: `${defaultAddress.houseNo}, ${defaultAddress.street}`,
          addressType: defaultAddress.addressType
        },
        
        paymentMethod: selectedMethod === 'cashin' ? 'Cash on Delivery' : selectedMethod,
        itemsPrice: totalAmount,
        taxPrice: 0,
        shippingMethodName: shippingMethod?.title,
        shippingPrice: finalShippingPrice,
        totalAmount: grandTotal
      };
      const response = await createOrderAPI(orderData, token);
      if(response.success){
        notify.success("Order placed successfully!");

        dispatch(clearCart())

        const userId = user?._id || user?.id;
        if (userId){
          try{
            await syncCartAPI(userId, []);
          }catch(syncErr){
            console.error("Cart sync failed after order", syncErr);
          }
        }
        router.push(`/order-confirmation/${response.orderId}`);
      } else{
        notify.error(response.message || "Order failed!");
      }
   }
   catch(error){
    notify.error(error.message || "Something went wrong!");
   }
   finally{
    hideLoader();
    setLoading(false);
   }
};


const getButtonText = () =>{
if (loading) return "Processing...";
const shippingPrice = shippingMethod?.price || 13;
const totalDeliveryCharge = cartItems.reduce((acc, item) => {
  return acc + shippingPrice * item.quantity;
}, 0)
const finalShipping = totalAmount >= 5000 ? 0 : totalDeliveryCharge;
const grandTotal = totalAmount + finalShipping;
const formattedPrice = `$${grandTotal.toLocaleString()}`;
    switch (selectedMethod) {
       case 'cashin':
        return `Continue to Pay  ${formattedPrice}`; 
       case 'paypal':
       return `Pay with PayPal  ${formattedPrice}`;
       case 'crd':
       return `Pay with Card ${formattedPrice}`;
       case 'bkash':
       return `Pay with Bkash ${formattedPrice}`;
       case 'nagad':
       return `Pay with Nagad ${formattedPrice}`;
       case 'rocket':
       return `Pay with Rocket ${formattedPrice}`;
       default:
       return `No Payment Method Selected`;
    }
}



return(
<div className='mt-7 px-2 py-3 w-full'>

<div className='flex justify-center w-full items-center'>

<button onClick={handleOrderClick} disabled={!isButtonActive}
 className={`w-full px-3 py-3 rounded-md text-white font-bold transition-all flex justify-center items-center text-center 
${isButtonActive ? 'bg-yellow-400 hover:bg-yellow-500 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}>
    {getButtonText()}
</button>

</div>


</div>
)
}