import classNames from 'classnames'
import { useState, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useClickOutside } from '../../hooks/useClickOutside'
import { logout } from '../../store/authSlice'
import { AppDispatch } from '../../store/store'
import { Divider } from '../Divider/Divider'
import './style.scss'

interface DropdownProps {
    children: React.ReactNode
    Icon: React.FC,

}

export const Dropdown: React.FC<DropdownProps> = ({ Icon, children }) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch<AppDispatch>()
    const onClickOutside = useCallback(() => {
        setOpen(false)
    }, [])
    const signOutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])
    useClickOutside(ref, onClickOutside)

    return (
        <div className={classNames("dropdown", {
            open: open
        })}
            ref={ref}
            onClick={() => setOpen(val => !val)}
        >
            <Icon />
            <span className="dropdown__text">{children}</span>
            
            {open && 
                <div className="dropdown__inner">
                    <span className="dropdown__content no-margin">Alexander</span>

                    <Divider />

                    <span className="dropdown__content">My profile</span>
                    <span className="dropdown__content">Account settings</span>
                    <span className="dropdown__content">Referral program</span>

                    <Divider />

                    <span className="dropdown__content no-margin" onClick={signOutHandler}>Sign out</span>
                </div>
            }
        </div>
    )
}