import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ToastTypes {
    SUCCESS = 'success',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info'
}

interface Toast {
    text: string
    type: ToastTypes | null
}

const initialState: Toast = {
    text: "",
    type: null
} 

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        setToast(state, action: PayloadAction<Toast>) {
            state.text = action.payload.text
            state.type = action.payload.type
        },
        resetToast(state) {
            state.text = ""
            state.type = null
        }
    }
})

export const { setToast, resetToast } = toastSlice.actions

export default toastSlice.reducer