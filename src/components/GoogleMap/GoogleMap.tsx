import { GoogleMap as GoogleMapContainer, Marker, useLoadScript } from '@react-google-maps/api';
import './style.scss'

interface GoogleMapProps {
    zoom: number
    defaultCenter: {lat: number, lng: number},
    height?: number
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ defaultCenter, zoom, height }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string
    })

    return (
        <>
            {isLoaded &&         
                <GoogleMapContainer
                    mapContainerClassName='google-map'
                    mapContainerStyle={{height: height}}
                    center={defaultCenter}
                    zoom={zoom}
                >
                    <Marker position={defaultCenter} />
                </GoogleMapContainer>
            }
        </>


    )
}