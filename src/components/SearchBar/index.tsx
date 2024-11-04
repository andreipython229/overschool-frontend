import styles from './searchBar.module.scss'
import {IconSvg} from "../common/IconSvg/IconSvg";
import {studentsSearchPath} from "../AllStudentsBlock/config/svgIconsPath";
import {TextField} from "@mui/material";
import {FC} from "react";
import {SearchIcon} from "./svgIconsPath";

interface FilterItem {
    id: string | number;
    title: string;
}


interface SearchBarProps {
    searchTerm: string;
    onChangeInput: (value: string) => void;
}


export const SearchBar: FC<SearchBarProps> = ({
                                                  searchTerm,
                                                  onChangeInput,
                                              }) => {

    return (
        <div className={styles.property_1}>
            <div className={styles.sorting}>
                <div className={styles.frame}>
                    <div className={styles.search_icon}>
                        <IconSvg width={30} height={30} viewBoxSize="0 0 30 30" path={studentsSearchPath}>
                            <SearchIcon/>
                        </IconSvg>
                    </div>
                    <TextField
                        variant="standard"
                        value={searchTerm}
                        onChange={e => onChangeInput(e.target.value)}
                        placeholder="Поиск..."
                        InputProps={{
                            disableUnderline: true,
                            style: {
                                color: '#7f7f7f',
                                textAlign: 'left',
                                fontSize: '24px',
                                fontFamily: 'SF Pro Display',
                                alignSelf: 'flex-start',
                                outline: 'none',
                                borderStyle: 'hidden',
                            },
                        }}
                        fullWidth
                    />
                </div>
            </div>
        </div>
    );
};