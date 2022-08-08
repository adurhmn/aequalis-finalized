//Third party imports
import { styled } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";

//Custom imports
import { authSliceActions } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { userdataSliceActions } from "../store/userdataSlice";

const StyledNav = styled("nav")`
  background-color: #333940;
  padding: 1.5rem;
  margin-bottom: 4rem;
  display: grid;
  grid-template-columns: auto 1fr;
`;

const StyledLogo = styled("span")`
  color: white;
  font-size: 2.2rem;
  font-weight: lighter;
`;

const NavLinkContainer = styled("ul")`
  margin-left: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Box)`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;

  &:hover {
    color: white;
  }
`;

const NavActions = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.authenticatedUser);
  const path = location.pathname;

  if (path === "/") return null;

  return (
    <NavLinkContainer>
      <NavLink
        sx={() => {
          return path === "/home/users" ? { color: "white" } : {};
        }}
        component="li"
      >
        <Link to="/home/users">Users</Link>
      </NavLink>
      <NavLink
        sx={() => {
          return path === "/home/networks" ? { color: "white" } : {};
        }}
        component="li"
      >
        <Link to="/home/networks">Networks</Link>
      </NavLink>
      <NavLink
        sx={{
          marginLeft: "auto",
          marginRight: "5rem",
        }}
        component="li"
        onClick={() => {
          dispatch(authSliceActions.logout());
          dispatch(
            userdataSliceActions.setUserStatus({
              username: currentUser,
              status: "Logged Out",
            })
          );
        }}
      >
        <Link to="/">Log Out</Link>
      </NavLink>
    </NavLinkContainer>
  );
};

const PrimaryNavbar = () => {
  return (
    <StyledNav>
      <StyledLogo>Aequalis</StyledLogo>
      <NavActions />
    </StyledNav>
  );
};

export default PrimaryNavbar;
