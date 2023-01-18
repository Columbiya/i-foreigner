import {useCallback, useEffect, useState} from 'react'
import classNames from 'classnames'
import {UseFormRegister} from 'react-hook-form/dist/types'
import passwordHide from '../../assets/auth/password-hide.svg'
import passwordShow from '../../assets/auth/password-show.svg'
import {ErrorNotification} from '../common/ErrorNotification/ErrorNotification'
import './style.scss'
import {useTranslation} from 'react-i18next'

interface InputProps {
    type?: "email" | "password" | "checkbox" | "select" | "radio" | "text"
    label?: string | React.ReactNode
    hint?: string
    placeholder?: string
    isRequired?: boolean
    validate?: any
    register: UseFormRegister<any>
    name: string
    withTracking?: boolean
    trackingErrors?: any
    errors: any
    showButton?: boolean
    capsNotify?: boolean
    hidePassword?: () => void
}

export const Input: React.FC<InputProps> = (props) => {
    const { type = "text", label, 
            placeholder, hint, validate, 
            register, name, isRequired, 
            errors, withTracking, trackingErrors, 
            showButton, hidePassword, capsNotify } = props

    const [isCapsOn, setCapsOn] = useState<boolean>()
    const { t } = useTranslation()
    
    const onCapslockChange = useCallback((e: KeyboardEvent) => {
        if(e.code === "CapsLock"){
            let isCapsLockOn = e.getModifierState("CapsLock");
            
            setCapsOn(isCapsLockOn)
        }
    }, [setCapsOn])

    useEffect(() => {
        document.addEventListener('keyup', onCapslockChange)

        return () => {
            document.removeEventListener('keyup', onCapslockChange)
        }
    }, [capsNotify])

    return (
        <div className={classNames("input", {
            checkbox: type === "checkbox" || type === "radio" ,
            "with-tracking": withTracking,
            errored: errors
        })}>
            {type !== "checkbox" && type !== "radio" ?
                <>

                    <div className="input__label"> 
                        <span>{label}</span> 
                        {hint && <span className="input__hint"> ({hint})</span>}
                        {showButton && 
                            <span className="input__show" onClick={hidePassword}>
                                {t('show')}
                                <img src={type === "text" ? passwordHide: passwordShow} width={25} alt="eye" />
                            </span>
                        }
                    </div>
                    <div className="input__container">
                        <input type={type} placeholder={placeholder} {...register(name, {required: isRequired, validate: validate})} />
                        
                        {capsNotify && isCapsOn &&
                            <span>{t('caps_lock_on')}</span>
                        }
                    </div>

                    {withTracking && 
                        <ul className="input__tracking tracking">
                            {Object.keys(trackingErrors).map(item =>(
                                <li 
                                    key={item} 
                                    className={classNames("tracking__item", {
                                        active: trackingErrors[item]
                                    })}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    }
                </>
                : 
                <>
                    <input type={type} id={hint} {...register(name, {required: isRequired, validate})} />
                    <label className="input__descr" htmlFor={hint} >{hint}</label>
                </>
            }

            {errors && errors.type && 
                <ErrorNotification>
                    {errors.type}
                </ErrorNotification>
            }
        </div>
    )
}
