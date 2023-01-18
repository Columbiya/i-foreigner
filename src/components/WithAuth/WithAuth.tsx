import { useEffect } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {RootState } from "../../store/store"
import { ROUTES } from "../../utils/routes"

interface WithAuthProps {
    children: React.ReactNode
}

export const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
    const authorized = useSelector((state: RootState) => state.auth.authorized)
    const isLoading = useSelector((state: RootState) => state.auth.isLoading)
    const navigate = useNavigate()

    useEffect(() => {
        if (!authorized && !isLoading) {
            navigate(ROUTES.LOGIN)
        }
    }, [authorized, navigate, isLoading])

    return (
        <>
            {children}
        </>
    )
}