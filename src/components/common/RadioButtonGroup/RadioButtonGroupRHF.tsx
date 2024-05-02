import React from "react";
import styles from "./RadioButtonGroup.module.css";
import classNames from "classnames/bind";
import { Controller, useFormContext } from "react-hook-form";

const cx = classNames.bind(styles);

interface PropsType {
  radioList: string[];
  name: string;
  flexDirectionColumn?: boolean;
}

const RadioButtonGroupRHF: React.FC<PropsType> = ({ radioList, name, flexDirectionColumn = false }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <fieldset className={cx("fieldset", flexDirectionColumn && "column")} {...field}>
          {radioList.map((item) => (
            <label key={item}>
              <input type="radio" value={item} checked={field.value === item} onChange={field.onChange} />
              <span>{item}</span>
            </label>
          ))}
        </fieldset>
      )}
    />
  );
};

export default RadioButtonGroupRHF;
