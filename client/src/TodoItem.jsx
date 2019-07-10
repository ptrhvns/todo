import Modal from './Modal';
import Notice from './Notice';
import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from './app-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TodosContext } from './todos-context';
import { faEllipsisH, faTimes } from '@fortawesome/free-solid-svg-icons';
import { get } from 'lodash';
import { useModal } from './use-modal';

export function TodoItem({ todo }) {
  const { serverApi } = useContext(AppContext);
  const { todosDispatch } = useContext(TodosContext);
  const [deleting, setDeleting] = useState(false);
  const [modalState, setModalState] = useModal();

  const handleDelete = useCallback(async () => {
    setDeleting(true);

    try {
      await serverApi.delete({ route: 'todos', routeData: { id: todo.id } });
      todosDispatch({ type: 'todo:delete', id: todo.id });
    } catch (error) {
      const modalContent = (
        <Notice dismissable={false} type="alert">
          {get(error, 'data.message')}
        </Notice>
      );

      setDeleting(false);
      setModalState({ ...modalState, modalContent, showModal: true });
    }
  }, [modalState, serverApi, setDeleting, setModalState, todosDispatch, todo]);

  const handleModalDismiss = useCallback(
    () =>
      setModalState({ ...modalState, modalContent: null, showModal: false }),
    [modalState, setModalState]
  );

  return (
    <>
      <div className="todo-item">
        <span className="description">{todo.description}</span>
        <span className="actions" title="Delete Todo">
          {deleting ? (
            <span className="action-icon">
              <FontAwesomeIcon icon={faEllipsisH} />
            </span>
          ) : (
            <span className="action-delete action-icon" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          )}
        </span>
      </div>
      <Modal
        handleDismiss={handleModalDismiss}
        isOpen={modalState.showModal}
        onRequestClose={handleModalDismiss}
      >
        {modalState.modalContent}
      </Modal>
    </>
  );
}

export default TodoItem;
