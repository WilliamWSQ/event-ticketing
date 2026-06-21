import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 64px 20px;
  overflow-y: auto;
  background: rgba(6, 6, 10, 0.7);
  backdrop-filter: blur(6px);
`;
const Panel = styled.div`
  width: min(560px, 100%);
  background: ${(p) => p.theme.elev};
  border: 1px solid ${(p) => p.theme.line.l12};
  border-radius: ${(p) => p.theme.radius.xl};
  box-shadow: ${(p) => p.theme.shadow.panel};
`;
const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid ${(p) => p.theme.line.l10};
`;
const Title = styled.h2`
  margin: 0;
  font-size: 19px;
  color: #fff;
`;
const Close = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${(p) => p.theme.radius.sm};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${(p) => p.theme.line.l10};
  color: ${(p) => p.theme.color.fg2};
  cursor: pointer;
  &:hover {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.28);
  }
`;
const Body = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid ${(p) => p.theme.line.l10};
`;

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
    <Overlay onClick={onClose}>
      <Panel role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <Head>
          <Title>{title}</Title>
          <Close onClick={onClose} aria-label="Close">
            <X size={18} />
          </Close>
        </Head>
        <Body>{children}</Body>
        {footer && <Footer>{footer}</Footer>}
      </Panel>
    </Overlay>
  );
}
