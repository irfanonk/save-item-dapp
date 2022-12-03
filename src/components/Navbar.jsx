import React, { useContext } from "react";
import { web3Context } from "../context/web3Context";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { formatAddress, formatBalance } from "../utils/helperUtils";
import { ButtonGroup, Button } from "@mui/material";

const pages = ["Add"];

const Navbar = () => {
  const { networkId, account, isSupportMetaMask, requestAccount, userBalance } =
    useContext(web3Context);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link component={RouterLink} to="/">
            <Avatar
              alt="Metamask"
              src=""
              sx={{
                cursor: "pointer",
                width: 56,
                height: 56,
                display: { xs: "none", md: "flex" },
              }}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Typography textAlign="center">{"Home"}</Typography>
              </MenuItem>
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link component={RouterLink} to="/add-item">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Add
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!isSupportMetaMask ? (
              <Link
                href="https://metamask.io"
                target="_blank"
                rel="noopenner noreferrer"
                underline="none"
              >
                <Typography color={"white"} noWrap component="div">
                  Install Metamask
                </Typography>
              </Link>
            ) : !account ? (
              <Tooltip title="Connect">
                <IconButton onClick={requestAccount} sx={{ p: 0 }}>
                  <Avatar
                    alt="Metamask"
                    src={require("../assets/images/metamask.png")}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: { xs: 1, md: 2 },
                    padding: { xs: 1, md: 2 },
                    backgroundColor: "primary.dark",
                    "&:hover": {
                      backgroundColor: "secondary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  <Typography color={"white"} noWrap component="div">
                    {userBalance && formatBalance(userBalance)}
                  </Typography>
                  <Typography color={"white"} noWrap component="div">
                    {account && formatAddress(account)}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
