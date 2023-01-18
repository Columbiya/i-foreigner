import { useEffect, useCallback, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { AppDispatch, RootState } from '../../store/store'
import { setToast, ToastTypes } from '../../store/toastSlice'
import { $api, HTTPResponse } from '../../utils/api'
import { atLeastOneLower, atLeastOneNumber, atLeastOneUpper, minLengthValidatorCreator, noSpaces, oneSpecialCharacter, required } from '../../utils/validators'
import { maxLength128Validator } from '../Auth/Auth'
import './style.scss'

interface FormValues {
    password: string
    repeatPassword: string
}

const minLengthValidator8 = minLengthValidatorCreator(8)

const ForgotPassword: React.FC = () => {
    const { token } = useParams()
    const isAuthorized = useSelector((e: RootState) => e.auth.authorized)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, watch, setFocus, setError } = useForm<FormValues>()
    const { t } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const watchPassword = watch('password')
    const customErrors = useMemo(() => {
        return {
            [t("password should have at least one number")]: atLeastOneNumber(watchPassword || ""),
            [t("password is too short")]: minLengthValidator8(watchPassword || ""),
            [t('at_least_one_lower')]: atLeastOneLower(watchPassword || ""),
            [t('at_least_one_upper')]: atLeastOneUpper(watchPassword || ""),
            [t('one_special_character')]: oneSpecialCharacter(watchPassword || "")
        }
    }, [watchPassword, t])

    const onSubmit = useCallback(async (values: FormValues) => {
        if (Object.values(customErrors).includes(false)) {
            setFocus('password')
            
            return
        }
        if (values.password !== values.repeatPassword) {
            setError("repeatPassword", {type: t('passwords-dont-match') as string})

            return
        }

        try {
            const data = await $api.post<HTTPResponse<null>>('/api/forgot-password/change', {
                newPassword: values.password,
                token
            }).then(res => res.data)
    
            if (data.status) {
                dispatch(setToast({text: t('you_changed_your_password'), type: ToastTypes.SUCCESS}))
            }
            else {
                dispatch(setToast({text: data.message, type: ToastTypes.ERROR}))
            }
        } catch(e) {
            console.log(e)

            if (e instanceof Error) {
                dispatch(setToast({text: e.message, type: ToastTypes.ERROR}))
            }
        }

    }, [customErrors, dispatch, setError, setFocus, t, token])

    useEffect(() => {
        if (isAuthorized) {
            navigate('/contacts')
        }
    }, [isAuthorized, navigate])

    return (
        <section className="forgot">
            <div className="forgot__inner">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="forgot__title">{t('password_recovery')}</h2>

                    <Input 
                        type={passwordVisible ? "text": 'password'} 
                        label={t('password') as string} 
                        hint={t('at-least-8-characters') as string}
                        register={register}
                        withTracking
                        showButton
                        capsNotify
                        hidePassword={() => setPasswordVisible(val => !val)}
                        trackingErrors={customErrors}
                        placeholder="Your new password"
                        name="password"
                        validate={{ 
                            [t("no spaces")]: noSpaces,
                            [t('required')]: required,
                            [t('max_length_128')]: maxLength128Validator
                        }}
                        errors={errors.password}
                    />

                    <Input
                        type={passwordVisible ? "text": 'password'} 
                        label={t('repeat-password') as string} 
                        register={register}
                        name="repeatPassword"
                        placeholder='Repeat password'
                        capsNotify
                        validate={{
                            [t('required')]: required
                        }}
                        errors={errors.repeatPassword}
                    />

                    <Button>
                        {t('change_password')}
                    </Button>
                </form>
            </div>
            
        </section>
    )
}

export default ForgotPassword