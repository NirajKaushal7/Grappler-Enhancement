import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
// import SubfolderIcon from '@mui/icons-material/Subfolder';

import { ArrowBackIos } from "@mui/icons-material";
import { AiFillDatabase } from "react-icons/ai";

const Folder = ({ folders }) => {
  const [open, setOpen] = useState(false);

  const toggleSubfolders = () => {
    setOpen(!open);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItemButton onClick={toggleSubfolders}>
        <ListItemIcon>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemIcon>
        <ListItemIcon>
          <AiFillDatabase />
        </ListItemIcon>
        <ListItemText primary="Subfolders" />
      </ListItemButton>

      {open && folders && folders.map((folder, index) => (
        <ListItemButton key={index}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={folder.name} />
          {/* You can nest further subfolders here if needed */}
        </ListItemButton>
      ))}
    </List>
  );
};

export default Folder;