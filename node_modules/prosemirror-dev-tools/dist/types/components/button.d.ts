import { ReactNode, MouseEventHandler } from "react";
type ButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
};
declare const Button: ({ onClick, children }: ButtonProps) => JSX.Element;
export default Button;
