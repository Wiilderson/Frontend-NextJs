/**
 * Modal de confirmação
 *
 * - Crie um component para o modal de confirmação
 * - Utilize o código abaixo como base
 * - O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * - O título deve ser "Confirmação"
 * - O conteudo deve ser dinâmico
 */

import { useState } from 'react';

import styles from '@/styles/modal.module.css';
import { ConfirmationModal } from '@/components/Modal/modal-confirmacao';
// import { Modal } from '@/components/Modal';

import toastCss from '@/styles/context-api.module.css';
import { useToast } from '@/components/ToastMessage/ToastContext';
import { ToastMessage } from '@/components/ToastMessage';

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const { messages, addMessage } = useToast();

  function handleModalConfirm() {
    addMessage({
      id: String(new Date().getTime()),
      message: 'Confirmação Realizada!',
      type: 'success',
    });
    setModalIsOpen(false);
  }

  function handleModalOpen() {
    setModalContent('Você tem certeza que deseja realizar essa ação?');
    setModalIsOpen(true);
  }
  function handleModalClose() {
    setModalIsOpen(false);
  }

  function renderModalContent() {
    return (
      <>
        <div data-modal-content className={styles['modal-form']}>
          {modalContent}
        </div>
      </>
    );
  }

  return (
    <>
      <main className={styles.container}>
        <button type="button" onClick={handleModalOpen}>
          Abrir modal de confirmação
        </button>
      </main>

      {/* Renderizar modal de confirmação */}
      <ConfirmationModal
        isOpen={modalIsOpen}
        content={modalContent}
        title="Confirmação"
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      >
        {renderModalContent()}
      </ConfirmationModal>

      <div className={toastCss['toast-container']}>
        {messages.map((message) => (
          <ToastMessage key={message.id} content={message} />
        ))}
      </div>
    </>
  );
}
