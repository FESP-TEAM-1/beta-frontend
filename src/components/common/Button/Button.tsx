import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

/**
 * Button Component
 * @param {React.ReactNode} children - Button text
 * @param {() => void} onClick - Button click event
 * @param {boolean} disabled - Button disabled
 * @param {string} type - Button type
 * @param {string} borderRadius - Button border radius
 * @returns {JSX.Element}
 * @constructor
 * @example
 * <Button onClick={() => console.log("click")}>Button</Button>
 * <Button disabled={true}>Button</Button>
 * <Button type="submit">Button</Button>
 * <Button borderRadius="10px">Button</Button>
 *
 * <Button onClick={() => console.log("click")} disabled type="submit" borderRadius="10px">
 *  버튼
 * </Button>
 */

interface PropsType {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "submit";
  loading?: boolean;
  borderRadius?: string;
  reverseColor?: boolean;
  form?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<PropsType> = ({ children, onClick, disabled, loading, type, borderRadius = "5px", reverseColor, form, style }) => {
  return (
    <>
      <button
        className={cx("button", reverseColor && "white", loading && "loading")}
        onClick={onClick}
        disabled={disabled || false}
        type={type || "button"}
        style={{ borderRadius, ...style }}
        form={form}
      >
        {!loading && <>{children}</>}
      </button>
    </>
  );
};
export default Button;
