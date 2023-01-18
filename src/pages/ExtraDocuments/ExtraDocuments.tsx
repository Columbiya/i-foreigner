import React, {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from '../../components/Button/Button'
import {MainLayout} from '../../components/MainLayout/MainLayout'
import {WithAuth} from '../../components/WithAuth/WithAuth'
import {useMobile} from '../../hooks/useMobile'
import {getDocuments} from '../../store/documentsSlice'
import {AppDispatch, RootState} from '../../store/store'
import './style.scss'

const ExtraDocuments: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const documents = useSelector((state: RootState) => state.documents.documents)
    const { t } = useTranslation()
    const isMobile = useMobile()

    useEffect(() => {
        dispatch(getDocuments())
    }, [dispatch])

    return (
        <WithAuth>
            <MainLayout>
                <section className="extra">
                    <div className="extra__inner">
                        <header className="extra__header">
                            <h3 className="extra__title">
                                {t('documents_you_may_need')}
                            </h3>
                            <nav className="extra__nav">
                                <span className="extra-item active">{t('available')}</span>
                                <span className="extra-item">{t('request')}</span>
                            </nav>
                        </header>

                        <div className="extra__documents">
                            {!isMobile && 
                                <div className="extra__item">
                                    {t('name')}
                                </div>
                            }
                            {!isMobile && 
                                <div className="extra__item">
                                    {t('uploaded')}
                                </div>
                            }

                            {!isMobile && documents?.map(d => (
                                <React.Fragment key={d.id}>
                                    <div className="extra__item">
                                        <span>{d.name}</span>
                                    </div>
                                    <div className="extra__item date">
                                        <span>{d.uploadDate && new Date(d.uploadDate).toLocaleDateString('en')}</span>
                                        <a href={d.url} 
                                            className="extra__item-download" target="_blank"
                                            download={true} rel="noreferrer">{t('download')}</a>
                                    </div>
                                </React.Fragment>
                            ))}

                            {isMobile && documents?.map(d => (
                                <div className="extra__item mobile document" key={d.id}>
                                    <header className="document__header">
                                        <span>{d.name}</span>
                                        <PdfIcon link={d.url} />
                                    </header>
                                    <footer className="document__footer">
                                        <div className="document__uploaded">
                                            <span>{t('uploaded')}</span>
                                            <span className="document__date">{d.uploadDate && new Date(d.uploadDate).toLocaleDateString('en')}</span>
                                        </div>
                                        <Button small asLink download href={d.url}>Download</Button>
                                    </footer>
                                </div>
                            ))}
                        </div>

                        <div className="extra__additional">
                            <span className="additional__text">{t('need_something_extra')}</span>
                            <Button>Request</Button>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </WithAuth>
    )
}

interface IIconProps {
    link: string
}

const PdfIcon: React.FC<IIconProps> = ({ link }) => {
    return (
        <a href={link} target="_blank" rel="noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink='http://www.w3.org/1999/xlink'>
                <rect width="24" height="24" fill="url(#pattern0)" fillOpacity="0.65"/>
                <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref='#image0_906_2085' transform="scale(0.02)"/>
                </pattern>
                <image id="image0_906_2085" width="50" height="50" xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACbElEQVRoge3Yz4tNUQAH8M8wDM00GMpI5Ed+lFGKZGcnC1koCzv/g/gD/AOyQxZ+rKRshCywkTSUIhpJGkpYWJjyYwbP4hwzb5qZN2/uuefOo/nW7dx73znfH/eeH/cd5vBvoZbpuI6OCnNkC1LDTSyqOkgOzhruoatk/oaiOTg/xPIuOkvWmFI0B+cWvIvn99Fdss6kork41+F1vH6M5SVrTSqai3MtXsV7T7CiZL1JRXNx9uJ5vP8Cq0rWrCwIrMTT+NsAVlchmouzB4/i72+wvgrRXJxL8TDWGcTGKkRzcS7Bg1jvLTZVIZqLsxN3jC2efVWIFuGc6fGxEWlbE6LN1JsJUh7MlD7aE0iLoshDmTb8vAKkLYncQbqxILNGUyg62NtxBT+FQbpzlnwkE+yL7UZieS3FRDM+cnWtNbEcjGXygjYdcgV5GcsNsfyeSWcUuYL0Y8jYVPssk84ocgUZxsW66xuZdJpGymyxo6590ndSMz5yriOb687PYH5GrWmR8kYuxLa/Ynl8lnwkEXTgM37jML4Ji+ORXD5yfTQexTJh9roqBLskTABdQjfbI2w6fBV2T07jSyY/hd7IQmEhrOEAduOYsZ3FRnvBZfpIJjgR2wzjk4mGRya5V8P7kn0kEfQJ3aPe4IDQbQ4K+1W9OCsEra93skQfhQn24rYwuP8+9UvY1aBND/bjELaW5KMwwWJcNv7J/sD2FNECPpIJzpvY10+lCBb0kUwwZHyIfuEtlY3sQc7V1bklrB05kD1ImzCgt6WIlOAjP0FJmNWv30oxF6TVMBek1dDs/5FWmLka4r95I3NoNfwBVzQnPWj+W+sAAAAASUVORK5CYII='/>
                </defs>
            </svg>
        </a>

    )
}

export default ExtraDocuments
