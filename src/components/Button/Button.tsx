import classNames from 'classnames'
import './style.scss'

interface ButtonProps {
    children: React.ReactNode
    className?: string
    onClick?: (...params: any[]) => void
    noRadius?: boolean
    asLink?: boolean
    href?: string
    small?: boolean
    hollow?: boolean
    download ?: boolean
    noBorder?: boolean
}



export const Button: React.FC<ButtonProps> = ({ children, noBorder, className, onClick, download, noRadius, asLink, href, small, hollow }) => {
    return (
        <>
        {asLink ?
            <a 
                className={classNames('button', {
                    [className ? className: ""]: !!className,
                    "no-radius": noRadius,
                    small: small,
                    hollow: hollow,
                    "no-border": noBorder
                })}
                download={download}
                onClick={onClick}
                target="_blank"
                rel="noreferrer"
                href={href}
            >
                {children}
            </a>:
            <button 
                className={classNames('button', {
                    [className ? className: ""]: !!className,
                    "no-radius": noRadius,
                    small: small,
                    hollow: hollow,
                    "no-border": noBorder
                })}
                onClick={onClick}
            >
                {children}
            </button>
        }
        </>

    )
}