import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import "./Editor.css";

const LazyCKEditor = React.lazy(async () => {
  const [
    { CKEditor },
    { default: ClassicEditor },
    { default: Essentials },
    { default: Paragraph },
    { default: Heading },
    { default: BlockQuote },
    { default: Link },
    { default: List },
    { default: Bold },
    { default: Italic },
    { default: Underline },
  ] = await Promise.all([
    import("@ckeditor/ckeditor5-react"),
    import("@ckeditor/ckeditor5-editor-classic/src/classiceditor"),
    import("@ckeditor/ckeditor5-essentials/src/essentials"),
    import("@ckeditor/ckeditor5-paragraph/src/paragraph"),
    import("@ckeditor/ckeditor5-heading/src/heading"),
    import("@ckeditor/ckeditor5-block-quote/src/blockquote"),
    import("@ckeditor/ckeditor5-link/src/link"),
    import("@ckeditor/ckeditor5-list/src/list"),
    import("@ckeditor/ckeditor5-basic-styles/src/bold"),
    import("@ckeditor/ckeditor5-basic-styles/src/italic"),
    import("@ckeditor/ckeditor5-basic-styles/src/underline"),
  ]);

  const editorConfig = {
    plugins: [Essentials, Heading, Paragraph, Bold, Italic, Underline, Link, List, BlockQuote],
    toolbar: ["heading", "|", "bold", "italic", "underline", "link", "|", "bulletedList", "numberedList", "|", "undo", "redo"],
    heading: {
      options: [
        { model: "paragraph", title: "본문", class: "ck-heading_paragraph" },
        { model: "heading4", view: "h4", title: "제목1", class: "ck-heading_heading1" },
        { model: "heading5", view: "h5", title: "제목2", class: "ck-heading_heading2" },
        { model: "heading6", view: "h6", title: "제목3", class: "ck-heading_heading3" },
      ],
    },
  };

  return {
    default: ({ value, handleValue }) => (
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data={value}
        onBlur={(_event, editor) => {
          const data = editor.getData();
          handleValue(data);
        }}
      />
    ),
  };
});

interface PropsType {
  name: string;
}

const Editor: React.FC<PropsType> = ({ name }) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value } }) => (
        <React.Suspense fallback="로딩 중...">
          <LazyCKEditor value={value} handleValue={(data: unknown) => setValue(name, data)} />
        </React.Suspense>
      )}
    />
  );
};

export default Editor;
