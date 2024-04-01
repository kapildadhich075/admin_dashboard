import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ProgressCircle from "../../components/ProgressCircle";
import PopulationGraph from "../../components/PopulationGraph";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import { Wallet, WalletTwoTone } from "@mui/icons-material";
import { ethers } from "ethers";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const requestAccount = async () => {
    console.log("Requesting account...");

    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Box
        padding={`20px`}
        display={`flex`}
        flexDirection={`column`}
        alignItems={`center`}
      >
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(1, 1fr)"
          gap="20px"
          width={`100%`}
          maxWidth={`800px`}
        >
          {/* ROW 1 */}
          <Box backgroundColor={colors.primary[400]} borderRadius={2}>
            <Box
              mt="25px"
              p="30px 30px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderRadius={10}
            >
              <Box>
                <Typography
                  variant="h3"
                  fontWeight="800"
                  color={colors.grey[100]}
                >
                  Revenue Generated
                </Typography>
              </Box>
            </Box>
            <Box p={3}>
              <PopulationGraph />
              {/* <LineChart isDashboard={true} /> */}
            </Box>
          </Box>
          <Box backgroundColor={colors.primary[400]} borderRadius={2}>
            <Box
              mt="25px"
              p="30px 30px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderRadius={10}
            >
              <Box>
                <Typography
                  variant="h3"
                  fontWeight="800"
                  color={colors.grey[100]}
                >
                  Wallet
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <Wallet
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                backgroundColor: colors.primary[500],
                padding: "20px",
                cursor: "pointer",
              }}
              height={50}
              margin={2}
              borderRadius={10}
              onClick={requestAccount}
            >
              <IconButton>
                <WalletTwoTone
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
              <Typography
                variant="h3"
                fontWeight="800"
                color={colors.grey[100]}
              >
                Connect Wallet
              </Typography>
            </Box>

            <Typography
              variant="h3"
              fontWeight="800"
              color={colors.grey[100]}
              style={{ textAlign: "center" }}
              p={2}
            >
              Wallet Balance : 0.00
            </Typography>

            <Typography
              variant="h3"
              fontWeight="800"
              color={colors.grey[100]}
              style={{ textAlign: "center" }}
              p={2}
            >
              Wallet Address : {walletAddress}
            </Typography>
          </Box>

          {/* ROW 2 */}
          <Box
            backgroundColor={colors.primary[400]}
            display={`flex`}
            flexDirection={`row`}
            gap={2}
            p={2}
            borderRadius={2}
            justifyContent={`center`}
          >
            {data ? (
              <>
                <Card
                  description={data.bpi.USD.description}
                  code={data.bpi.USD.code}
                  symbol={`$`}
                  rate={data.bpi.USD.rate}
                />
                <Card
                  description={data.bpi.EUR.description}
                  code={data.bpi.EUR.code}
                  symbol={`\u20AC`}
                  rate={data.bpi.EUR.rate}
                />
                <Card
                  description={data.bpi.GBP.description}
                  code={data.bpi.GBP.code}
                  symbol={`\u00A3`}
                  rate={data.bpi.GBP.rate}
                />
              </>
            ) : (
              <ProgressCircle />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
