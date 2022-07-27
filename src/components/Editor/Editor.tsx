import React, {memo, MouseEvent, useEffect, useState} from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import styles from './editor.module.scss'

export const MyEditor = memo(() => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const editor = React.useRef(null);

    function focusEditor() {
        // @ts-ignore
        editor.current && editor.current.focus()
    }

    useEffect(() => {
        focusEditor();
    }, []);

    const StyleButton = (props: any) => {
        let onClickButton = (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            props.onToggle(props.style);
        };
        return <button onMouseDown={onClickButton}>{props.label}</button>;
    };

    const BLOCK_TYPES = [
        {
            label: <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.66634 11.3332H6.33301V6.6665H1.66634V11.3332H0.333008V0.666504H1.66634V5.33317H6.33301V0.666504H7.66634V11.3332ZM12.9997 3.33317V11.3332H11.6663V4.8025L10.333 5.15984V3.77984L11.9997 3.33317H12.9997Z"
                    fill="#03053D"/>
            </svg>
            , style: "header-one"
        },
        {
            label: <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.66634 0.666504V5.33317H6.33301V0.666504H7.66634V11.3332H6.33301V6.6665H1.66634V11.3332H0.333008V0.666504H1.66634ZM11.333 3.33317C12.7137 3.33317 13.833 4.4525 13.833 5.83317C13.833 6.4045 13.641 6.93184 13.3183 7.35317L13.2197 7.47317L11.0223 9.99984H13.6663V11.3332H8.99967V10.2958L12.213 6.5985C12.3917 6.39384 12.4997 6.12584 12.4997 5.83317C12.4997 5.18917 11.977 4.6665 11.333 4.6665C10.721 4.6665 10.219 5.13784 10.1703 5.73717L10.1663 5.83317H8.83301C8.83301 4.4525 9.95234 3.33317 11.333 3.33317Z"
                    fill="#03053D"/>
            </svg>
            , style: "header-two"
        },
        {
            label: <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.6663 3.33317L13.665 4.6665L11.995 6.5885C13.055 6.8785 13.833 7.8485 13.833 8.99984C13.833 10.3805 12.7137 11.4998 11.333 11.4998C10.1157 11.4998 9.10168 10.6298 8.87834 9.47784L10.1877 9.22317C10.2917 9.7605 10.765 10.1665 11.333 10.1665C11.977 10.1665 12.4997 9.64384 12.4997 8.99984C12.4997 8.35584 11.977 7.83317 11.333 7.83317C11.1423 7.83317 10.9623 7.87917 10.8037 7.95984L9.93234 6.9285L11.8997 4.6665H8.99967V3.33317H13.6663ZM1.66634 0.666504V5.33317H6.33301V0.666504H7.66634V11.3332H6.33301V6.6665H1.66634V11.3332H0.333008V0.666504H1.66634Z"
                    fill="#03053D"/>
            </svg>
            , style: "header-three"
        },
        {
            label: <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10.9446 1.4525C11.6313 2.18184 11.9999 2.99984 11.9999 4.32584C11.9999 6.65917 10.3619 8.7505 7.97995 9.7845L7.38461 8.86584C9.60795 7.66317 10.0426 6.1025 10.2159 5.1185C9.85795 5.30384 9.38928 5.3685 8.92995 5.32584C7.72728 5.2145 6.77928 4.22717 6.77928 2.99984C6.77928 2.381 7.02511 1.78751 7.4627 1.34992C7.90028 0.912337 8.49378 0.666504 9.11261 0.666504C9.82795 0.666504 10.5119 0.99317 10.9446 1.4525ZM4.27795 1.4525C4.96461 2.18184 5.33328 2.99984 5.33328 4.32584C5.33328 6.65917 3.69528 8.7505 1.31328 9.7845L0.717948 8.86584C2.94128 7.66317 3.37595 6.1025 3.54928 5.1185C3.19128 5.30384 2.72261 5.3685 2.26328 5.32584C1.06061 5.2145 0.113281 4.22717 0.113281 2.99984C0.113281 2.381 0.359114 1.78751 0.796699 1.34992C1.23428 0.912337 1.82778 0.666504 2.44661 0.666504C3.16195 0.666504 3.84595 0.99317 4.27861 1.4525H4.27795Z"
                    fill="#03053D"/>
            </svg>
            , style: "blockquote"
        },
        {
            label: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3.33333 0.666829H12V2.00016H3.33333V0.666829ZM0 0.333496H2V2.3335H0V0.333496ZM0 5.00016H2V7.00016H0V5.00016ZM0 9.66683H2V11.6668H0V9.66683ZM3.33333 5.3335H12V6.66683H3.33333V5.3335ZM3.33333 10.0002H12V11.3335H3.33333V10.0002Z"
                    fill="#03053D"/>
            </svg>
            , style: "unordered-list-item"
        },
        {
            label: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3.33333 0.666667H12V2H3.33333V0.666667ZM1.33333 0V2H2V2.66667H0V2H0.666667V0.666667H0V0H1.33333ZM0 7.33333V5.66667H1.33333V5.33333H0V4.66667H2V6.33333H0.666667V6.66667H2V7.33333H0ZM1.33333 11H0V10.3333H1.33333V10H0V9.33333H2V12H0V11.3333H1.33333V11ZM3.33333 5.33333H12V6.66667H3.33333V5.33333ZM3.33333 10H12V11.3333H3.33333V10Z"
                    fill="#03053D"/>
            </svg>
            , style: "ordered-list-item"
        },
        {
            label: <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16 6L12.2287 9.77133L11.286 8.82867L14.1147 6L11.286 3.17133L12.2287 2.22867L16 6ZM1.88533 6L4.714 8.82867L3.77133 9.77133L0 6L3.77133 2.22867L4.71333 3.17133L1.88533 6ZM6.52533 12H5.10667L9.47467 0H10.8933L6.52533 12Z"
                    fill="#03053D"/>
            </svg>
            , style: "code-block"
        },
        {
            label: <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.375 7.7125L4.125 5.9625L8.9375 10.775L12 7.7125L14.625 10.3375V2.375H2.375V7.7125ZM1.5 0.625H15.5C15.7321 0.625 15.9546 0.717187 16.1187 0.881282C16.2828 1.04538 16.375 1.26794 16.375 1.5V15.5C16.375 15.7321 16.2828 15.9546 16.1187 16.1187C15.9546 16.2828 15.7321 16.375 15.5 16.375H1.5C1.26794 16.375 1.04538 16.2828 0.881282 16.1187C0.717187 15.9546 0.625 15.7321 0.625 15.5V1.5C0.625 1.26794 0.717187 1.04538 0.881282 0.881282C1.04538 0.717187 1.26794 0.625 1.5 0.625ZM11.5625 6.75C11.2144 6.75 10.8806 6.61172 10.6344 6.36558C10.3883 6.11944 10.25 5.7856 10.25 5.4375C10.25 5.0894 10.3883 4.75556 10.6344 4.50942C10.8806 4.26328 11.2144 4.125 11.5625 4.125C11.9106 4.125 12.2444 4.26328 12.4906 4.50942C12.7367 4.75556 12.875 5.0894 12.875 5.4375C12.875 5.7856 12.7367 6.11944 12.4906 6.36558C12.2444 6.61172 11.9106 6.75 11.5625 6.75Z"
                    fill="#03053D"/>
            </svg>
            , style: 'IMAGE'
        },
    ];

    const Image = (props: any) => {
        return <img src={props.src} className={styles.media} alt={'content'}/>;
    };

    const Media = (props: any) => {
        const entity = props.contentState.getEntity(
            props.block.getEntityAt(0)
        );
        const {src} = entity.getData();
        const type = entity.getType();

        let media;
        if (type === 'image') {
            media = <Image src={src}/>;
        }

        return media;
    };

    function mediaBlockRenderer(block: any) {
        if (block.getType() === 'atomic') {
            return {
                component: Media,
                editable: false,
            };
        }

        return null;
    }

    const BlockStyleControls = (props: any) => {
        return (
            <div>
                {BLOCK_TYPES.map((type) => (
                    <StyleButton
                        key={type.label}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    />
                ))}
            </div>
        );
    };

    // const INLINE_STYLES = [
    //     {label: "Bold", style: "BOLD"},
    //     {label: "Italic", style: "ITALIC"},
    //     {label: "Underline", style: "UNDERLINE"},
    //     {label: "Monospace", style: "CODE"}
    // ];

    // const InlineStyleControls = (props: any) => {
    //     return (
    //         <div>
    //             {INLINE_STYLES.map((type) => (
    //                 <StyleButton
    //                     key={type.label}
    //                     label={type.label}
    //                     onToggle={props.onToggle}
    //                     style={type.style}
    //                 />
    //             ))}
    //         </div>
    //     );
    // };

    const onInlineClick = (e: string) => {
        let nextState = RichUtils.toggleInlineStyle(editorState, e);
        setEditorState(nextState);
    };

    const onBlockClick = (e: string) => {
        let nextState = RichUtils.toggleBlockType(editorState, e);
        setEditorState(nextState);
    };

    return (
        <div className={styles.editor} onClick={focusEditor}>
            <div className={styles.editor_panel}>
                <BlockStyleControls onToggle={onBlockClick}/>
                {/*<InlineStyleControls onToggle={onInlineClick}/>*/}
            </div>
            <div className={styles.editor_table}>
                <Editor
                    placeholder={'Введите текст'}
                    ref={editor}
                    blockRendererFn={mediaBlockRenderer}
                    editorState={editorState}
                    onChange={(editorState) => setEditorState(editorState)}
                />
            </div>
        </div>)
})