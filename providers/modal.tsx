"use client";

import { useState, useRef, useReducer, useEffect, createContext } from "react";

import * as Modal from "@/components/modal";

type ModalStateI = {
  toggleOpen: () => void;
  setContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

export const ModalContext = createContext<ModalStateI>({
  toggleOpen: () => {},
  setContent: () => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [open, toggleOpen] = useReducer((s) => !s, false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<undefined | (() => void)>(undefined);

  useEffect(() => {
    handlerRef.current = open ? toggleOpen : undefined;

    if (open) {
      document.body.classList.add("modal-show");
    } else {
      document.body.classList.remove("modal-show");
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        if (handlerRef.current) handlerRef.current();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return (): void => document.removeEventListener("mousedown", handleClickOutside);
  }, [contentRef]);

  const modalState: ModalStateI = {
    toggleOpen,
    setContent,
  };

  return (
    <ModalContext.Provider value={modalState}>
      {children}
      <Modal.Wrapper open={open}>
        <Modal.Content open={open} ref={contentRef}>
          {content}
        </Modal.Content>
      </Modal.Wrapper>
    </ModalContext.Provider>
  );
};

export default ModalProvider;