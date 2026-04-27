import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCartAPI } from '@/src/services/cartServices';


export const fetchCartFromServer = createAsyncThunk(
  'cart/fetchCart',
  async (userId, {rejectWithValue}) => {
    try{
      const data = await getCartAPI(userId);
      return data;  
    }catch(error){
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
 cartItems: [],
 totalQuantity: 0,
 subtotal: 0,
 discount: 0,
 totalSavings: 0,
 appliedVoucher: null,
 voucherDetails: null,
 cashback: 0,
 totalAmount: 0,
 loading: false,
}

const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
    addToCart: (state, action) => {
     const newItem = action.payload;
     const existingItem = state.cartItems.find(item => item._id === newItem._id);

     if(existingItem){
      const totalNewQty = existingItem.quantity + (newItem.quantity || 1);
       if(totalNewQty <= existingItem.stock) {
            existingItem.quantity = totalNewQty;
        }else{
          existingItem.quantity = existingItem.stock;
        }
     }else{
        state.cartItems.push({
            ...newItem,
            quantity: newItem.quantity || 1,
            selected: true
         });
        }
     cartSlice.caseReducers.calculateTotals(state)
    },

    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(i => i._id === action.payload);
      if(item && item.quantity < item.stock){
          item.quantity++;
          cartSlice.caseReducers.calculateTotals(state);
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(i => i._id === action.payload);
      if (item && item.quantity > 1) {
      item.quantity--;  
      cartSlice.caseReducers.calculateTotals(state);
      }
     },

     toggleSelectItem: (state, action) => {
        const item = state.cartItems.find(i => i._id === action.payload);
        if(item){
          item.selected = !item.selected;
          cartSlice.caseReducers.calculateTotals(state); 
        }
     },
     applyVoucher: (state, action) => {
       const voucher = action.payload; 
     
       if (voucher) {
         state.appliedVoucher = voucher.code;
         state.voucherDetails = { value: voucher.value, type: voucher.type };
       }
       cartSlice.caseReducers.calculateTotals(state);
     },

     removeVoucher: (state) => {
      state.appliedVoucher = null;
      state.voucherDetails = null;
      state.discount = 0;
      cartSlice.caseReducers.calculateTotals(state);
     },

     setDeliveryCharge: (state, action) => {
        state.deliveryCharge = action.payload;
        cartSlice.caseReducers.calculateTotals(state)
     },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    clearCart: (state) => {
      return initialState;
    },

    calculateTotals: (state) => {
      let sub = 0;
      let qty = 0;
      let savings = 0;

      state.cartItems.forEach(item => {
        qty += item.quantity;
        if(item.selected){
            sub += item.price * item.quantity;
            if(item.oldprice && item.oldprice > item.price){
              savings += (item.oldprice - item.price) * item.quantity;
            }
        }
      });
      state.subtotal = sub;
      state.totalQuantity = qty;
      state.totalSavings = savings;


      if(state.voucherDetails){
        const { value, type } = state.voucherDetails;
        state.discount = type === "percentage" 
          ? (sub * value) / 100 
          : value;
      } else{
        state.discount = 0;
      }

      const cashbackRules = [
        { minAmount: 180000, reward: 700 },
        { minAmount: 140000, reward: 650 },
        { minAmount: 100000, reward: 500 },
        { minAmount: 80000, reward: 400 },
        { minAmount: 60000, reward: 300 },
        { minAmount: 40000,  reward: 250 },
        { minAmount: 20000,  reward: 120 },
        { minAmount: 15000,  reward: 110 },
        { minAmount: 10000,  reward: 90 },
        { minAmount: 5000,  reward: 60 },
        { minAmount: 2000,  reward: 40 },
        { minAmount: 1000,  reward: 30 },
        { minAmount: 500,  reward: 20 },
        { minAmount: 300,  reward: 15 },
        { minAmount: 100,  reward: 10 },
      ];


      const applicableRule = cashbackRules
      .slice()
      .sort((a,b) => b.minAmount - a.minAmount)
      .find(rule => sub >= rule.minAmount);

      state.cashback = applicableRule ? applicableRule.reward : 0;

     if (sub === 0) {
        state.discount = 0;
        state.cashback = 0;
        state.appliedVoucher = null;
        state.voucherDetails = null;
      }

      if (state.appliedVoucher){
        state.cashback = 0;
      }else{
        state.cashback = applicableRule ? applicableRule.reward : 0;
      }

      state.totalAmount = sub - state.discount - state.cashback;
    },
},

extraReducers: (builder) => {
  builder
  .addCase(fetchCartFromServer.fulfilled, (state, action) => {
    state.loading = false;
    
    const payloadData = action.payload || {};
    state.cartItems = Array.isArray(payloadData) ? payloadData : (payloadData.items || []);

    if (payloadData.appliedVoucher){
      state.appliedVoucher = payloadData.appliedVoucher;
      state.voucherDetails = {
        value: payloadData.voucherValue || 0,
        type: payloadData.voucherType || "percentage",
      };
    }else{
      state.appliedVoucher = null;
      state.voucherDetails = null;
      state.discount = 0;
    }
    cartSlice.caseReducers.calculateTotals(state);
  })
  .addCase(fetchCartFromServer.pending, (state) => {
    state.loading = true;
  })
  .addCase(fetchCartFromServer.rejected, (state) => {
    state.loading = false;
  });
}

});

export const {
    addToCart, incrementQuantity, decrementQuantity,
    removeFromCart, clearCart, toggleSelectItem,
    removeVoucher, applyVoucher
} = cartSlice.actions

export default cartSlice.reducer;