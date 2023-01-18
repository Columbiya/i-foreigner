import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $authApi } from "../utils/api";

// interface ITab {
//     name: string
//     uploadDate: Date
//     url: string
// }

const initialState = {
    tabs: [] as String[]
}

export const getTabs = createAsyncThunk(
    "/tabs/get",
    async (data: void, thunkAPI) => {
        try {
            const responseData = await $authApi.get('/api/user/tabs').then(response => response.data)
            if (responseData.status) {
                return responseData.body
            }
        } catch(e) {
            console.log(e)
        } finally {
            
        }
    }
)

const tabsSlice = createSlice({
    name: "tabs",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getTabs.fulfilled, (state, action: PayloadAction<String[]>) => {
            state.tabs = action.payload
        })
    }
})

export default tabsSlice.reducer