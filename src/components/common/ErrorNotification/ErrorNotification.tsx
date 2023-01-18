import { InfoIcon } from "../InfoIcon"
import './style.scss'

interface IProps {
    children?: React.ReactNode
}
 
export const ErrorNotification: React.FC<IProps> = ({ children }) => {
    return (
        <div className="error">
            <InfoIcon />

            <span>{children}</span>
        </div>
    )
}