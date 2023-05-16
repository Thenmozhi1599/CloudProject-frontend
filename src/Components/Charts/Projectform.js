import axios from 'axios';
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
import MoreIcon from "@mui/icons-material/MoreVert";
import "../Charts/donut";
import NestedList from "../Dashboard/Sidenav/Sidenav";
import AttackPatterns from '../Attacks/Attackpatterns';

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
          <Projectform />
          <AttackPatterns />
        </div>

        {renderMobileMenu}
        {renderMenu}
      </Box>
    </div>
  );
}

const Projectform = () => {
  const [projectName, setProjectName] = useState('');
  const [awsResourceId, setAwsResourceId] = useState('');
  const [gcpResourceId, setGcpResourceId] = useState('');
  const [azureResourceId, setAzureResourceId] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName || !projectDescription) {
      alert('Please enter all required fields.');
      return;
    }

    const data = {
      projectName,
      awsResourceId,
      gcpResourceId,
      azureResourceId,
      projectDescription,
    };

    try {
      await axios.post('http://localhost:8000/api/projects', data);

      setProjectName('');
      setAwsResourceId('');
      setGcpResourceId('');
      setAzureResourceId('');
      setProjectDescription('');

      const localStorageData = JSON.stringify(data)
      localStorage.setItem('projectform', localStorageData)

      alert('Project details submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting the project details.');
    }
  };

  return (
    <center>
      <form onSubmit={handleSubmit} style={{
        margin: '4rem',
        width: '26vw',
        height: '50vh',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="projectName">Project Name  </label>
          <input
            type="text"
            id="projectName"
            style={{ height: '40px' }}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="awsResourceId">AWS Resource ID  </label>
          <input
            type="text"
            id="awsResourceId"
            style={{ height: '40px' }}
            value={awsResourceId}
            onChange={(e) => setAwsResourceId(e.target.value)}
          />
        </div>
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="gcpResourceId">GCP Resource ID  </label>
          <input
            type="text"
            id="gcpResourceId"
            value={gcpResourceId}
            style={{ height: '40px' }}
            onChange={(e) => setGcpResourceId(e.target.value)}
          />
        </div>
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="azureResourceId">Azure Resource ID  </label>
          <input
            type="text"
            id="azureResourceId"
            value={azureResourceId}
            style={{ height: '40px' }}
            onChange={(e) => setAzureResourceId(e.target.value)}
          />
        </div>
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="projectDescription">Project Description  </label>
          <div>
            <textarea
              id="projectDescription"
              value={projectDescription}
              style={{ height: '60px' }}
              onChange={(e) => setProjectDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <br></br>
        <button type="submit" style={{ width: '150px', alignItems: 'center' }}>Submit</button>
      </form>
    </center>
  );
};

