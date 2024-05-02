import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import "./Editor.css";
import { Controller, useFormContext } from "react-hook-form";

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

interface PropsType {
  name: string;
}

const Editor: React.FC<PropsType> = ({ name }) => {
  const { control, setValue } = useFormContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorChange = (_event: any, editor: ClassicEditor) => {
    const data = editor.getData();
    setValue(name, data);
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value } }) => <CKEditor editor={ClassicEditor} config={editorConfig} data={value} onBlur={handleEditorChange} />}
    />
  );
};

export default Editor;
