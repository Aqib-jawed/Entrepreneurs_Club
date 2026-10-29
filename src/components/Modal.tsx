"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

/** Shared native dialog: browser focus trapping, Escape support, scroll lock, and focus restore. */
export default function Modal({ open, title, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollPosition = useRef(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      scrollPosition.current = window.scrollY;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="shared-modal"
      aria-labelledby="shared-modal-title"
      onClose={() => {
        if (window.scrollY !== scrollPosition.current) window.scrollTo(0, scrollPosition.current);
        onClose();
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="shared-modal__header">
        <h2 id="shared-modal-title">{title}</h2>
        <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog">×</button>
      </div>
      <div className="shared-modal__content">{children}</div>
    </dialog>
  );
}
