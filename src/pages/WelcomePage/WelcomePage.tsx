import { Button } from '../../components/Button/Button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './style.scss'
import { ROUTES } from '../../utils/routes'

export const WelcomePage: React.FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <section className="welcome">
            <div className="container">
                <div className="welcome__inner">
                    <div className="welcome__content">
                        <div>
                            <h1 className="welcome__title">{t('welcome')}</h1>
                            <h2 className="welcome__subtitle">{t('register-or-login')}</h2>
                        </div>
                        <div className="welcome__buttons">
                            <Button onClick={() => navigate(ROUTES.SIGN_UP)}>
                                {t('create')}
                            </Button>

                            <Button onClick={() => navigate(ROUTES.LOGIN)}>
                                {t('log-in')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}