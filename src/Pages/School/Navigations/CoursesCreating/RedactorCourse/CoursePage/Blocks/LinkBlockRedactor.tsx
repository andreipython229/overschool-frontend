import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/hooks"
import styles from './styles/LinkButtonRedactor.module.scss'
import { BlockLinkButton } from 'components/BlockButtons/BlockLinkButton'
import { HexColorPicker } from 'react-colorful'
import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import {changeBlocks} from "../../../../../../../store/redux/landing/constructorSlice";
import {TextField} from "@mui/material";


export const LinkBlockRedactor: React.FC = () => {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector(state => state.landing.blocks);
  const linkButton = blocks?.linkButton;

  const [buttonName, setButtonName] = useState<string>(linkButton?.name || '');
  const [buttonLink, setButtonLink] = useState<string>(linkButton?.link || '');
  const [colorPalette, setColorPalette] = useState<string>(linkButton?.color || '');

  // Устанавливаем локальное состояние при изменении linkButton
  useEffect(() => {
    if (linkButton) {
      setButtonName(linkButton.name || '');
      setButtonLink(linkButton.link || '');
      setColorPalette(linkButton.color || '');
    }
  }, [linkButton]);

  useEffect(() => {
    if (linkButton) {
      const updatedLinkButton = {
        ...linkButton,
        name: buttonName,
        link: buttonLink,
        color: colorPalette,
      };

      // Проверяем, изменился ли блок перед отправкой
      if (
        linkButton.name !== updatedLinkButton.name ||
        linkButton.link !== updatedLinkButton.link ||
        linkButton.color !== updatedLinkButton.color
      ) {
        dispatch(
          changeBlocks({
            ...blocks,
            linkButton: updatedLinkButton,
          })
        );
      }
    }
  }, [buttonName, buttonLink, colorPalette, linkButton, blocks, dispatch]);

  if (!linkButton) {
    return <p>Кнопка не найдена.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className={styles.text}>Превью вашей кнопки:</p>
        <BlockLinkButton color={colorPalette} button={linkButton} link={buttonLink} text={buttonName} />
        <span />
      </div>
      <span style={{ border: '1px solid #ba75ff', height: '100%', width: '0.2px', opacity: '0.4' }} />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', gap: '20px' }}>
        <p className={styles.text}>Цвет фона:</p>
        <HexColorPicker color={colorPalette} onChange={setColorPalette} />
        <span />
      </div>
      <span style={{ border: '1px solid #ba75ff', height: '100%', width: '0.2px', opacity: '0.4' }} />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'flex-start', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-start', gap: '10px' }}>
          <p className={styles.text}>Текст кнопки:</p>
          <TextField
            value={buttonName}
            onChange={e => setButtonName(e.target.value)}
            required
            type="text"
            placeholder="Введите текст"
            fullWidth
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-start', gap: '10px' }}>
          <p className={styles.text}>Ссылка:</p>
          <TextField
            value={buttonLink}
            onChange={e => setButtonLink(e.target.value)}
            required
            type="text"
            placeholder="Вставьте ссылку"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};