import React, { useState, SetStateAction, useEffect } from "react";
import { BirthdateGenderValues, EmailValues, PhoneValues, PropsType } from "./InputFieldGroupType";
import { getYears, getMonths, getDays } from "@/utils";
import styles from "./InputFieldGroup.module.css";

/** 수정필요
 * InputFieldGroup Component
 * @param {string} type - InputFieldGroup type
 * @param {PhoneValues | BirthdateGenderValues | EmailValues} values - InputFieldGroup values
 * @param {React.Dispatch<React.SetStateAction<PhoneValues | BirthdateGenderValues | EmailValues>>} setValues - InputFieldGroup setValues
 * @param {string} userType - InputFieldGroup userType
 * @returns {JSX.Element}
 * @constructor
 * @example
 * <InputFieldGroup type="phone" values={phone} setValues={setPhone} userType={userType} />
 *
 */

const InputFieldGroup: React.FC<PropsType> = ({ type, values, setValues, userType, required, name, onChange: handleChange, readOnly = false }) => {
  const handleSelectChange = (field: keyof BirthdateGenderValues, value: string) => {
    if (type === "birthdate-gender") {
      setValues!((prev: BirthdateGenderValues) => ({ ...prev, [field]: value }));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (type === "phone") {
      const newValues: SetStateAction<PhoneValues> = (prev) => ({ ...prev, [name]: value });
      setValues!(newValues);
    } else if (type === "email") {
      const newValues: SetStateAction<EmailValues> = (prev) => ({ ...prev, [name]: value });
      setValues!(newValues);
    } else if (type === "birthdate-gender") {
      const newValues: SetStateAction<BirthdateGenderValues> = (prev) => ({ ...prev, [name]: value });
      setValues!(newValues);
    }
  };

  const emailOptions = ["gmail.com", "naver.com", "daum.net", "직접 입력"];
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState("gmail.com");

  useEffect(() => {
    if (type === "email" && "email2" in values) {
      const emailDomain = values.email2;
      const newDomain = emailOptions.includes(emailDomain) ? emailDomain : "직접 입력";
      setSelectedDomain(newDomain);
      setIsReadOnly(newDomain !== "직접 입력");
    }
  }, [values, type]);

  switch (type) {
    case "phone":
      return (
        <fieldset className={styles["fieldset-box"]} name={name}>
          <label>핸드폰번호</label>
          <div className={styles["fieldset-box__list"]}>
            <input
              required={required}
              type="text"
              name="phone1"
              value={values.phone1}
              onChange={handleChange || handleInputChange}
              readOnly={readOnly}
            />
            <input
              required={required}
              type="text"
              name="phone2"
              value={values.phone2}
              onChange={handleChange || handleInputChange}
              readOnly={readOnly}
            />
            <input
              required={required}
              type="text"
              name="phone3"
              value={values.phone3}
              onChange={handleChange || handleInputChange}
              readOnly={readOnly}
            />
          </div>
        </fieldset>
      );

    case "birthdate-gender": {
      const years = getYears();
      const months = getMonths();
      const days = getDays(parseInt(values.year), parseInt(values.month));

      return (
        <fieldset className={styles["fieldset-box"]}>
          <label>생년월일 및 성별</label>
          <div className={styles["fieldset-box__list"]}>
            <div className={styles["fieldset-box__select-list"]}>
              <select required={required} value={values.year} onChange={(e) => handleSelectChange("year", e.target.value)}>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select required={required} value={String(parseInt(values.month))} onChange={(e) => handleSelectChange("month", e.target.value)}>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select required={required} value={String(parseInt(values.day))} onChange={(e) => handleSelectChange("day", e.target.value)}>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles["fieldset-box__button-list"]}>
              <button type="button" className={values.gender === "male" ? styles.active : ""} onClick={() => handleSelectChange("gender", "male")}>
                남
              </button>
              <button
                type="button"
                className={values.gender === "female" ? styles.active : ""}
                onClick={() => handleSelectChange("gender", "female")}
              >
                여
              </button>
            </div>
          </div>
        </fieldset>
      );
    }

    case "email": {
      const handleEmailDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedDomain(value);
        setIsReadOnly(value !== "직접 입력");
        (setValues && handleInputChange(e)) || (handleChange && handleChange(e));
      };

      return (
        <fieldset className={styles["fieldset-box"]} name={name}>
          <label>{userType === "user" ? "이메일" : "학교 이메일"}</label>
          <div className={styles["fieldset-box__list"]}>
            <input
              required={required}
              type="text"
              name="email1"
              value={values.email1}
              onChange={handleChange || handleInputChange}
              readOnly={readOnly}
            />
            <span>@</span>
            <input
              required={required}
              type="text"
              name="email2"
              value={values.email2}
              onChange={handleChange || handleInputChange}
              readOnly={isReadOnly}
            />
            {!readOnly && (
              <select value={selectedDomain} name="email2" onChange={handleEmailDomainChange}>
                {emailOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        </fieldset>
      );
    }

    default:
      return null;
  }
};

export default InputFieldGroup;
