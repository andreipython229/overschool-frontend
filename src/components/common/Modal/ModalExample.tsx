import { FC, useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import styles from './ModalExample.module.scss';

export const ModalExample: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<'default' | 'gradient' | 'warning'>('default');

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Button
          text="Обычное модальное окно"
          onClick={() => {
            setVariant('default');
            setIsOpen(true);
          }}
        />
        <Button
          text="Модальное окно с градиентом"
          onClick={() => {
            setVariant('gradient');
            setIsOpen(true);
          }}
        />
        <Button
          text="Модальное окно с предупреждением"
          onClick={() => {
            setVariant('warning');
            setIsOpen(true);
          }}
        />
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Пример модального окна"
        variant={variant}
        width="600px"
      >
        <div className={styles.content}>
          <p>Это пример содержимого модального окна.</p>
          <p>Вы можете добавить сюда любой контент.</p>
          <div className={styles.actions}>
            <Button
              text="Закрыть"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}; 