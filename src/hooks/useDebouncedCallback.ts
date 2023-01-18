import { useRef, useCallback } from 'react'

export function useDebouncedCallback(callback: () => void, delay: number) {
    const ref = useRef<any>(null)
    const debouncedCallback = useCallback(() => {
        if (ref?.current) {
            clearTimeout(ref.current)
        }

        const timer = setTimeout(() => {
            callback()
        }, delay)

        ref.current = timer
    }, [callback, delay]) 

    return debouncedCallback
}