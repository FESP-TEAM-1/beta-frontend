import React, { useState } from "react";
import styles from "./RadioButtonGroup.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropsType {
  radioList: string[];
  name: string;
  defaultValue?: string;
  onChange: React.ChangeEventHandler;
  flexDirectionColumn?: boolean;
}

const RadioButtonGroup: React.FC<PropsType> = ({ radioList, name, defaultValue, onChange, flexDirectionColumn = false }) => {
  console.log(defaultValue);
  const [selectedOption, setSelectedOption] = useState(defaultValue || radioList[0]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    onChange(e);
  };

  return (
    <fieldset className={cx("fieldset", flexDirectionColumn && "row")}>
      {radioList.map((item) => (
        <label key={item}>
          <input type="radio" name={name} value={item} checked={selectedOption === item} onChange={handleOptionChange} />
          <span>{item}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default RadioButtonGroup;