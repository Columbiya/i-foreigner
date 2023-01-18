interface IProps {
    strokeColor?: string
}

export const InfoIcon: React.FC<IProps> = ({ strokeColor }) => {
    return (
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.56643 12.28C10.6774 12.28 13.1954 9.75263 13.1954 6.64C13.1954 3.52737 10.6774 1 7.56643 1C4.4554 1 1.9375 3.52737 1.9375 6.64C1.9375 9.75263 4.4554 12.28 7.56643 12.28Z" stroke={strokeColor ? strokeColor: "#D80000"} stroke-opacity="0.81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.56641 8.49602V6.64001" stroke={strokeColor ? strokeColor: "#D80000"} stroke-opacity="0.81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.56641 4.78406H7.57588" stroke={strokeColor ? strokeColor: "#D80000"} stroke-opacity="0.81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}