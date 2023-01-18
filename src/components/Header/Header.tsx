import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useMobile } from "../../hooks/useMobile"
import { RootState } from "../../store/store"
import { Button } from "../Button/Button"
import { Dropdown } from "../Dropdown/Dropdown"
import './style.scss'

interface HeaderProps {
    setOpenMenu: (val: boolean) => void
}

export const Header: React.FC<HeaderProps> = ({ setOpenMenu }) => {
    const managerPhoneNumber = useSelector((state: RootState) => state.manager.contactLink)
    const { t } = useTranslation()
    const isMobile = useMobile()

    return (
        <header className="header">
            <div className="container-main">
                <div className="header__inner">
                    <div className="header__right">
                        {!isMobile ? 
                            <Button small hollow asLink href={managerPhoneNumber}>{t('ask_manager')}</Button>:
                            <>
                                <BurgerMenuIcon onClick={() => setOpenMenu(true)} />
                                <h2 className="header__status">{t('company_name')}</h2>
                            </>
                        }
                        <div className="header__status">
                            <span className="header__bell">
                                <BellIcon /> 
                            </span>
                            <span>{t('status_of_your_case')}</span>
                        </div>
                        <Dropdown Icon={UserIcon}>Alexander</Dropdown>
                    </div>
                </div>
            </div>
        </header>
    )
}

const BellIcon: React.FC = () => {
    return (
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.693 5.80085C14.693 4.52759 14.1354 3.30647 13.1428 2.40614C12.1502 1.5058 10.8039 1 9.40018 1C7.99643 1 6.65018 1.5058 5.65758 2.40614C4.66499 3.30647 4.10735 4.52759 4.10735 5.80085C4.10735 11.4018 1.46094 13.0021 1.46094 13.0021H17.3394C17.3394 13.0021 14.693 11.4018 14.693 5.80085Z" stroke="black" strokeOpacity="0.53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.9272 16.2026C10.7721 16.4451 10.5495 16.6464 10.2817 16.7864C10.0138 16.9263 9.71018 16.9999 9.4011 16.9999C9.09202 16.9999 8.78836 16.9263 8.52052 16.7864C8.25269 16.6464 8.03009 16.4451 7.875 16.2026" stroke="black" strokeOpacity="0.53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

const UserIcon: React.FC = () => {
    return (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1161 15.625V14C14.1161 13.138 13.7763 12.3114 13.1714 11.7019C12.5666 11.0924 11.7462 10.75 10.8908 10.75H4.44016C3.58475 10.75 2.76438 11.0924 2.15952 11.7019C1.55465 12.3114 1.21484 13.138 1.21484 14V15.625" stroke="black" strokeOpacity="0.54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.66477 7.5C9.44606 7.5 10.8901 6.04493 10.8901 4.25C10.8901 2.45507 9.44606 1 7.66477 1C5.88348 1 4.43945 2.45507 4.43945 4.25C4.43945 6.04493 5.88348 7.5 7.66477 7.5Z" stroke="black" strokeOpacity="0.54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

interface BurgerMenuIconProps {
    onClick?: () => void
}

const BurgerMenuIcon: React.FC<BurgerMenuIconProps> = ({ onClick }) => {
    return (
        <svg width="27" height="19" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}} onClick={onClick}>
            <path d="M1.5 9.36026H25.08" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.5 1.5H25.08" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.5 17.2198H25.08" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}