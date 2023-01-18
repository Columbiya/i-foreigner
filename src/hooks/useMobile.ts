import { useState, useEffect } from 'react'
import { useDebouncedCallback } from './useDebouncedCallback'

export function useMobile() {
    const [isMobile, setMobile] = useState(false)
    const onWindowResize = () => {
        setMobile(window.innerWidth <= 768)
    }
    const debouncedCallback = useDebouncedCallback(onWindowResize, 250)

    useEffect(() => {
        window.addEventListener('resize', debouncedCallback)

        return () => window.removeEventListener('resize', debouncedCallback)
    }, [debouncedCallback])

    useEffect(() => {
        onWindowResize()
    }, [])

    return isMobile
}