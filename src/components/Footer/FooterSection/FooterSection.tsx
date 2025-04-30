import { useState } from 'react';
import styles from './FooterSection.module.scss';
import { arrowDownIconPath } from 'config/commonSvgIconsPath';
import { IconSvg } from 'components/common/IconSvg/IconSvg';

type FooterSectionProps = {
  title: string;
  children: React.ReactNode;
};

export const FooterSection = ({ title, children }: FooterSectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className={styles.section}>
      <div
        className={styles.section_header}
        onClick={() => setIsOpen(prev => !prev)}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <h1>{title}</h1>
        <span style={{ marginLeft: '8px' }}>
          {isOpen
              ?<IconSvg path={arrowDownIconPath} viewBoxSize="0 0 22 13" width={22} height={13} className={`${styles.icon} ${isOpen ? styles.rotate : ''}`}/>
              :<IconSvg path={arrowDownIconPath} viewBoxSize="0 0 22 13" width={22} height={13} />}
        </span>
      </div>

      {isOpen && <div className={`${styles.section_content} ${isOpen ? styles.open : styles.closed}`}>{children}</div>}
    </div>
  );
};
