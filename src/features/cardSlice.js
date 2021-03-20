import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { data: [],status:'idle',error:'' };
export const fetchCards = createAsyncThunk(
  "cards/getByName",
  async ({name,page}) => {
     return(
         await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${name}*&pageSize=21&page=${page}`,{headers:{'x-api-key':'9e9e71da-2b5d-4724-a33c-aa389c9c30d1'}})
         .then(response=>response.json())
         .catch(error=>error.message)
     )
  }
);


const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers:{
      [fetchCards.pending]:(state,action)=>{
        state.status='loading';
        state.error='';
        state.data=[]

      },
      [fetchCards.rejected]:(state,action)=>{
        state.status='idle';
        state.error=action.payload;
        state.data=[]
      },
      [fetchCards.fulfilled]:(state,action)=>{
        state.status='loaded';
        state.error='';
        state.data=action.payload
      }
  }
});

export default cardSlice.reducer;
