import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button } from '../../components/Button/Button'
import { Divider } from '../../components/Divider/Divider'
import { GoogleMap } from '../../components/GoogleMap/GoogleMap'
import { MainLayout } from "../../components/MainLayout/MainLayout"
import { WithAuth } from "../../components/WithAuth/WithAuth"
import { getManagerThunk } from '../../store/managerSlice'
import { AppDispatch, RootState } from '../../store/store'
import sliderImage from '../../assets/image-contacts.jpg'
import { Autoplay, Navigation } from 'swiper'
import { headOfficeAddress, managerEmail, postalAddress, website, workingHoursSaturday, workingHoursWorkingDays } from '../../utils/consts'
import './style.scss'
import "swiper/css";

const ContactsPage: React.FC = () => {
    const managerName = useSelector((state: RootState) => state.manager.name)
    const managerPhoneNumber = useSelector((state: RootState) => state.manager.contactLink)
    const dispatch = useDispatch<AppDispatch>()
    const { t } = useTranslation()
    const navigationPrevRef = useRef<HTMLDivElement>(null)
    const navigationNextRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        dispatch(getManagerThunk())
    }, [dispatch])


    return (
        <WithAuth>
            <MainLayout>
                <section className="contacts">
                    <div className="contacts__inner">
                        <div className="contacts__left">
                            <div className="contacts__item">
                                <h2 className="contacts__title">{t('Manager')}</h2>
                                <h3 className="contacts__name">{managerName}</h3>
                                <span className="contacts__text">{t('our_manager_will_answer')}</span>
                                <Button 
                                    small
                                    hollow
                                    asLink
                                    href={managerPhoneNumber}
                                >
                                    {t('ask_manager')}
                                </Button>
                            </div>
                            <div className="contacts__item">
                                <h2 className="contacts__title">{t('phone')}</h2>
                                <a className="contacts__value" href={`${managerPhoneNumber}`}>{managerPhoneNumber && managerPhoneNumber.split(':')[1]}</a>
                                
                                <h2 className="contacts__title">{t('email')}</h2>
                                <a className="contacts__value" href={`mailto:${managerEmail}`}>{managerEmail}</a>

                                <h2 className="contacts__title">{t('website')}</h2>
                                <a className="contacts__value" href={`${website}`} rel="noreferrer" target="_blank">{website}</a>
                            </div>
                            <div className="contacts__item">
                                <h2 className="contacts__title">{t('working_hours')}</h2>
                                <span className="contacts__value">
                                    {t('Mon_to_Fri')}
                                    {workingHoursWorkingDays}
                                    <br />
                                    {t('Sat')}
                                    {workingHoursSaturday}
                                </span>
                            </div>
                        </div>
                        <div className="contacts__right">
                            <div className="contacts__item map">
                                <h2 className="contacts__title">{t('Postal')}</h2>
                                <span className="contacts__value">{t('you_can_send_letters_and')}</span>
                                
                                <Divider />
                                <span className="contacts__address">{postalAddress}</span>
                                <div className="contacts__map">
                                    <GoogleMap defaultCenter={{lat: 52.22977, lng: 21.01178}} zoom={8} height={100} />
                                </div>
                            </div>
                            <div className="contacts__item map">
                                <h2 className="contacts__title">{t('head_office')}</h2>
                                <span className="contacts__value">{t('you_can_send_letters_and')}</span>
                                
                                <Divider />
                                <span className="contacts__address">{headOfficeAddress}</span>
                                <div className="contacts__map">
                                    <GoogleMap defaultCenter={{lat: 41.247543, lng: -85.842680}} zoom={8} height={100} />
                                </div>
                            </div>
                        </div>
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={51}
                            modules={[Autoplay, Navigation]}
                            autoplay={true}
                            navigation={{
                                prevEl: navigationPrevRef.current,
                                nextEl: navigationNextRef.current
                            }}
                            className="contacts__item slider"
                            breakpoints={{
                                320: {
                                    slidesPerView: 1
                                },
                                920: {
                                    slidesPerView: 2
                                }
                            }}
                        >
                            <h2 className="contacts__title">{t('our_office')}</h2>
                            <div className="slider-navigation back" ref={navigationPrevRef}></div>

                            <SwiperSlide>
                                <img src={sliderImage} className="contacts__image" alt="our office" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={sliderImage} className="contacts__image" alt="our office" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={sliderImage} className="contacts__image" alt="our office" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={sliderImage} className="contacts__image" alt="our office" />
                            </SwiperSlide>
                        <div className="slider-navigation forward" ref={navigationNextRef}></div>
                            
                        </Swiper>


                    </div> 
                </section>
            </MainLayout>
       </WithAuth>
    )
}

export default ContactsPage