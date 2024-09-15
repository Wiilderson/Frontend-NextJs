import React from 'react';
import styles from './style.module.css';

interface ConfirmationModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  content: string;
  title: string;
  onClose?: (type: 'click' | 'esc', target: EventTarget) => void;
  onConfirm?: () => void;
  footer?: {
    hidden?: boolean;
    confirmText?: string;
    cancelText?: string;
  };
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  children,
  isOpen,
  title,
  ...props
}) => {
  if (!isOpen) return null;

  function handleCloseClick(e: React.MouseEvent) {
    props.onClose?.('click', e.target);
  }

  function handleConfirmClick(e: React.MouseEvent) {
    props.onConfirm?.();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') props.onClose?.('esc', e.target);
  }

  function handleClickInside(e: React.MouseEvent) {
    e.stopPropagation();
  }
  return (
    <>
      <div
        data-modal-wrapper
        className={styles.wrapper}
        onClick={handleCloseClick}
        onKeyDown={handleKeyDown}
      >
        <div data-modal-container onClick={handleClickInside}>
          <header data-modal-header>
            <h2>{title}</h2>

            <button data-modal-close onClick={handleCloseClick}>
              X
            </button>
          </header>

          {children}

          {!props.footer?.hidden && (
            <div data-modal-footer>
              <button data-modal-cancel onClick={handleCloseClick}>
                {props.footer?.cancelText ?? 'Cancelar'}
              </button>

              <button
                data-modal-confirm
                onClick={handleConfirmClick}
                data-type="confirm"
              >
                {props.footer?.confirmText ?? 'Confirmar'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
