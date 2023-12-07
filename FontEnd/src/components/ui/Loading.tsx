import { Spin } from "antd";
import { FunctionComponent } from "react";

interface LoadingProps {
    
}
 
const Loading: FunctionComponent<LoadingProps> = () => {
    return <div className="fixed z-50 flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-gray-400/30">
        <Spin size="large" />
    </div>
}
 
export default Loading;