import DOMPurify from "dompurify";

const sanitizeHtml = (html: string) => {
  return DOMPurify.sanitize(html);
};

export default sanitizeHtml;
