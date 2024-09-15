import { useState } from 'react';

import { IToastMessage } from '@/types/toast-message.d';

import styles from './style.module.css';

type ToastMessageProps = {
  content: IToastMessage;
};

export const ToastMessage: React.FC<ToastMessageProps> = ({
  content: data,
}) => {
  function handleClickInside(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div
      className={styles.container}
      data-toast-type={data.type}
      data-toast-id={data.id}
    >
      <span data-content>{data.message}</span>

      <span data-close onClick={handleClickInside}>
        ╳
      </span>
    </div>
  );
};
