import classNames from "classnames"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { TabsContext } from "../../App"
import { useMobile } from "../../hooks/useMobile"
import {  RootState } from "../../store/store"
import { Button } from "../Button/Button"
import './style.scss'

interface SidebarProps {
    isOpen: boolean
    setOpen: (val: boolean) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setOpen }) => {
    const managerPhoneNumber = useSelector((state: RootState) => state.manager.contactLink)
    const tabs = useContext(TabsContext)
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const isMobile = useMobile()

    return (
        <aside className={classNames("sidebar", {
            open: isMobile && isOpen
        })}>
            {!isMobile && <h1 className="sidebar__company-name">{t('company_name')}</h1>}

            <ul className="sidebar__list sidebar-list">

                {tabs?.map(t => {
                    const name = t.name.replace('_', ' ')
                    const firstUpper = name.split('')[0].toUpperCase()

                    return (
                        <li className={classNames("sidebar-list__item", {
                            active: pathname === `/${t.name}`
                        })}
                            onClick={() => navigate(`/${t.name}`)}
                            key={t.name}>
                                {firstUpper + name.slice(1)}
                        </li>
                    )
                })}

                {isMobile && 
                    <li className="sidebar-list__item">
                        <Button hollow small asLink href={managerPhoneNumber}>{t('ask_manager')}</Button>
                    </li>
                }
                
                {isMobile && 
                    <div className="sidebar__menu-close" onClick={() => setOpen(false)} style={{cursor: 'pointer'}}>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.58 1L1 17.58" stroke="black" stroke-opacity="0.45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1 1L17.58 17.58" stroke="black" stroke-opacity="0.45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                }
            </ul>
        </aside>
    )
}