import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $authApi } from "../utils/api";
import { setToast, ToastTypes } from "./toastSlice";
import i18n from '../utils/i18next'

interface IDocument {
    id: string
    name: string
    uploadDate: string
    url: string
}

const initialState = {
    documents: [] as IDocument[]
}

export const getDocuments = createAsyncThunk(
    "/api/documents/get-all",
    async (data: void, thunkAPI) => {
        try {
            const responseData = await $authApi.get('/api/documents/prepared').then(response => response.data)

            if (!responseData.status) {
                thunkAPI.dispatch(setToast({text: i18n.t(responseData.message), type: ToastTypes.ERROR}))

                return
            }

            return responseData.body

        } catch(e) {
            console.log(e)
        } finally {

        }
    }
)

const documentsSlice = createSlice({
    name: "documents",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getDocuments.fulfilled, (state, action: PayloadAction<IDocument[]>) => {
            state.documents = action.payload
        })
    }
})

export default documentsSlice.reducer