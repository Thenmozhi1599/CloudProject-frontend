import React, { useState } from "react";
import "./policyselect.css";
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
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../Charts/donut";
import { Doughnut } from "react-chartjs-2";
import DropdownBox from "../Charts/Policyselect";
import Donut from "../Charts/donut";
import Table from "../Charts/Table";
import { props } from "../Charts/Table.js";
import NestedList from "../Dashboard/Sidenav/Sidenav";

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

export default function Dashboard(dataTable) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [selected_chart, set_selected_chart] = useState("chart");

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
    set_selected_chart(e.target.value);
  };

  return (
    <div className="dasb">
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Cloud-Asm
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
            width: "100%",
          }}
        >
          <NestedList style />

          {/* <div
            style={{
              display: "grid",
              padding: "1rem",
            }}
          >
            <DropdownBox handleChange={handleChart} />

            <div
              style={{
                dispaplay: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Donut chart={selected_chart} />
              <Table chart={selected_chart} />
            </div>
          </div> */}
          <Projectform />
        </div>

        {renderMobileMenu}
        {renderMenu}
      </Box>
    </div>
  );
}

function Projectform() {
  const [projectName, setProjectName] = useState("");
  const [numCloudServices, setNumCloudServices] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [projectDescription, setProjectDescription] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // do something with form data
  };

  const handleOptionSelect = (event) => {
    const options = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(options);
  };

  return (
    <form
      className="form-container"
      onSubmit={handleFormSubmit}
      style={{ marginTop: "1.8rem" }}
    >
      <div className="form-group">
        <label htmlFor="project-name">Project Name</label>
        <input
          type="text"
          id="project-name"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="num-cloud-services">
          Number of Cloud Services Used
        </label>
        <input
          type="number"
          id="num-cloud-services"
          value={numCloudServices}
          onChange={(event) => setNumCloudServices(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cloud-services">Cloud Services Used</label>
        <select
          id="cloud-services"
          value={selectedOptions}
          onChange={handleOptionSelect}
          required
        >
          <option value="aws">AWS</option>
          <option value="azure">Azure</option>
          <option value="google-cloud">Google Cloud</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="project-description">Project Description</label>
        <textarea
          id="project-description"
          value={projectDescription}
          onChange={(event) => setProjectDescription(event.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
