import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// ✅ Safe localStorage read
let savedPastes = [];
try {
  const stored = localStorage.getItem("pastes");
  if (stored) savedPastes = JSON.parse(stored);
} catch (err) {
  console.error("Invalid data in localStorage. Resetting...");
  localStorage.removeItem("pastes");
}

const initialState = {
  pastes: savedPastes,
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);

      
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      toast("Paste Created Successfully !!");
    },
    updateToPastes: (state, action) => { 
      const paste = action.payload;
      const inidex = state.pastes.findIndex((item) => 
        item._id === paste._id);
      if(index >= 0)
      {
        state.pastes[index] = paste;
        localStorage.setItem("pastes" , JSON.stringify(state.pastes));
        toast.success("Paste updated !!");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];
      localStorage.removeItem("pastes");
      toast.success("Reset Successfully !!")

    },
    removeToPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index =state.pastes.findIndex((item) =>
        item._id === pasteId);
      
      if(index >=0)
      {
        state.pastes.splice(index,1);
        localStorage.setItem ("pastes",JSON.stringify(state.pastes));

        toast.success("Paste Deleted !!");
      }
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeToPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;

