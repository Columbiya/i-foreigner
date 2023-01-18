import classNames from 'classnames'
import './style.scss'

interface IDividerProps {
    className?: string
}

export const Divider: React.FC<IDividerProps> = ({ className }) => {
    return (
        <hr className={classNames("divider", {
            [className || ""]: className
        })} />
    )
}