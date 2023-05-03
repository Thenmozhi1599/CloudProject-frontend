import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import {
  Link,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from "react-router-dom";

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const goToProject = () => {
    window.location.href = "/projectform";
  };

  return (
    <List
      sx={{
        height: "100vh",
        width: "100%",
        maxWidth: '350px',
        bgcolor: "#dddd",
      }}
      component="nav"
    >
      <ListItemButton>
        {/* <ListItemIcon></ListItemIcon> */}
        <ListItemText primary="Overview" />
      </ListItemButton>
      <ListItemButton onClick={goToProject}>
        {/* <ListItemIcon></ListItemIcon> */}
        <ListItemText primary="Projects" />
      </ListItemButton>

      <ListItemButton>
        {/* <ListItemIcon></ListItemIcon> */}
        <ListItemText primary="Inventory" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        {/* <ListItemIcon></ListItemIcon> */}
        <ListItemText primary="Security" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" 
      //unmountOnExit
      >
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            {/* <ListItemIcon></ListItemIcon> */}
            <ListItemText primary="Policies" />
          </ListItemButton>
          <ListItemButton>
            {/* <ListItemIcon></ListItemIcon> */}
            <ListItemText primary="Recommendations" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
