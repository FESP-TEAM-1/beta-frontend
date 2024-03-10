import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const Editor = React.lazy(() => import('./Editor'));

interface PropsType {
  name: string;
}

const EditorRHF: React.FC<PropsType> = ({ name }) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value } }) => (
        <React.Suspense fallback="로딩 중...">
          <Editor value={value} handleValue={(data: unknown) => setValue(name, data)} />
        </React.Suspense>
      )}
    />
  );
};

export default EditorRHF;
