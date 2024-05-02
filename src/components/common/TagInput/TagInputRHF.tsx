import Tags from "@yaireo/tagify/dist/react.tagify"; // React-wrapper file
import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS
import "./TagInput.css";
import { Controller, useFormContext } from "react-hook-form";

const TagInputRHF = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="tags"
      render={({ field }) => (
        <Tags
          defaultValue={field.value}
          onChange={(e) => {
            const values = e.detail.tagify.value.map((item) => item.value);
            field.onChange(values);
          }}
        />
      )}
    />
  );
};

export default TagInputRHF;
