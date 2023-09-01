import { Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearToken, setTheme } from "../../data-store/actions/actionCreators";
import useToastMessage from "../../hooks/useToastMessage";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const { showToastSuccess } = useToastMessage();

  const open = Boolean(anchorEl);
  const themes = ["light", "dark", "pink", "orange"];

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch(clearToken()).then(() =>
      showToastSuccess("Logged out successfully")
    );
  };
  const selectTheme = (index) => {
    setSelectedIndex(index);
    dispatch(setTheme({ theme: themes[index] }));
  };
  return (
    <nav className="navbar">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Select Theme
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {themes.map((theme, index) => (
          <MenuItem
            key={theme}
            selected={index === selectedIndex}
            onClick={() => selectTheme(index)}
          >
            {theme}
          </MenuItem>
        ))}
      </Menu>
      {isLoggedIn ? (
        <span className="avatar">
          <span className="name">{user?.name}</span>
          <span onClick={handleLogout} className="logout">
            <i className="fa-solid fa-right-to-bracket"></i>
          </span>
        </span>
      ) : (
        <>
          <Link to="/login">
            <i className="fa-solid fa-right-to-bracket"></i> Login
          </Link>
          <Link to="/register">
            <i className="fa-solid fa-user-plus"></i> Register
          </Link>
        </>
      )}
    </nav>
  );
};
export default Navbar;
