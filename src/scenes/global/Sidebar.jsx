import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CorporateFareTwoTone from "@mui/icons-material/CorporateFareTwoTone";
import ViewInAr from "@mui/icons-material/ViewInAr";
import SwapVert from "@mui/icons-material/SwapVert";
import History from "@mui/icons-material/History";
import Wallet from "@mui/icons-material/Wallet";
import MoreVert from "@mui/icons-material/MoreVert";
import { Settings, Support } from "@mui/icons-material";
import Notification from "@mui/icons-material/Notifications";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%", // adjust height as needed
        backgroundColor: theme.palette.primary.main,
        zIndex: 9999, // increase z-index value to ensure it's above other content
        "& .pro-sidebar-inner": {
          background: `${colors.greenAccent[900]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.greenAccent[500]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.redAccent[400]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  color={"#12ff89"}
                  sx={{ fontSize: "25px", fontWeight: "800" }}
                >
                  Carbon Cell
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* SEARCH BAR */}

          {!isCollapsed ? (
            <Box
              display="flex"
              backgroundColor={colors.greenAccent[800]}
              m={2}
              borderRadius="5px"
            >
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{
                  flex: 1,
                  fontWeight: "900",
                }}
                placeholder="Search"
              />
            </Box>
          ) : (
            <Box
              m={2.5}
              borderRadius="60px"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent={"space-between"}
          >
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Organization"
                to="/"
                icon={<CorporateFareTwoTone />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Assets"
                to="/"
                icon={<ViewInAr />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Trade"
                to="/"
                icon={<SwapVert />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="History"
                to="/"
                icon={<History />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Wallet"
                to="/"
                icon={<Wallet />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Notifications"
                to="/"
                icon={<Notification />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Support"
                to="/"
                icon={<Support />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Settings"
                to="/"
                icon={<Settings />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>

            {!isCollapsed ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
                sx={{
                  backgroundColor: colors.greenAccent[800],
                  margin: "20px 20px",
                  padding: "10px",
                  cursor: "pointer",
                }}
                borderRadius={5}
              >
                <Box>
                  <img
                    alt="profile-user"
                    width="50px"
                    height="60px"
                    src={`https://ik.imagekit.io/umdiwr6ma/favicon.png?updatedAt=1706964855989`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box
                  textAlign="left"
                  display="flex"
                  flexDirection="column"
                  mb={1}
                >
                  <Typography
                    variant="h4"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "5px 0 0 0" }}
                  >
                    Joe Dohns
                  </Typography>
                  <Typography variant="h6" color={colors.greenAccent[500]}>
                    admin@ks.in
                  </Typography>
                </Box>

                <Box>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <img
                  alt="profile-user"
                  width="40px"
                  height="40px"
                  src={`https://ik.imagekit.io/umdiwr6ma/favicon.png?updatedAt=1706964855989`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
