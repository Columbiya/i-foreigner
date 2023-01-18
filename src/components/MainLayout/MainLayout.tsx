import { useState } from 'react'
import { Header } from "../Header/Header"
import { Sidebar } from "../Sidebar/Sidebar"
import './style.scss'

interface MainLayoutProps {
    children?: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [menuOpen, setOpen] = useState(false)

    return (
        <main className="main">
            <Sidebar isOpen={menuOpen} setOpen={setOpen} />
            <div className="main__right">
                <Header setOpenMenu={setOpen} />  
                <div className="main__content">
                    {children}
                </div>
            </div>
        </main>
    )
}