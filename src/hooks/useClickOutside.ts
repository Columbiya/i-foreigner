import { useEffect, RefObject } from 'react'

type Handler = () => void

export function useClickOutside(ref: RefObject<HTMLElement>, handler: Handler) {    
    useEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!ref.current) return

            if (!ref.current.contains(target)) {
                handler()
            }
        }

        document.body.addEventListener('click', clickHandler)

        return () => document.body.removeEventListener('click', clickHandler)
    }, [handler, ref])
}