import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Header from "../../components/Header";
import Button from "@mui/material/Button";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      p={2}
      marginLeft={"10%"}
      marginRight={"10%"}
    >
      {/* SEARCH BAR */}
      <Box display="flex" borderRadius="3px">
        <Header
          title="Hello, Brooklyn Simmons 👋"
          subtitle="Welcome to Spot Trading"
        />
      </Box>

      {/* ICONS */}
      <Box alignItems="start" gap={2} display="flex">
        <Box>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ fontSize: "15px", fontWeight: "600" }}
          >
            Start Trading
          </Button>
        </Box>
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{
            marginTop: "5px",
          }}
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
