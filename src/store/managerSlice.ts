import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $authApi } from "../utils/api";

interface Manager {
    managerName: string
    contactLink: string 
}

const initialState = {
    name: "",
    contactLink: ""
}

export const getManagerThunk = createAsyncThunk(
    "manager/get",
    async (data: void, thunkAPI) => {
        const responseData = await $authApi.get('/api/manager/info').then(response => response.data)
        return responseData
    }
)

const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
        setManager(state, action: PayloadAction<Manager>) {
            state.name = action.payload.managerName
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getManagerThunk.fulfilled, (state, action: PayloadAction<Manager>) => {
            state.name = action.payload.managerName
            state.contactLink = action.payload.contactLink
        })
    }
})

export const { setManager } = managerSlice.actions

export default managerSlice.reducer