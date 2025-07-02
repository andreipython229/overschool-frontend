import { FC, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

export type ModalVariant = 'default' | 'gradient' | 'warning';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  variant?: ModalVariant;
  width?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: 'easeIn' as const,
    },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  variant = 'default',
  width = '600px',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          onClick={handleOverlayClick}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          <motion.div
            className={`${styles.modal} ${styles[variant]} ${className || ''}`}
            style={{ width }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className={styles.header}>
                <h2 id="modal-title" className={styles.title}>
                  {title}
                </h2>
              </div>
            )}
            {showCloseButton && (
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Закрыть"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
            <div className={styles.content}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}; 