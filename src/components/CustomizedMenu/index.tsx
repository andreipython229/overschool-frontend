import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import CalculateIcon from '@mui/icons-material/Calculate';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {IconButton} from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import CodeIcon from '@mui/icons-material/Code';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 22,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus({ blockCreateFunc, disabled }: { blockCreateFunc: (type: string) => void; disabled: boolean; }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    const handleMenuItemClick = (type: string) => {
    blockCreateFunc(type);
    handleClose(); // Close the menu after selecting a MenuItem
  }

  return (
    <div>
      <IconButton
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={disabled}
        style={{ backgroundColor: open ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}
      >
        <AddIcon fontSize="large"/>
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('description')} disableRipple >
          <NotesIcon />
          Текст
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('video')} disableRipple >
          <PlayCircleIcon />
          Видео
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('code')} disableRipple >
          <CodeIcon />
          Код
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('picture')} disableRipple >
          <InsertPhotoIcon />
          Картинка
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('formula')} disableRipple >
          <CalculateIcon />
          Формула
        </MenuItem>
      </StyledMenu>
    </div>
  );
}