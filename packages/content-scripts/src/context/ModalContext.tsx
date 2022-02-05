import React, { useState, useCallback, createContext } from "react";
import { ModalContextType } from "../utils/types";

export const ModalContext = createContext<ModalContextType>(null);

export const ModalContextWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [isOpen, toggleModal] = useState(false);
  const [parentId, setParentId] = useState<string>();

  const openModal = useCallback((parentId: string) => {
    toggleModal(true);
    setParentId(parentId);
  }, []);

  const closeModal = useCallback(() => {
    toggleModal(false);
    setParentId(undefined);
  }, []);

  const value = {
    isOpen,
    parentId,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
