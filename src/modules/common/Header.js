import {
  Container,
  Button,
  Grid,
  ListItemText,
  ListItem,
  List,
  SwipeableDrawer,
  Hidden,
  ListItemButton,
  Divider,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { AuthService } from "../auth/AuthService";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import StarIcon from "@mui/icons-material/Star";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircleIcon from "@mui/icons-material/Circle";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import Tooltip from "@mui/material/Tooltip";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import FlagIcon from "@mui/icons-material/Flag";
import PetsIcon from "@mui/icons-material/Pets";

export default function Header({}) {
  const [redirectTo, setRedirectTo] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () => {
    AuthService.logout();
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {window?.localStorage?.getItem("auth") && (
        <List
          style={{
            backgroundColor: "#0B648A",
          }}
        >
          {["Home", "Pets", "Countries", "Users", "Groups", "Privileges"]
            .filter(
              (key) =>
                (AuthService.hasRole("ROLE_ADMINISTRATOR") &&
                  [
                    "Pets",
                    "Countries",
                    "Users",
                    "Groups",
                    "Privileges",
                  ].includes(key)) ||
                ["Home", "Pets"].includes(key)
            )
            .map((text, index) => (
              <Link
                key={index}
                to={
                  index === 0
                    ? "/"
                    : index === 1
                    ? "/pets"
                    : index === 2
                    ? "/countries"
                    : index === 3
                    ? "/users"
                    : index === 4
                    ? "/groups"
                    : index === 5
                    ? "/privileges"
                    : ""
                }
                style={{
                  textDecoration: "none",
                  color: "#D35400",
                  fontFamily: "Sans-serif, Verdana",
                }}
              >
                <ListItem button key={text}>
                  <ListItemIcon style={{ color: "#FFFFFF" }}>
                    {index === 0 ? (
                      <HomeIcon />
                    ) : index === 1 ? (
                      <CircleIcon />
                    ) : index === 2 ? (
                      <CategoryIcon />
                    ) : index === 3 ? (
                      <FlagIcon />
                    ) : index === 4 ? (
                      <GroupsIcon />
                    ) : index === 5 ? (
                      <StarIcon />
                    ) : index === 6 ? (
                      <PersonIcon />
                    ) : (
                      ""
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          <Divider />
          <Link
            to={`/myprofile/${AuthService.getCurrentUser()?.username}`}
            style={{ textDecoration: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon style={{ color: "#D35400" }} />
              </ListItemIcon>
              <ListItemText
                style={{
                  textDecoration: "none",
                  color: "#D35400",
                  border: "none",
                  fontFamily: "Sans-serif, Verdana",
                }}
                primary={
                  AuthService.getCurrentUser()?.firstName +
                  " " +
                  AuthService.getCurrentUser()?.lastName
                }
              />
            </ListItem>
          </Link>
          <Link to={`/signin`} style={{ textDecoration: "none" }}>
            <ListItem>
              <ListItemIcon>
                <LogoutIcon style={{ color: "#D35400" }} />
              </ListItemIcon>
              <ListItemText
                style={{
                  textDecoration: "none",
                  color: "#D35400",
                  fontFamily: "Monaco, monospace",
                }}
                primary={"Sign Out"}
              />
            </ListItem>
          </Link>
        </List>
      )}

      {!window?.localStorage?.getItem("auth") && (
        <List style={{ backgroundColor: "#0B648A" }}>
          {["Home", "Sign In"].map((text, index) => (
            <Link
              key={index}
              to={index === 0 ? "/" : index === 1 ? "/signin" : ""}
              style={{
                textDecoration: "none",
                color: "#D35400",
                fontFamily: "Monaco, monospace",
              }}
            >
              <ListItem button key={text}>
                <ListItemIcon style={{ color: "#D35400" }}>
                  {index === 0 ? (
                    <HomeIcon />
                  ) : index === 1 ? (
                    <LoginIcon />
                  ) : index === 2 ? (
                    <PersonAddAltOutlinedIcon />
                  ) : index === 4 ? (
                    <LogoutIcon />
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}

      <Hidden mdUp={true}>
        <Grid>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <MenuIcon
                  style={{ color: "#D35400", marginLeft: "-30px" }}
                  sx={{ fontSize: 50 }}
                ></MenuIcon>
              </Button>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))}
        </Grid>
      </Hidden>
      <Hidden mdDown={true}>
        <Grid
          container
          style={{
            backgroundColor: "#0B648A",
            padding: "10px",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <Grid item xs={6} md={0.7}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <PetsIcon
                sx={{ fontSize: 40 }}
                style={{ color: "white" }}
              ></PetsIcon>
            </Link>
          </Grid>
          <Grid item xs={6} md={1}>
            {window?.localStorage?.getItem("auth") && (
              <Link to="/pets" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  variant="outlined"
                  style={{
                    color: "#D9D9D9",
                    border: "none",
                    fontSize: "13px",
                    fontFamily: "Sans-serif , verdana",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginTop: "5px",
                  }}
                >
                  Pets
                </Button>
              </Link>
            )}
          </Grid>
          <Grid item xs={6} md={1}>
            {window?.localStorage?.getItem("auth") &&
              AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                <Link to="/users" style={{ textDecoration: "none" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    style={{
                      color: "#D9D9D9",
                      border: "none",
                      fontSize: "13px",
                      fontFamily: "Sans-serif , verdana",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      marginTop: "5px",
                    }}
                  >
                    USERS
                  </Button>
                </Link>
              )}
          </Grid>
          <Grid item xs={6} md={1}>
            {window?.localStorage?.getItem("auth") &&
              AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                <Link to="/groups" style={{ textDecoration: "none" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    style={{
                      color: "#D9D9D9",
                      border: "none",
                      fontSize: "13px",
                      fontFamily: "Sans-serif , verdana",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      marginTop: "5px",
                    }}
                  >
                    GROUPS
                  </Button>
                </Link>
              )}
          </Grid>
          <Grid item xs={6} md={1}>
            {window?.localStorage?.getItem("auth") &&
              AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                <Link to="/privileges" style={{ textDecoration: "none" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    style={{
                      color: "#D9D9D9",
                      border: "none",
                      fontSize: "13px",
                      fontFamily: "Sans-serif , verdana",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      marginTop: "5px",
                    }}
                  >
                    Privileges
                  </Button>
                </Link>
              )}
          </Grid>

          <Grid item xs={6} md={1}>
            {!window?.localStorage?.getItem("auth") && (
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  variant="outlined"
                  style={{
                    color: "#D9D9D9",
                    border: "none",
                    marginLeft: "500px",
                    fontFamily: "Sans-serif , verdana",
                    fontSize: "16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  sign in
                </Button>
              </Link>
            )}
          </Grid>
          {window?.localStorage?.getItem("auth") && (
            <>
              <Grid md={1}></Grid>
              <Grid
                item
                md={5.1}
                style={{
                  color: "#D9D9D9",
                }}
              >
                <Box sx={{ float: "right" }}>
                  <Tooltip title="Account settings">
                    <Link
                      to={`/myprofile/${
                        AuthService.getCurrentUser()?.username
                      }`}
                      style={{ textDecoration: "none", color: "#D9D9D9" }}
                    >
                      <AccountCircleOutlinedIcon
                        style={{
                          color: "#D35400",
                          verticalAlign: "middle",
                          marginBottom: "3px",
                        }}
                      />{" "}
                      <span
                        style={{
                          lineHeight: "2.5",
                          fontFamily: "Verdana, sans-serif",
                          fontSize: "14px",
                        }}
                      >
                        {AuthService.getCurrentUser()?.firstName}{" "}
                        {AuthService.getCurrentUser()?.lastName}
                      </span>
                    </Link>
                  </Tooltip>

                  <IconButton
                    onClick={handleClick1}
                    size="small"
                    sx={{ ml: 2 }}
                  >
                    <KeyboardArrowDownIcon style={{ color: "white" }} />
                  </IconButton>
                </Box>
                <Menu
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  onClick={handleClose1}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Sign out
                  </MenuItem>

                  {AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                    <Link
                      to="/countries"
                      style={{ textDecoration: "none", color: "#1E1F1C" }}
                    >
                      <MenuItem>
                        <ListItemIcon>
                          <PublicIcon fontSize="small" />
                        </ListItemIcon>
                        Countries
                      </MenuItem>
                    </Link>
                  )}
                </Menu>
              </Grid>
            </>
          )}
        </Grid>
      </Hidden>
    </>
  );
}
