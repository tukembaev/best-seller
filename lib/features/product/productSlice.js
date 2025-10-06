import { createSlice } from '@reduxjs/toolkit'
import { productDummyData } from '@/assets/assets'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: [],
          selectedBrands: [],
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
        },
        clearProduct: (state) => {
            state.list = []
        },
        setCategory: (state, action) => {
          if (state.selectedBrands?.includes(action.payload)) {
        state.selectedBrands = state.selectedBrands.filter(
          (category) => category !== action.payload
        );
      } else {
        state.selectedBrands.push(action.payload);
      }
        },
        clearCategory: (state) => {
         state.selectedCategory = null;
    },
        
    }
})

export const { setProduct, clearProduct,setCategory,clearCategory } = productSlice.actions

export default productSlice.reducer