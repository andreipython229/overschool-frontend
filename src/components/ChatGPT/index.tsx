import React, { useState, useRef, useEffect } from 'react';
import {
  SendMessagePayload,
  useSendMessageMutation,
  useLazyFetchLatestMessagesQuery,
  useCreateChatMutation,
  useLazyFetchLatestChatsQuery,
  useLazyFetchWelcomeMessageQuery,
  useUpdateWelcomeMessageMutation,
  useDeleteChatMutation,
  useAssignChatOrderMutation,
  CreateChatPayload,
} from '../../api/chatgptService';

import OverAiIcon from '../../assets/img/common/newIconModal.svg';
import arrowUp from '../../assets/img/common/arrow-up.svg'
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { closeHwModalPath } from 'components/Modal/ModalCheckHomeWork/config/svgIconsPsth';
import { deleteIconPath } from 'components/Questions/config/svgIconPath';


import { aiButtonIcon } from './constants/svgIcon';
import { aiButtonNavIcon, arrowUpNavIcon, messageNavIcon } from './svg/svgIconPath';
import styles from './chatgpt.module.scss';


interface ChatGPTProps {
  openChatModal: () => void;
  closeChatModal: () => void;
}

const ChatGPT: React.FC<ChatGPTProps> = ({ openChatModal, closeChatModal }) => {
  const [messageInput, setMessageInput] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const [chatData, setChatData] = useState<{ [id: number]: { order: number; chat_name: string } }>({});
  const [selectedChatId, setCreatedChatId] = useState<number>();
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingChats, setIsFetchingChats] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [chatsLoaded, setChatsLoaded] = useState(false);
  const [isChatSelectionDisabled, setIsChatSelectionDisabled] = useState(false);
  const [isCreatingChatDisabled, setIsCreatingChatDisabled] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true);
  const [draggedChatId, setDraggedChatId] = useState<number | null>(null);
  const [draggedOverChatId, setDraggedOverChatId] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('RU');

  const [refetchChats, { data: latestChats }] = useLazyFetchLatestChatsQuery();
  const [refetchMessages, { data: latestMessages }] = useLazyFetchLatestMessagesQuery();
  const [fetchWelcomeMessage, { data: welcomeMessageData }] = useLazyFetchWelcomeMessageQuery();

  const [updateWelcomeMessage] = useUpdateWelcomeMessageMutation();
  const [createChatMutation] = useCreateChatMutation();
  const [sendMessage] = useSendMessageMutation();
  const [deleteChat] = useDeleteChatMutation();
  const [assignChatOrder] = useAssignChatOrderMutation();

  const userQuestions = latestMessages && latestMessages[0] && Array.isArray(latestMessages[0]) ? latestMessages[0] : [];
  const botAnswers = latestMessages && latestMessages[1] && Array.isArray(latestMessages[1]) ? latestMessages[1] : [];

  useEffect(() => {
    const fetchData = async () => {
      if (isDialogOpen !== false && selectedChatId == null) {
        setError(null);

        if (showWelcomeMessage !== true) {
          setShowWelcomeMessage(false);
        } else {
          setShowWelcomeMessage(true);
        }

        setIsLoadingMessages(true);
        setIsFetchingChats(true);

        if (!chatsLoaded) {
          await fetchChats();
        }

        setIsFetchingChats(false);

      } else if (isDialogOpen !== false && selectedChatId !== null) {
        setError(null);

        if (showWelcomeMessage !== true) {
          setShowWelcomeMessage(false);
        } else {
          setShowWelcomeMessage(true);
        }

        setIsLoadingMessages(true);
        setIsFetchingChats(true);

        if (!chatsLoaded) {
          await fetchChats();
        }

        setIsFetchingChats(false);

        if (selectedChatId && refetchMessages && isChatSelected) {
          try {
            await refetchMessages({ overai_chat_id: selectedChatId });
            setFocusToBottom();
          } catch (error) {
            setError('Ошибка получения сообщений');
          } finally {
            setIsLoadingMessages(false);
          }
        } else {
          setIsLoadingMessages(false);
        }
      }
    };

    fetchData();
  }, [isDialogOpen, selectedChatId, refetchMessages, isChatSelected, chatsLoaded, showWelcomeMessage, deleteChat]);

  const toggleDialog = async () => {
    setIsDialogOpen(!isDialogOpen);
    setFocusToBottom();
    isDialogOpen ? closeChatModal() : openChatModal();
    const response = await fetchWelcomeMessage();
    if (response.data) {
      setShowWelcomeMessage(response.data.show_welcome_message);
    }
  };

  const setFocusToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpen(false);
      closeChatModal();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(messageInput);
    } else if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setMessageInput(messageInput + '\n');
    }
  };

  const formatBotAnswer = (answer: string): JSX.Element => {
    const escapeHtml = (str: string): string => {
      return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/####/g, '')
        .replace(/\*\*(.*?)\*\*/g, (_, content) => `<strong>${content}</strong>`);
    };
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const replaceCodeBlocks = (_: any, code: string) => {
      const lines = code.trim().split('\n').map((line: string, index: number) => (
        `${line}\n`
      ));
      return `${lines.join('')}`;
    };

    let formattedAnswer = answer.replace(codeBlockRegex, replaceCodeBlocks);

    const codeBlocks = formattedAnswer.split(codeBlockRegex);
    const processedBlocks = codeBlocks.map((block, index) => {
      if (index % 2 === 0) {
        return escapeHtml(block);
      } else {
        return block;
      }
    });

    formattedAnswer = processedBlocks.join('');

    return (
      <div
        dangerouslySetInnerHTML={{ __html: formattedAnswer }}
      />
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFocusToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [latestMessages, isDialogOpen, selectedChatId]);

  const selectChat = (chatId: number) => {
    if (!isChatSelectionDisabled) {
      setCreatedChatId(chatId);
      setIsChatSelected(true);
      setDraggedChatId(chatId);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, chatId: number) => {
    e.dataTransfer.setData('text/plain', '');
    setDraggedChatId(chatId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, chatId: number) => {
    e.preventDefault();
    setDraggedOverChatId(chatId);
  };

  const handleDragEnd = async () => {
    if (draggedChatId !== null && draggedOverChatId !== null && draggedChatId !== draggedOverChatId) {
      const updatedChatDataCopy = JSON.parse(JSON.stringify(chatData));
      const dragOrder = updatedChatDataCopy[draggedChatId].order;
      const dropOrder = updatedChatDataCopy[draggedOverChatId].order;

      Object.keys(updatedChatDataCopy).forEach((chatIdStr) => {
        const chatId = parseInt(chatIdStr, 10);
        const order = updatedChatDataCopy[chatId].order;
        if (order > dragOrder && order <= dropOrder) {
          updatedChatDataCopy[chatId].order -= 1;
        } else if (order < dragOrder && order >= dropOrder) {
          updatedChatDataCopy[chatId].order += 1;
        }
      });

      updatedChatDataCopy[draggedChatId].order = dropOrder;

      await assignChatOrder(updatedChatDataCopy);
      setChatData(updatedChatDataCopy);
      setDraggedChatId(null);
      setDraggedOverChatId(null);
    }
  };

  const handleCreateEmptyChat = async () => {
    setCreatedChatId(1);
    setIsChatSelected(true);
  };

  const createChat = async () => {
    try {
      setIsCreatingChatDisabled(true);
      const convertToCreateChatPayload = (chatData: { [id: number]: { order: number; chat_name: string } }): CreateChatPayload => {
        const orderData = Object.entries(chatData).map(([id, { order }]) => ({ id: Number(id), order }));
        return { orderData };
      };

      const payload: CreateChatPayload = convertToCreateChatPayload(chatData);

      const response = await createChatMutation(payload);
      if ('data' in response && response.data !== undefined) {
        const newChatId = response.data.overai_chat_id;
        await fetchChats();
        setCreatedChatId(newChatId);
        return response.data;
      } else {
        setError('Ошибка при создании чата.');
        return null;
      }
    } catch (error) {
      setError('Ошибка при создании чата.');
      return null;
    } finally {
      setIsCreatingChatDisabled(false);
    }
  };

  const handleCreateChat = async () => {
    if (updateWelcomeMessage !== null) {
      await updateWelcomeMessage();
    }
    await createChat();
    setShowWelcomeMessage(true);
  };

  const fetchChats = async () => {
    try {
      if (refetchChats) {
        const response = await refetchChats();

        if (response.status === 'fulfilled' && response.isSuccess) {

          const receivedChatData = response.data;
          setChatData(receivedChatData);
          setChatsLoaded(true);

        } else {
          setError('Ошибка при получении списка чатов.');
        }
      }
    } catch (error) {
      setError('Ошибка при получении списка чатов.');
    }
  };


  const handleDeleteChat = async (chatId: number) => {
    const orderData = Object.entries(chatData).map(([id, chat]) => ({ id: Number(id), order: chat.order }));
    await deleteChat({ chat_id: chatId, orderData });
    await fetchChats();
    setCreatedChatId(undefined)
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSendMessage = async (messageInput: string) => {
    if (selectedChatId === 1) {
      const response = await createChat();
      setIsLoading(true);
      setIsChatSelectionDisabled(true);
      setIsCreatingChatDisabled(true);
      const payload: SendMessagePayload = {
        message: messageInput,
        overai_chat_id: response?.overai_chat_id,
        language: selectedLanguage
      };

      const botResponseTimeout = setTimeout(() => {
        setError('Генерация сообщения займет некоторое время...');
      }, 10000);

      await sendMessage(payload);

      await refetchMessages({ overai_chat_id: response?.overai_chat_id });

      setMessageInput('');
      setError(null);
      clearTimeout(botResponseTimeout);

      setIsLoading(false);
      setIsChatSelectionDisabled(false);
      setIsCreatingChatDisabled(false);
    }
    if (selectedChatId !== 1 && messageInput.trim() !== '') {
      try {
        setIsLoading(true);
        setIsChatSelectionDisabled(true);
        setIsCreatingChatDisabled(true);

        const payload: SendMessagePayload = {
          message: messageInput,
          overai_chat_id: selectedChatId!,
          language: selectedLanguage
        };

        const botResponseTimeout = setTimeout(() => {
          setError('Генерация сообщения займет некоторое время...');
        }, 10000);

        await sendMessage(payload);

        if (refetchMessages) {
          await refetchMessages({ overai_chat_id: selectedChatId });
        }

        setMessageInput('');
        setError(null);
        clearTimeout(botResponseTimeout);
      } catch (error: unknown) {
        setError('Ошибка при отправке сообщения.');
      } finally {
        setIsLoading(false);
        setIsChatSelectionDisabled(false);
        setIsCreatingChatDisabled(false);
      }

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };






  return (
    <div className="fixed-button">
      <button className={styles.chatGptButton} onClick={toggleDialog}>
        <img className={`${isDialogOpen && styles.chatGptButton_Pushed}`} src={OverAiIcon} alt="OverAI Icon" />
      </button>
      {isDialogOpen && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={`${styles.dialog} ${isDialogOpen && styles.dialogOpen} ${showWelcomeMessage && styles.noGradient}`}>
            {/* <button className={styles.chatgpt_close} onClick={toggleDialog}>
              <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={closeHwModalPath} />
            </button> */}
            <div className={`${styles.contentContainer}`}>
              {!showWelcomeMessage ? (
                <div className={`${styles.welcomeMessage}`}>
                  <p>Вас приветствует искусственный интеллект <b>OVER AI!</b></p>
                  <p>Нажмите кнопку ниже, чтобы перейти в чат и задать свой первый вопрос.</p>
                  <svg width="304" height="304" viewBox="0 0 304 304" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M138.131 0.509144C115.597 2.33314 88.7103 11.3311 70.2292 23.2331C55.1092 32.9701 38.4603 48.6321 27.8752 63.0781C16.3882 78.7531 6.36225 101.698 1.94325 122.421C-0.64775 134.573 -0.64775 169.269 1.94325 181.421C11.6832 227.1 41.1623 266.176 81.4163 286.767C107.292 300.003 134.25 305.511 162.698 303.376C189.073 301.396 213.504 292.926 236.379 277.833C247.962 270.191 269.196 248.94 277.007 237.173C311.699 184.911 311.904 119.675 277.54 67.4211C269.459 55.1331 248.608 34.1601 236.449 26.0901C207.071 6.59015 172.883 -2.30486 138.131 0.509144ZM129.152 3.47814C64.1523 13.5651 13.9843 63.2261 3.11225 128.244C0.59225 143.317 1.46525 170.839 4.92625 185.435C16.7752 235.396 51.5832 274.824 99.6312 292.707C117.466 299.345 127.354 300.922 151.131 300.917C167.855 300.913 173.862 300.535 180.631 299.057C240.171 286.057 284.63 241.976 297.764 182.921C300.732 169.575 301.415 143.322 299.169 128.921C290.581 73.8411 251.146 27.0661 198.745 9.80414C182.868 4.57414 174.301 3.24614 154.131 2.88814C143.681 2.70214 132.44 2.96814 129.152 3.47814ZM135.7 34.4491C102.527 41.4061 77.7452 64.4941 68.4212 97.1321C65.4262 107.615 65.2182 129.374 68.0122 139.921C71.6342 153.595 77.9832 165.184 88.4832 177.288L94.0062 183.656L92.8272 192.788C91.0662 206.423 87.2942 221.818 83.1072 232.452C81.0572 237.66 79.1693 244.041 78.9112 246.632C78.4982 250.787 78.7653 251.641 81.1722 253.871C87.2982 259.549 110.913 269.383 127.131 273.01C136.716 275.154 164.248 276 174.698 274.471C188.259 272.489 190.553 269.521 188.077 257.167C186.282 248.213 185.123 226.691 186.278 223.748C187.118 221.608 187.332 221.661 200.131 227.174C211.532 232.085 213.97 232.783 219.953 232.847C226.59 232.919 226.868 232.82 230.203 229.186C233.541 225.548 233.631 225.23 233.631 217.007C233.631 210.665 234.022 208.173 235.202 206.992C236.067 206.128 237.201 205.421 237.724 205.421C239.609 205.421 240.911 200.813 239.678 198.508C238.696 196.673 238.909 195.879 241.075 193.305C243.863 189.991 244.076 189.138 242.747 186.605C242.261 185.679 241.557 183.074 241.184 180.816L240.504 176.71L246.406 176.175C253.042 175.573 255.992 174.12 257.56 170.678C259.411 166.615 258.813 165.058 251.492 154.862C240.588 139.677 238.676 134.779 237.506 119.026C236.283 102.577 233.818 92.3861 228.287 80.9211C220.055 63.8581 207.201 50.9021 190.131 42.4621C184.631 39.7421 177.431 36.7811 174.131 35.8821C167.087 33.9621 142.412 33.0421 135.7 34.4491ZM134.131 37.0781C114.624 41.2401 97.0052 52.3031 85.2692 67.7611C74.4372 82.0271 68.9012 96.8301 67.9242 114.141C66.5972 137.65 73.9422 158.021 90.4932 176.729C96.3692 183.371 96.4423 183.814 94.0993 198.421C92.0653 211.099 87.4522 228.205 83.5812 237.421C79.8182 246.382 79.6302 250.191 82.8213 252.778C89.8512 258.475 112.481 267.663 127.716 271.006C137.869 273.234 162.976 274.004 174.074 272.429C187.367 270.542 187.988 269.39 185.117 251.921C182.686 237.123 183.284 219.421 186.216 219.421C186.949 219.421 192.794 221.704 199.203 224.495C213.254 230.612 221.171 232.208 226.032 229.901C230.487 227.787 231.631 224.82 231.631 215.374C231.631 207.135 231.663 207.06 237.063 202.628C238.496 201.452 238.495 201.059 237.053 198.269C235.497 195.261 235.525 195.154 238.553 192.562C241.618 189.939 241.629 189.893 240.179 185.921C239.376 183.721 238.699 180.299 238.675 178.316L238.631 174.71L244.893 174.125C253.078 173.361 254.209 172.853 255.69 169.278C256.854 166.469 256.671 165.922 252.793 160.6C245.071 150.006 238.564 138.939 237.105 133.921C236.305 131.171 235.219 122.846 234.69 115.421C233.366 96.8101 228.889 83.3931 219.389 69.5611C211.511 58.0911 196.998 46.8781 182.631 41.1621C168.803 35.6611 148.705 33.9681 134.131 37.0781ZM149.831 58.6211C148.187 60.2651 148.325 62.9221 150.131 64.4211C151.288 65.3811 151.631 68.0391 151.631 76.0431V86.4211H147.631H143.631V80.4801C143.631 77.2121 144.081 74.2611 144.631 73.9211C146.476 72.7811 145.746 68.5921 143.583 67.9061C139.578 66.6351 136.882 71.7241 140.131 74.4211C141.124 75.2451 141.631 77.4831 141.631 81.0431V86.4211H137.631H133.631V80.0761C133.631 75.1421 133.214 73.3541 131.756 72.0341C130.725 71.1011 129.881 69.1801 129.881 67.7651C129.881 63.4671 125.502 62.0851 123.243 65.6711C121.776 68.0001 123.525 70.8041 126.733 71.2671C130.832 71.8581 131.631 73.2891 131.631 80.0431C131.631 86.0191 131.487 86.4211 129.347 86.4211C126.336 86.4211 116.631 96.1761 116.631 99.2021C116.631 101.278 116.189 101.421 109.786 101.421C102.315 101.421 100.116 100.142 99.4723 95.4211C99.1943 93.3861 98.5732 92.9211 96.1312 92.9211C93.7103 92.9211 93.0642 93.3931 92.7862 95.3651C92.4172 97.9781 94.9443 100.622 97.0413 99.8171C97.7103 99.5601 99.0863 100.266 100.099 101.386C101.633 103.081 103.169 103.421 109.286 103.421H116.631V107.421V111.421H112.238C109.256 111.421 107.66 110.939 107.269 109.921C106.953 109.096 105.57 108.421 104.198 108.421C101.198 108.421 99.3783 111.218 100.765 113.697C101.952 115.817 106.482 115.973 107.269 113.921C107.66 112.903 109.256 112.421 112.238 112.421H116.631V116.921V121.421H106.46C98.3903 121.421 95.9102 121.078 94.4562 119.762C90.7672 116.424 85.3202 121.71 88.8312 125.221C90.4752 126.865 93.1322 126.727 94.6312 124.921C95.5912 123.764 98.2493 123.421 106.253 123.421H116.631V127.921V132.421H111.253C107.693 132.421 105.455 131.914 104.631 130.921C103.051 129.017 100.23 128.994 98.6712 130.873C97.2412 132.595 98.1042 136.005 100.169 136.797C101.918 137.468 104.631 136.566 104.631 135.314C104.631 134.823 107.331 134.421 110.631 134.421H116.631V137.921V141.421H110.286C105.272 141.421 103.572 141.829 102.182 143.365C101.215 144.434 99.2783 145.446 97.8783 145.615C92.4272 146.271 92.7502 152.421 98.2342 152.421C100 152.421 100.738 151.73 101.172 149.671C102.279 144.407 102.963 143.938 109.985 143.625C116.547 143.333 116.631 143.362 116.631 145.923C116.631 149.475 125.544 158.421 129.083 158.421C131.583 158.421 131.631 158.559 131.631 165.799C131.631 173.851 130.964 175.037 126.131 175.583C123.725 175.854 123.07 176.452 122.821 178.604C122.371 182.502 125.831 184.221 128.585 181.467C129.686 180.366 130.355 178.865 130.073 178.131C129.791 177.396 130.476 175.966 131.596 174.953C133.291 173.419 133.631 171.883 133.631 165.766V158.421H137.631H141.631V162.814C141.631 165.796 141.149 167.392 140.131 167.783C138.155 168.541 138.208 172.825 140.215 174.491C143.335 177.08 147.616 171.006 144.716 168.106C144.119 167.509 143.631 165.086 143.631 162.721V158.421H147.631H151.631V168.799C151.631 176.947 151.298 179.452 150.083 180.461C146.719 183.252 150.693 189.126 154.381 186.814C156.697 185.362 157.112 182.065 155.179 180.461C153.964 179.452 153.631 176.947 153.631 168.799V158.421H158.131H162.631V163.799C162.631 167.359 162.124 169.597 161.131 170.421C160.306 171.106 159.631 172.727 159.631 174.024C159.631 177.249 164.328 178.557 166.287 175.877C167.995 173.541 167.974 172.907 166.131 171.064C165.157 170.089 164.631 167.611 164.631 163.992V158.421H168.131H171.631V164.766C171.631 169.841 172.031 171.473 173.631 172.921C174.732 173.918 175.631 176.001 175.631 177.557C175.631 179.781 176.196 180.525 178.287 181.049C181.968 181.973 184.277 179.023 182.251 175.983C181.495 174.849 179.972 173.906 178.868 173.889C174.922 173.825 173.631 171.584 173.631 164.799C173.631 158.571 173.693 158.421 176.274 158.421C179.936 158.421 188.631 149.726 188.631 146.064C188.631 143.464 188.743 143.421 195.476 143.421C202.893 143.421 205.631 144.983 205.631 149.215C205.631 152.572 208.959 153.791 211.788 151.469C213.69 149.908 213.924 149.205 213.03 147.734C212.425 146.737 210.784 145.783 209.384 145.615C207.984 145.446 206.047 144.434 205.08 143.365C203.642 141.776 201.98 141.421 195.976 141.421H188.631V137.921C188.631 134.499 188.721 134.421 192.666 134.421C194.886 134.421 197.84 135.167 199.231 136.078C201.636 137.655 201.867 137.629 203.932 135.565C205.648 133.848 205.875 133.029 205.016 131.657C203.566 129.341 198.808 128.795 198.018 130.854C197.599 131.948 196.09 132.421 193.024 132.421H188.631V127.921V123.421H199.009C207.157 123.421 209.662 123.754 210.671 124.969C213.462 128.333 219.336 124.359 217.024 120.671C215.571 118.354 211.792 117.837 211.02 119.851C210.523 121.145 208.5 121.421 199.524 121.421H188.631V117.421V113.421H194.302C198.067 113.421 200.56 113.952 201.719 115.001C204.089 117.146 207.631 115.301 207.631 111.921C207.631 108.251 204.441 106.996 201.33 109.443C199.573 110.826 197.282 111.421 193.723 111.421H188.631V107.421V103.421H194.976C200.066 103.421 201.682 103.023 203.144 101.407C204.154 100.291 205.695 99.6241 206.601 99.9121C207.5 100.197 209.066 99.8231 210.081 99.0811C212.766 97.1181 211.464 92.4211 208.234 92.4211C205.474 92.4211 203.172 94.7831 203.952 96.8141C205.005 99.5591 201.306 101.421 194.802 101.421C188.797 101.421 188.631 101.35 188.631 98.7781C188.631 95.1161 179.936 86.4211 176.274 86.4211C173.674 86.4211 173.631 86.3091 173.631 79.5761C173.631 72.1591 175.193 69.4211 179.425 69.4211C180.599 69.4211 182.037 68.5311 182.619 67.4441C184.153 64.5771 180.475 60.8991 177.608 62.4331C176.515 63.0181 175.631 64.5241 175.631 65.8011C175.631 67.0721 174.731 68.9261 173.631 69.9211C171.977 71.4181 171.631 73.0011 171.631 79.0761V86.4211H168.131C164.709 86.4211 164.631 86.3311 164.631 82.3861C164.631 80.1661 165.377 77.2121 166.288 75.8211C167.858 73.4261 167.837 73.1831 165.91 71.2561C164.231 69.5771 163.503 69.4191 161.753 70.3561C159.277 71.6811 158.859 76.1871 161.131 77.0591C162.149 77.4501 162.631 79.0461 162.631 82.0281V86.4211H158.131H153.631V76.0431C153.631 68.0391 153.974 65.3811 155.131 64.4211C157.946 62.0851 156.28 57.4211 152.631 57.4211C151.751 57.4211 150.491 57.9611 149.831 58.6211ZM151.131 60.4211C150.294 61.7751 151.423 63.4211 153.19 63.4211C153.983 63.4211 154.631 62.5211 154.631 61.4211C154.631 59.3511 152.218 58.6611 151.131 60.4211ZM178.289 64.0961C177.927 64.4581 177.631 65.3541 177.631 66.0881C177.631 67.5771 180.209 67.9131 181.061 66.5341C181.742 65.4331 179.193 63.1921 178.289 64.0961ZM124.631 67.4211C124.631 68.9271 125.153 69.4671 126.381 69.2311C127.344 69.0451 128.131 68.2311 128.131 67.4211C128.131 66.6111 127.344 65.7971 126.381 65.6111C125.153 65.3751 124.631 65.9151 124.631 67.4211ZM140.367 70.0191C139.393 70.9921 140.73 73.4211 142.238 73.4211C143.004 73.4211 143.631 72.5211 143.631 71.4211C143.631 69.5381 141.683 68.7021 140.367 70.0191ZM161.976 72.9641C161.222 74.9301 162.114 75.8331 164.071 75.0821C164.95 74.7451 165.347 73.8441 165.007 72.9591C164.249 70.9831 162.735 70.9861 161.976 72.9641ZM122.839 92.7091L118.631 96.9971V122.421V147.845L122.839 152.133L127.047 156.421H152.631H178.215L182.423 152.133L186.631 147.845V122.421V96.9971L182.423 92.7091L178.215 88.4211H152.631H127.047L122.839 92.7091ZM124.334 94.2131L120.631 98.0051V122.51V147.015L124.423 150.718L128.215 154.421H152.72H177.225L180.928 150.629L184.631 146.837V122.332V97.8271L180.839 94.1241L177.047 90.4211H152.542H128.037L124.334 94.2131ZM125.827 95.7191L122.631 99.0161V122.522V146.029L125.929 149.225L129.226 152.421H152.732H176.239L179.435 149.123L182.631 145.826V122.32V98.8131L179.333 95.6171L176.036 92.4211H152.53H129.023L125.827 95.7191ZM94.7513 94.7761C93.8802 95.8261 93.9362 96.4291 94.9863 97.3011C96.0363 98.1721 96.6392 98.1161 97.5112 97.0661C98.3822 96.0161 98.3262 95.4131 97.2762 94.5411C96.2262 93.6701 95.6233 93.7261 94.7513 94.7761ZM205.821 96.1711C206.007 97.1341 206.821 97.9211 207.631 97.9211C208.441 97.9211 209.255 97.1341 209.441 96.1711C209.677 94.9431 209.137 94.4211 207.631 94.4211C206.125 94.4211 205.585 94.9431 205.821 96.1711ZM137.318 107.226C134.697 109.961 134.631 110.337 134.631 122.421C134.631 134.505 134.697 134.881 137.318 137.616C139.995 140.411 140.054 140.421 153.144 140.421C170.847 140.421 170.631 140.637 170.631 122.911C170.631 110.295 170.576 109.973 167.944 107.226C165.278 104.443 165.159 104.421 152.631 104.421C140.103 104.421 139.984 104.443 137.318 107.226ZM138.286 108.25C136.932 109.746 136.631 112.352 136.631 122.595C136.631 138.916 136.125 138.421 152.805 138.421C169.126 138.421 168.631 138.927 168.631 122.247C168.631 105.926 169.137 106.421 152.457 106.421C141.602 106.421 139.721 106.664 138.286 108.25ZM102.881 110.129C101.137 110.769 101.319 113.087 103.169 113.797C104.06 114.139 104.957 113.735 105.302 112.837C106.006 111.001 104.648 109.481 102.881 110.129ZM201.631 111.814C201.631 113.322 204.06 114.659 205.033 113.685C206.35 112.369 205.514 110.421 203.631 110.421C202.531 110.421 201.631 111.048 201.631 111.814ZM145.185 121.171C144.189 124.333 143.158 127.484 142.895 128.171C142.606 128.927 143.25 129.421 144.524 129.421C145.73 129.421 146.631 128.78 146.631 127.921C146.631 127.006 147.564 126.421 149.024 126.421C150.34 126.421 151.676 127.096 151.993 127.921C152.586 129.468 155.631 130.049 155.631 128.615C155.631 128.172 154.69 125.022 153.539 121.615C151.813 116.505 151.058 115.421 149.222 115.421C147.389 115.421 146.677 116.436 145.185 121.171ZM157.631 122.421C157.631 127.977 157.941 129.421 159.131 129.421C160.321 129.421 160.631 127.977 160.631 122.421C160.631 116.865 160.321 115.421 159.131 115.421C157.941 115.421 157.631 116.865 157.631 122.421ZM148.363 121.336C148.002 122.719 148.292 123.421 149.225 123.421C150.82 123.421 150.986 122.53 149.754 120.586C149.111 119.572 148.778 119.752 148.363 121.336ZM90.2982 121.088C88.9212 122.464 89.7042 124.421 91.6312 124.421C92.9642 124.421 93.6312 123.754 93.6312 122.421C93.6312 120.494 91.6742 119.711 90.2982 121.088ZM212.131 121.421C211.294 122.775 212.423 124.421 214.19 124.421C214.983 124.421 215.631 123.521 215.631 122.421C215.631 120.351 213.218 119.661 212.131 121.421ZM99.8213 133.171C100.007 134.134 100.821 134.921 101.631 134.921C102.441 134.921 103.255 134.134 103.441 133.171C103.677 131.943 103.137 131.421 101.631 131.421C100.125 131.421 99.5853 131.943 99.8213 133.171ZM199.821 133.171C200.007 134.134 200.821 134.921 201.631 134.921C202.441 134.921 203.255 134.134 203.441 133.171C203.677 131.943 203.137 131.421 201.631 131.421C200.125 131.421 199.585 131.943 199.821 133.171ZM96.7272 147.362C95.2162 148.296 95.9122 151.421 97.6312 151.421C99.0952 151.421 100.097 148.487 99.0052 147.395C98.5042 146.894 97.5082 146.879 96.7272 147.362ZM207.631 148.862C207.631 149.655 207.99 150.525 208.429 150.796C209.708 151.587 211.954 149.753 211.2 148.533C210.208 146.927 207.631 147.165 207.631 148.862ZM140.367 170.019C139.428 170.958 140.705 173.421 142.131 173.421C143.557 173.421 144.834 170.958 143.895 170.019C143.567 169.69 142.773 169.421 142.131 169.421C141.489 169.421 140.695 169.69 140.367 170.019ZM161.631 173.421C161.631 174.927 162.153 175.467 163.381 175.231C164.344 175.045 165.131 174.231 165.131 173.421C165.131 172.611 164.344 171.797 163.381 171.611C162.153 171.375 161.631 171.915 161.631 173.421ZM177.631 177.421C177.631 178.927 178.153 179.467 179.381 179.231C180.344 179.045 181.131 178.231 181.131 177.421C181.131 176.611 180.344 175.797 179.381 175.611C178.153 175.375 177.631 175.915 177.631 177.421ZM124.201 178.308C123.292 179.778 126.538 181.914 127.786 180.666C128.375 180.077 128.554 179.106 128.185 178.508C127.375 177.198 124.962 177.076 124.201 178.308ZM151.319 182.067C149.903 183.482 150.704 185.421 152.704 185.421C154.102 185.421 154.672 184.878 154.454 183.754C154.097 181.913 152.39 180.995 151.319 182.067Z" fill="url(#paint0_linear_121_548)" />
                    <defs>
                      <linearGradient id="paint0_linear_121_548" x1="14.5" y1="93.5" x2="295" y2="197" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#04B4FF" />
                        <stop offset="0.505" stopColor="#318AFF" />
                        <stop offset="1" stopColor="#7C46FE" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <button className={styles.createChatButton} onClick={handleCreateChat}>
                    <b>Создать новый чат</b>
                  </button>
                </div>
              ) : (
                <>
                  <div className={`${styles.topPane} ${isDialogOpen && styles.paneOpen}`}>
                    <div className={styles.overAiText}>OVER AI</div>
                    {isFetchingChats ? (
                      <div className={styles.loadingSpinner}>
                        <div className={styles.spinner}></div>
                        <span> Получение чатов...</span>
                      </div>
                    ) : (
                      <>
                        <div className={styles.listOfChatSection}>
                          <button className={styles.createChatButtonModal} onClick={handleCreateEmptyChat} disabled={isCreatingChatDisabled}>
                            <b>+</b>
                          </button>
                          <div
                            className={styles.listOfChatContainer}
                          >
                            {Object.entries(chatData)
                              .sort(([, a], [, b]) => a.order - b.order)
                              .map(([chatId, chatValue]) => (
                                <div
                                  key={chatId}
                                  onClick={() => selectChat(Number(chatId))}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, Number(chatId))}
                                  onDragOver={(e) => handleDragOver(e, Number(chatId))}
                                  onDragEnd={handleDragEnd}
                                  className={`${styles.chatListItem} ${selectedChatId === Number(chatId) ? styles.activeChat : ''} ${draggedOverChatId === Number(chatId) ? styles.draggedOver : ''}`}
                                  style={{ borderRadius: '20px' }}
                                >
                                  <div className={styles.chatListItem_Circle}></div>
                                  <span className={styles.centeredText}>
                                    {`${chatValue.chat_name.length > 25 ? chatValue.chat_name.substring(0, 25) + '...' : chatValue.chat_name}`}
                                    {/* {/* <button className={styles.deleteChatBtn} onClick={() => handleDeleteChat(Number(chatId))}> */}
                                    {/* <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} /> */}
                                    {/* </button> */}
                                  </span>
                                </div>
                              ))}
                          </div>
                          <button className={styles.chatMessageHistoryButton}>
                            <IconSvg path={arrowUpNavIcon} viewBoxSize='0 0 17 17' width={14} height={14} />
                          </button>
                        </div>
                        <div className={styles.chatIndicatorSection}>
                          <div className={styles.chatIndicatorSectionLeft}>
                            <div className={styles.chatIndicatorIcon}>
                              <div className={styles.chatIndicator}></div>
                              <IconSvg path={messageNavIcon} width={15} height={15} viewBoxSize='0 0 15 15'></IconSvg>
                            </div>
                            <p>Чат с ботом</p>
                          </div>
                        </div>
                      </>
                    )}

                  </div>
                  {selectedChatId && (
                    <div className={`${styles.bottomPane} ${isDialogOpen && styles.paneOpen}`}>

                      {isLoadingMessages && selectedChatId !== 1 ? (
                        <div className={styles.loadingSpinner}>
                          <div className={styles.spinner}></div>
                          <span> Загрузка сообщений...</span>
                        </div>
                      ) : (
                        <div className={styles.messageContainer} ref={messageContainerRef}>
                          {userQuestions.map((userQuestion: { sender_question: string }, index: number) => (
                            <div key={index} className={index == 1 ? `${styles.message} first-message` : styles.message}>
                              <div className={styles.messageContainer_user}>
                                <span>
                                  <b>Пользователь</b>
                                  <div className={styles.messageContainer_user_question}>
                                    {userQuestion.sender_question}
                                  </div>
                                </span>
                              </div>
                              {index < botAnswers.length && (
                                <div className={styles.messageContainer_bot_wrapper}>
                                  <div className={styles.chatIndicatorContainer}>
                                    <div className={styles.chatIndicatorIcon}>
                                      <div className={styles.chatIndicator}></div>
                                      <IconSvg path={messageNavIcon} width={24} height={24} viewBoxSize='0 0 24 24'></IconSvg>
                                    </div>
                                  </div>
                                  <div className={styles.messageContainer_bot} key={index} style={{ wordWrap: 'break-word' }}>
                                    <p>OverAi bot</p>
                                    <div className={styles.messageContainer_bot_answer}>
                                      {formatBotAnswer(botAnswers[index].answer)}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {error && (
                        <div className={`${styles.errorContainer} ${error && styles.visible}`}>
                          <span className={styles.errorText}>{error}</span>
                        </div>
                      )}
                      <div className={styles.inputContainer}>
                        {isLoading ? (
                          <div className={styles.loadingSpinner}>
                            <div className={styles.spinner}></div>
                            <span> Генерация сообщения...</span>
                          </div>
                        ) : (
                          <>
                            <textarea
                              rows={1}
                              placeholder="Отправьте сообщение..."
                              value={messageInput}
                              onChange={(e) => setMessageInput(e.target.value)}
                              onKeyDown={handleKeyPress}
                            />
                            <button onClick={() => handleSendMessage(messageInput)} disabled={isChatSelectionDisabled}>
                              <IconSvg path={aiButtonNavIcon} width={20} height={20} viewBoxSize={'0 0 20 20'}></IconSvg>
                              {/* <svg viewBox="0 0 16 13" fill="none" xmlns="http://www.w3 org/2000/svg">
                                <path d="M7.17278 1.21787C7.56956 0.633707 8.43044 0.633706 8.82722 1.21787L15.5994 11.1881C16.0503 11.8521 15.5748 12.75 14.7722 12.75H1.22785C0.425231 12.75 -0.0503452 11.8521 0.400629 11.1881L7.17278 1.21787Z" fill="white"/>
                            </svg> */}
                              Генерировать
                            </button>
                            {/* <div style={{ zIndex: '10000000' }}>
                            <select
                              value={selectedLanguage}
                              onChange={handleLanguageChange}
                              disabled={isChatSelectionDisabled}
                              style={{
                                height: '39px',
                                backgroundColor: '#9b48ed',
                                color: 'white',
                                border: 'none',
                                padding: '5px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                outline: 'none',
                                boxShadow: 'none'
                              }}
                            >
                              <option value="RU">RU</option>
                              <option value="ENG">ENG</option>
                            </select>
                          </div> */}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGPT;