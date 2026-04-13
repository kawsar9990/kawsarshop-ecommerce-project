import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWishlistAPI, toggleWishlistAPI } from '@/src/services/wishlistServics';


export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async(userId, { rejectWithValue }) => {
    try{
      const data = await getWishlistAPI(userId);
      return data;
    }
    catch(error){
      return rejectWithValue(error);
    }
  }
);


export const toggleWishlistAction = createAsyncThunk(
  'wishlist/toggleWishlist',
  async ({userId, product}, {rejectWithValue}) => {
    try{
      const data = await toggleWishlistAPI(userId, product);
      return data;
    }
    catch(error){
      return rejectWithValue(error);
    }
  }
);


const initialState = {
    wishlistItems: [],
    loading: false,
    error: null,
}



const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
      clearWishlist: (state) => {
            state.wishlistItems = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleWishlistAction.fulfilled, (state, action) => {
        state.wishlistItems = action.payload;
      })
      .addCase(toggleWishlistAction.rejected, (state, action) => {
        state.error = action.payload;
      })
    }
})


export const {clearWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;