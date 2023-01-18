import { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import { RootState } from "../../store/store"
import { resetToast } from "../../store/toastSlice"

export const Toast: React.FC = () => {
    const { text, type } = useSelector((state: RootState) => state.toast)
    const dispatch = useDispatch()
    const hideToast = useCallback(() => {
        dispatch(resetToast())
    }, [dispatch])

    useEffect(() => {
        if (text && type) {
            toast[type](text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: hideToast
            })
        }
    }, [text, type, hideToast])

    return (
        <ToastContainer toastStyle={{fontSize: 16}} />
    )
}