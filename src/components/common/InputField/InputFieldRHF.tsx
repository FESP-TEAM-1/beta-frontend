import React from "react";
import styles from "./InputField.module.css";
import { Controller, useFormContext } from "react-hook-form";

interface PropsType {
  children?: React.ReactNode;
  type: "text" | "url" | "number";
  name: string;
  placeholder?: string;
  labelHidden?: boolean;
  required?: boolean;
  readOnly?: boolean;
  style?: React.CSSProperties;
  unit?: string;
}

const InputFieldRHF: React.FC<PropsType> = ({ children, type, name, placeholder, labelHidden, required, readOnly = false, style, unit }) => {
  const {
    control,
    // formState: { errors }
  } = useFormContext();

  return (
    <fieldset className={styles["fieldset-box"]}>
      <label className={labelHidden ? "a11y-hidden" : ""} htmlFor={name}>
        {children}
      </label>
      <Controller
        rules={required ? { required: true } : {}}
        control={control}
        name={name}
        render={({ field: { value, ...rest } }) => (
          <input id={name} readOnly={readOnly} type={type} placeholder={placeholder} style={{ ...style }} value={value ?? ""} {...rest} />
        )}
      />
      {unit && <span className={styles["input-unit"]}>{unit}</span>}
    </fieldset>
  );
};

export default InputFieldRHF;
