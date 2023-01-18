import {useCallback, useEffect, useMemo, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {Link, useNavigate} from 'react-router-dom'
import {Button} from '../../components/Button/Button'
import {Input} from '../../components/Input/Input'
import {ROUTES} from '../../utils/routes'
import {
    atLeastOneAt,
    atLeastOneLower,
    atLeastOneNumber,
    atLeastOneUpper,
    doesntIncludeSymbols,
    domainNameMinimalLength2,
    domainNameNoMore,
    domenNameOnlyOneDot,
    emailShouldHaveDomainName,
    emailValid,
    emailValidationString,
    lastSymbolDomainNameIsNot,
    localDomainDoesntContainRussianSymbols,
    maxLengthLocalDomain,
    maxLengthValidatorCreator,
    minLengthValidatorCreator,
    noSpaces,
    oneSpecialCharacter,
    onlyOneAt,
    required,
    wrongEmailFormat
} from '../../utils/validators'
import {useDispatch, useSelector} from 'react-redux'
import './style.scss'
import {login as loginThunk, register as registerThunk, setSuccess} from '../../store/authSlice'
import {AppDispatch, RootState} from '../../store/store'
import {$api, HTTPResponse, socialNetworksAuth} from '../../utils/api'
import { setToast, ToastTypes } from '../../store/toastSlice'

const maxLengthValidator255 = maxLengthValidatorCreator(255)
const minLengthValidator8 = minLengthValidatorCreator(8)

interface AuthProps {
    isLogin?: boolean
}

const initialLoginValues = {
    email: "",
    password: "",
    showPassword: false,
} as const

const initialRegisterValues = {
    email: "",
    password: "",
    rememberMe: false,
    repeatPassword: "",
    okayWithTerms: true
} as const

const maxLength129Validator = maxLengthValidatorCreator(129)
export const maxLength128Validator = maxLengthValidatorCreator(128)

export type formValues = typeof initialRegisterValues & typeof initialLoginValues

const Auth: React.FC<AuthProps> = ({ isLogin }) => {
    const { register, handleSubmit, setError, formState: { errors }, watch, reset, setFocus, setValue } = useForm<formValues>()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const watchPassword = watch("password")
    const watchEmail = watch("email")
    const dispatch = useDispatch<AppDispatch>()
    const { t } = useTranslation()
    const authorized = useSelector((state: RootState) => state.auth.authorized)
    const authSuccess = useSelector((state: RootState) => state.auth.authSuccess)
    const navigate = useNavigate()
    const onForgotPassword = useCallback(async () => {
        if (!watchEmail) {
            setError('email', {type: t('required') as string})

            return
        }
        else if (!emailValid(watchEmail)) {
            setError('email', {type: t('email_not_valid') as string})

            return
        }

        try {
            const data = await $api.post<HTTPResponse<string>>('/api/forgot-password/email?email=' + watchEmail).then(res => res.data)

            if (data.status) {
                dispatch(setToast({text: t('we_sent_you_email'), type: ToastTypes.SUCCESS}))
            }
            else {
                dispatch(setToast({text: data.message, type: ToastTypes.ERROR}))
            }

        } catch(e) {
            console.log(e)

            if (e instanceof Error) {
                setToast({text: e.message, type: ToastTypes.ERROR})
            }
        }
    }, [watchEmail, dispatch, setError, t])

    const customErrors = useMemo(() => {
        return {
            [t("password should have at least one number")]: atLeastOneNumber(watchPassword || ""),
            [t("password is too short")]: minLengthValidator8(watchPassword || ""),
            [t('at_least_one_lower')]: atLeastOneLower(watchPassword || ""),
            [t('at_least_one_upper')]: atLeastOneUpper(watchPassword || ""),
            [t('one_special_character')]: oneSpecialCharacter(watchPassword || "")
        }
    }, [watchPassword, t])
    
    const onSubmit = useCallback((values: formValues) => {
        setValue('email', values.email.trim() as any)
        setValue('password', values.password.trim() as any)
        
        if (!isLogin) {
            setValue('repeatPassword', values.repeatPassword.trim() as any)
        }

        if (Object.values(customErrors).includes(false) && !isLogin) {
            setFocus('password')
            return;
        }
        if (values.password !== values.repeatPassword && !isLogin) {
            setError("repeatPassword", {type: t('passwords-dont-match') as string})
        }
        else if (isLogin) {
            dispatch(loginThunk({email: values.email.trim(), password: values.password.trim(), rememberMe: values.rememberMe}))
        }
        else {
            dispatch(registerThunk({email: values.email.trim(), password: values.password.trim()}))
            reset()
        }
    }, [isLogin, customErrors, dispatch, setError, setFocus, t, reset, setValue])

    useEffect(() => {
        reset()
    }, [isLogin, reset])

    useEffect(() => {
        if (authSuccess) {
            navigate(ROUTES.INSTRUCTIONS)
        }
        else if (authorized) {
            navigate('/contacts')
        }
        return () => {
            dispatch(setSuccess(false))
        }
    }, [authorized, navigate])

    return (
        <section className="register">
            <div className="container">
                <div className="register__inner">
                    <span className="register__already-member">{t('already-member')} {" "}
                        <Link to={isLogin ? ROUTES.SIGN_UP: ROUTES.LOGIN}>
                            {isLogin ? t('sign-up'): t('sign-in')}
                        </Link>
                    </span>

                    <h3 className="register__title">
                        {isLogin ? t('log-into-your-account'): t('create-account')}
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label={t('email')}
                            placeholder="email@example.pl"
                            register={register}
                            name="email"
                            errors={errors.email}
                            validate={{
                                [t('required')]: required,
                                [t("max length is 255")]: maxLengthValidator255,
                                [t("only one @")]: atLeastOneAt,
                                [wrongEmailFormat]: domainNameNoMore,
                                [t("one dot")]: domenNameOnlyOneDot,
                                [t('only one @ symbol')]: onlyOneAt,
                                [emailValidationString]: doesntIncludeSymbols,
                                [t('local domain max length is 64 and min 1')]: maxLengthLocalDomain,
                                [t("email can not contain '-', '_', '.'")]: lastSymbolDomainNameIsNot,
                                [t('email_should_have_domain_name')]: emailShouldHaveDomainName,
                                [t('email_cant_be_more_than_129')]: maxLength129Validator,
                                [t('local_domain_cant_contain_russian_symbols')]: localDomainDoesntContainRussianSymbols,
                                [t('domain_name_minimal_length')]: domainNameMinimalLength2,
                                [t('email_not_valid')]: emailValid
                            }}
                        />

                        <Input 
                            type={passwordVisible ? "text": 'password'} 
                            label={t('password') as string} 
                            hint={t('at-least-8-characters') as string}
                            register={register}
                            withTracking={!isLogin}
                            capsNotify
                            hidePassword={() => setPasswordVisible(val => !val)}
                            trackingErrors={!isLogin ? customErrors: undefined}
                            name="password"
                            showButton
                            validate={{ 
                                [t("no spaces")]: noSpaces,
                                [t('required')]: required,
                                [t('max_length_128')]: maxLength128Validator
                            }}
                            errors={errors.password}
                        />

                        {!isLogin && 
                            <Input 
                                type={passwordVisible ? "text": 'password'} 
                                label={t('repeat-password') as string} 
                                register={register}
                                name="repeatPassword"
                                validate={{
                                    [t('required')]: required
                                }}
                                capsNotify
                                errors={errors.repeatPassword}
                            />
                        }

                        {!isLogin &&
                            <Input 
                                type='checkbox' 
                                hint={t('creating-an-account') as string}
                                register={register}
                                name="okayWithTerms"
                                validate={{
                                    [t('to_complete_registration')]: required
                                }}
                                errors={errors.okayWithTerms}
                            />
                        }

                        {isLogin &&
                            <div className="auth-forgot__container">
                                <Input 
                                    type='checkbox' 
                                    hint={t('remember-me') as string}
                                    register={register}
                                    name="rememberMe"
                                    errors={errors.rememberMe}
                                />

                                <span 
                                    className="auth__forgot-password"
                                    onClick={onForgotPassword}>Forgot password?</span>
                            </div>
                            
                        }

                        <Button>{isLogin ? t('sign-in'): t('create')}</Button>
                    </form>

                    <hr className="register__separator" />

                    <h4 className="register__via-socials">{isLogin ? t('sign-in'): t('sign-up')} {t('via-social-networks')}</h4>
                    <Button 
                        noRadius
                        asLink
                        href={`${socialNetworksAuth}/google`}
                    >
                        Google
                    </Button>
                    <Button 
                        noRadius
                        asLink
                        href={`${socialNetworksAuth}/facebook`}
                    >
                        Facebook
                    </Button>
                    <Button 
                        noRadius
                        asLink
                        href={`${socialNetworksAuth}/Twitter`}
                    >
                        Twitter
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Auth

