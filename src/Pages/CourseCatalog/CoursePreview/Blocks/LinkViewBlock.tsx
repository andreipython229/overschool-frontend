import {useAppDispatch, useAppSelector} from "store/hooks"
import styles from "./styles/LinkVievBlock.module.scss";
import { BlockLinkButton } from 'components/BlockButtons/BlockLinkButton'

export const LinkViewBlock: React.FC = () => {

  const landing = useAppSelector((state) => state.landing.blocks);


  const getButtonData = () => {
    return landing.linkButton;
  };

  const buttonData = getButtonData();

  return (
    <div className={styles.wrapper}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <BlockLinkButton
          color={buttonData.color}
          button={buttonData}
          link={buttonData.link}
          text={buttonData.name}
        />
        <span />
      </div>
    </div>
  );
};