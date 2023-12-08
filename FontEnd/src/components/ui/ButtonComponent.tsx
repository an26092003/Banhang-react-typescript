import { Button, ButtonProps } from "antd";
import { ReactNode } from "react";


type Props = ButtonProps & {
    onClick?:() =>void;
    children?:ReactNode;
}

const ButtonComponent = ({onClick,children,...props}: Props) => {
  return (
    <Button prefixCls="rounded-none !bg-primary text-white hover:border-current hover:!bg-primary/90" onClick={onClick} {...props}>
        {children}
    </Button>
  )
}

export default ButtonComponent