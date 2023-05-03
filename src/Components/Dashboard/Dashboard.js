import React, { createContext } from "react";
import "/home/harih/Desktop/templates/src/App.css";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import NestedList from "./Sidenav/Sidenav";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../Charts/donut";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import DropdownBox from "../Charts/Policyselect";
import Donut from "../Charts/donut";
import Table from "../Charts/Table";
import { props } from "../Charts/Table.js";
import CollapsibleTable from "./Chumma";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export function Dashboard(dataTable) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [selected_chart, set_selected_chart] = useState('chart');

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem></MenuItem>
        <MenuItem></MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    </>
  );

  const handleChart = (e) => {
    set_selected_chart(e.target.value)
  }

  return (
    <div className="dasb">
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <AppBar position="fixed"
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Cloud-asm
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "", md: "flex" } }}>
              <IconButton size="large" aria-label="" color="inherit">
                <Badge badgeContent={0} color="error"></Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            marginTop: "4rem",
            width : "100%",
          }}
        >
          <NestedList style/>

          <div 
            style={{
              display: 'grid',
              padding: "1rem"
            }}
          >

            <DropdownBox  handleChange={handleChart}/>
            
            <div
              style={{
                dispaplay: 'grid',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              <Donut chart={selected_chart} />
              <Table chart={selected_chart} />
            </div>
          </div>
        </div>



        {renderMobileMenu}
        {renderMenu}
      </Box>
    </div>
  );
}


{/* <Grid
container
sx={{
  marginTop: "7vh",
  width: "100vw",
}}

// gridTemplateColumns={"1fr 1fr"}
>
<Grid item width={"15%"}>
  <NestedList />
</Grid>

<Grid item width="85%">
  <Box
    id="Dash-box"
    sx={{
      flexGrow: 1,
      // marginTop: "20vh",
      // marginLeft: "20vw",
    }}
  >
    <DropdownBox handleChange={set_selected_chart} />
    <Grid container style={{ margiLeft: "1.5rem" }}>
      <Grid container spacing={0}>
        <Grid
          item
          // xs={3}
          height={"400px"}
          marginTop={"10px"}
          // width={"500px"}
        >
          <Donut />
        </Grid>

      </Grid>
    </Grid>
  </Box>
</Grid>
</Grid> */}