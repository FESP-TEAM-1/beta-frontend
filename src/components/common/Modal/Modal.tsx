import React from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "@/stores";
import { usePreventScroll } from "@/hooks";
import classNames from "classnames/bind";
import styles from "./Modal.module.css";

const cx = classNames.bind(styles);

interface PropsType {
  children: React.ReactNode;
  width?: string;
  height?: string;
  title: string;
  titleHidden?: boolean;
}

const Modal: React.FC<PropsType> = ({ children, width, height, title, titleHidden = false }) => {
  const { setOpenModal } = useModalStore();

  usePreventScroll({ isModal: true });

  const closeModal = (e: React.MouseEvent) => {
    const targetClassName = (e.target as HTMLElement).className;

    if (targetClassName.includes("modal-background") || targetClassName.includes("modal__close")) {
      setOpenModal({ state: false, type: "" });
    }
  };

  const renderModal = (
    <div className={styles["modal-background"]} onClick={closeModal}>
      <article className={styles["modal"]} style={{ maxWidth: width, maxHeight: height }}>
        <button onClick={closeModal} className={styles["modal__close"]}></button>
        <h1>
          <span className={cx(titleHidden && "a11y-hidden")}>{title}</span>
        </h1>
        <div>{children}</div>
      </article>
    </div>
  );

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element with ID 'root' not found.");
    return null;
  }

  return createPortal(renderModal, rootElement);
};

export default Modal;
