import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {$api, $authApi} from '../utils/api'
import {setToast, ToastTypes} from './toastSlice'
import i18n from '../utils/i18next'

export const checkAuth = createAsyncThunk(
    'auth/check',
    async (data: void, thunkAPI) => {
        let response

        try {
            response = await $authApi.get('/api/user/info').then(response => response.data)

            if (response.status.toString()[0] === '3') {
                return {
                    status: false
                }
            }

            return response
        } catch(e) {
            console.log(e)
        }
        finally {
            thunkAPI.dispatch(setLoading(false))
        }

        return response
    })


export const login = createAsyncThunk(
    'auth/login',
    async (data: {email: string, password: string, rememberMe: boolean}, thunkAPI) => {
        const formData = new FormData()
        formData.append("username", data.email)
        formData.append("password", data.password)
        const errorString = i18n.t('invalid_login_or_password')

        try {
            const response = await $api.post('/login', formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                },
            })
            const responseData = response.data

            if (!responseData.status) {
                thunkAPI.dispatch(setToast({text: errorString, type: ToastTypes.ERROR}))
                return
            }
            
            return responseData
        } catch(e: any) {
            console.log(e.message)
            thunkAPI.dispatch(setToast({text: errorString, type: ToastTypes.ERROR}))
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (data: void, thunkAPI) => {
        try {
            await $authApi.get('/logout')

            thunkAPI.dispatch(setToast({text: i18n.t('you_logged_out'), type: ToastTypes.SUCCESS}))
            window.location.href = '/logout'
        } catch (e) {
            thunkAPI.dispatch(setToast({text: i18n.t('something_went_wrong'), type: ToastTypes.ERROR}))
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (data: {email: string, password: string}, thunkAPI) => {
        try {
            const response = await $api.post('/api/auth/sing-up', {email: data.email, password: data.password})
            const responseData = response.data

            if (responseData.status) {
                const registerSuccess = i18n.t('register_success')
                thunkAPI.dispatch(setToast({text: registerSuccess, type: ToastTypes.SUCCESS}))
            }
            else {
                thunkAPI.dispatch(setToast({text: i18n.t(responseData.message), type: ToastTypes.ERROR}))
                return
            }

            return responseData
        } catch(e) {
            console.log(e)
            const somethingWentWrong = i18n.t('something_went_wrong')
            thunkAPI.dispatch(setToast({text: somethingWentWrong, type: ToastTypes.ERROR}))
        }

    }
)

const initialState = {
    authorized: false,
    isLoading: true,
    authSuccess: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state) {
            state.authorized = true
        },
        signOut(state) {
            state.authorized = false
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setSuccess(state, action: PayloadAction<boolean>) {
            state.authSuccess = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action?.payload?.status) {
                state.authorized = true
                state.authSuccess = true
            }
            else {
                state.authorized = false
            }
        })

        builder.addCase(register.fulfilled, (state, action) => {

        })

        builder.addCase(checkAuth.fulfilled, (state, action) => {
            if (action?.payload?.status) {
                state.authorized = true
            }
            else {
                state.authorized = false
            }
        })

        builder.addCase(logout.fulfilled, (state, action) => {
            state.authorized = false
        })
    }
})

export const { signOut, setLoading, setSuccess } = authSlice.actions

export default authSlice.reducer
