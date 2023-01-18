import { useCallback, useState } from 'react'
import { useTranslation } from "react-i18next"
import { Swiper, SwiperSlide } from "swiper/react"
import { Button } from "../../components/Button/Button";
import { Pagination } from 'swiper';
import { useNavigate } from 'react-router-dom';
import './style.scss'
import "swiper/css";
import 'swiper/css/pagination';

const Instructions: React.FC = () => {
    const { t } = useTranslation()
    const [swiper, setSwiper] = useState<any>()
    const [ended, setEnded] = useState(false)
    const navigate = useNavigate()

    const onContinue = useCallback(() => {
        if (ended) {
            navigate('/contacts')

            return
        }

        swiper.slideNext()

    }, [ended, navigate, swiper])

    const onSkip = useCallback(() => {
        navigate('/contacts')
    }, [navigate])

    return (
        <section className="instructions">

            <h2 className="instructions__title">{t('instruction')}</h2>

            <Swiper
                modules={[Pagination]}
                onSwiper={swiper => setSwiper(swiper)}
                pagination={{ clickable: true }}
                onReachEnd={() => setEnded(true)}
            >
                <SwiperSlide>
                    <p className="instructions__text">Lorem, ipsum dolor sit amet consectetur</p>
                    <p className="instructions__text">Ipsum dolor sit amet consectetur</p>
                    <p className="instructions__text">Lorem, ipsum dolor sit amet consectetur</p>
                    <p className="instructions__text">Lorem, ipsum dolor sit amet consectetur dolor</p>
                </SwiperSlide>
                <SwiperSlide>
                    <p className="instructions__text">Lorem, ipsum dolor sit amet consectetur</p>
                    <p className="instructions__text">Ipsum dolor sit amet consectetur</p>
                    <p className="instructions__text">Lorem, ipsum dolor sit amet consectetur</p>
                    <p className="instructions__text">Lorem, ipsum dolor sit amet consectetur dolor</p>
                </SwiperSlide>
                <SwiperSlide>
                    <p className="instructions__text">Lorem, ipsum dolor sit amet consectetur</p>
                    <p className="instructions__text">Ipsum dolor sit amet consectetur</p>
                    <p className="instructions__text">Lorem, ipsum dolor sit amet consectetur</p>
                    <p className="instructions__text">Lorem, ipsum dolor sit amet consectetur dolor</p>
                </SwiperSlide>
                <SwiperSlide>
                    <p className="instructions__text">Lorem, ipsum dolor sit amet consectetur</p>
                    <p className="instructions__text">Ipsum dolor sit amet consectetur</p>
                    <p className="instructions__text">Lorem, ipsum dolor sit amet consectetur</p>
                    <p className="instructions__text">Lorem, ipsum dolor sit amet consectetur dolor</p>
                </SwiperSlide>
            </Swiper>

            <Button
                onClick={onContinue}
            >
                {ended ? t('finish'): t('continue')}
            </Button>

            <Button 
                hollow 
                noBorder 
                className='instructions__blue'
                onClick={onSkip}
            >{t('skip')}</Button>




        </section>
    )
}

export default Instructions