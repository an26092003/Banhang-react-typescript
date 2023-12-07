import { FunctionComponent } from "react";

interface SaleOffCardProps {
    type?: 'saleoff' | 'offer' | 'new' | 'default',
    off?:number; 
}
 
const SaleOffCard: FunctionComponent<SaleOffCardProps> = ({
    type,
    off,
}) => {
    return ( 
    <>
        {off !== 0 ? <span className={`${
            type === "saleoff" ? 'bg-red-500 opacity-80' : type === 'offer' ? 'bg-green-500' : type === 'new' ? 'bg-green-600' : ''
            
            } absolute top-0 right-0 px-2 py-1 m-2 lg:px-2 lg:py-1 text-xs lg:text-sm font-medium text-gray-100 rounded-md`}>
            {off! > 0 &&  `- ${off}% OFF`}
        </span> : <span className="hidden"></span>
        }
    </>
    )
}
 
export default SaleOffCard;