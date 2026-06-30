import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import * as S from './Modal.styles';

export function Modal({
  title,
  onClose,
  children,
  footer,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <S.Overlay onClick={onClose}>
      <S.Panel role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <S.Head>
          <S.Title>{title}</S.Title>
          <S.Close onClick={onClose} aria-label="Close">
            <X size={18} />
          </S.Close>
        </S.Head>
        <S.Body>{children}</S.Body>
        {footer && <S.Footer>{footer}</S.Footer>}
      </S.Panel>
    </S.Overlay>
  );
}
