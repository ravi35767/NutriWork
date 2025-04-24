import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Stack,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Logo from "../assets/Nutriwork-logo.png";
import HomeBanner from "../assets/Home-banner.jpeg";
import FitnessTrainer from "../assets/Stay-fit.png";
import MarthaJehay from "../assets/Martha-Johny.jpeg";
import Article1 from "../assets/Article-image1.jpeg";
import Article2 from "../assets/Article-image2.jpeg";

// Your theme definition remains the same
const theme = createTheme({
  palette: {
    primary: { main: "#0d6e6e" },
    secondary: { main: "#ff6b6b" },
    background: { default: "#ffffff", paper: "#ffffff" },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
});

function Home() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // This will directly apply styles to center the home component
  useEffect(() => {
    // Get the root div of your application
    const rootDiv = document.getElementById("root");
    if (rootDiv) {
      // Apply the styles
      rootDiv.style.maxWidth = "1200px";
      rootDiv.style.margin = "0 auto";
      rootDiv.style.width = "100%";

      // Clean up function to remove styles when component unmounts
      return () => {
        rootDiv.style.maxWidth = "";
        rootDiv.style.margin = "";
        rootDiv.style.width = "";
      };
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Main layout Box: Ensures full height and column direction */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* AppBar: Sticky at the top */}
        <AppBar
          position="sticky"
          color="default"
          elevation={0}
          sx={{ backgroundColor: "white", borderBottom: "1px solid #eaeaea" }}
        >
          <Container>
            {" "}
            {/* Container for AppBar content */}
            <Toolbar disableGutters>
              {/* Logo */}
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                <Box
                  component="img"
                  src={Logo}
                  alt="NutriWork Logo"
                  sx={{ height: 40, mr: 1 }}
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  NutriWork
                </Typography>
              </Box>

              {/* Desktop Navigation */}
              {!isMobile && (
                <>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button color="inherit" sx={{ mx: 1 }}>
                      HOME
                    </Button>
                    <Button color="inherit" sx={{ mx: 1 }}>
                      FEATURES
                    </Button>
                    <Button color="inherit" sx={{ mx: 1 }}>
                      PRICING
                    </Button>
                    <Button color="inherit" sx={{ mx: 1 }}>
                      FAQ
                    </Button>
                  </Box>
                  <Button variant="contained" color="primary" sx={{ ml: 2 }}>
                    JOIN US
                  </Button>
                </>
              )}

              {/* Mobile Navigation */}
              {isMobile && (
                <>
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>HOME</MenuItem>
                    <MenuItem onClick={handleClose}>FEATURES</MenuItem>
                    <MenuItem onClick={handleClose}>PRICING</MenuItem>
                    <MenuItem onClick={handleClose}>FAQ</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>JOIN US</MenuItem>
                  </Menu>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Main Content Area Wrapper: Takes remaining space */}
        <Box sx={{ flexGrow: 1 }}>
          <Container sx={{ py: 4 }}>
            {" "}
            {/* Container centers content horizontally */}
            {/* Author Profile */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                alt="Martha Jehay"
                src={MarthaJehay}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Martha Jehay
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nutritionist
                </Typography>
              </Box>
            </Box>
            {/* First Article - Nutrition */}
            <Card
              sx={{ mb: 4, boxShadow: "none", border: "1px solid #eaeaea" }}
            >
              <CardMedia
                component="img"
                height="300"
                image={HomeBanner}
                alt="Healthy food"
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  How to stay fit?
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Lorem Ipsum...
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Lorem Ipsum...
                </Typography>
              </CardContent>
            </Card>
            {/* Second Article - Fitness */}
            <Card
              sx={{ mb: 4, boxShadow: "none", border: "1px solid #eaeaea" }}
            >
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold", px: 2, pt: 2 }}
              >
                How to stay fit?
              </Typography>
              {/* --- Fitness Trainer Image (Left Aligned) --- */}
              <CardMedia
                component="img"
                image={FitnessTrainer}
                alt="Person in yoga pose"
                sx={{
                  width: 300, // Set desired width
                  height: "auto", // Maintain aspect ratio
                  // Removed display: 'block' and mx: 'auto' to allow default left alignment
                  my: 2, // Optional vertical margin
                  ml: 2, // Optional: Add left margin if needed within the card padding
                }}
              />
              {/* --- End Fitness Trainer Image --- */}
              <CardContent>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Lorem Ipsum...
                </Typography>
              </CardContent>
            </Card>
            {/* Newsletter Subscription */}
            <Box
              sx={{
                bgcolor: "#084043",
                color: "white",
                p: 2,
                borderRadius: 1,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                mb: 6,
              }}
            >
              <Typography variant="body1" sx={{ mb: { xs: 2, md: 0 } }}>
                Like what you see? Share with a friend.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton size="small" sx={{ color: "white" }}>
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: "white" }}>
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: "white" }}>
                  <InstagramIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            {/* Related Articles Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Typography variant="body2" color="#084043" sx={{ mr: 1 }}>
                  More by Martha Jehay
                </Typography>
                <Box
                  sx={{
                    flexGrow: "initial",
                    height: "5px",
                    width: "20%",
                    bgcolor: "#000",
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Related Articles
              </Typography>
              <Grid container spacing={3}>
                {/* Article Card 1 */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      boxShadow: "none",
                      border: "1px solid #eaeaea",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={Article1}
                      alt="Healthy meal"
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Nutrition
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <FavoriteIcon
                            sx={{
                              fontSize: 14,
                              color: "text.secondary",
                              mr: 0.5,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            8
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        How to eat fit?
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Read More...
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                {/* Article Card 2 */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      boxShadow: "none",
                      border: "1px solid #eaeaea",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={Article2}
                      alt="Healthy meal"
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Nutrition
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <FavoriteIcon
                            sx={{
                              fontSize: 14,
                              color: "text.secondary",
                              mr: 0.5,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            6
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        Lose weight in 4 weeks
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Read More...
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                {/* Article Card 3 */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      boxShadow: "none",
                      border: "1px solid #eaeaea",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={Article1}
                      alt="Healthy meal"
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Nutrition
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <FavoriteIcon
                            sx={{
                              fontSize: 14,
                              color: "text.secondary",
                              mr: 0.5,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            10
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        How to eat healthy
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Read More...
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* Footer: Pushed to bottom */}
        <Box
          component="footer"
          sx={{
            bgcolor: "#1c1c1c",
            color: "white",
            py: 4,
            mt: "auto", // Ensures footer is at the bottom
          }}
        >
          <Container>
            {" "}
            {/* Container for Footer content */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component="img"
                    src={Logo}
                    alt="NutriWork Logo"
                    sx={{ height: 32 }}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#aaa",
                      cursor: "pointer",
                      "&:hover": { color: "white" },
                    }}
                  >
                    HOME
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#aaa",
                      cursor: "pointer",
                      "&:hover": { color: "white" },
                    }}
                  >
                    FEATURES
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#aaa",
                      cursor: "pointer",
                      "&:hover": { color: "white" },
                    }}
                  >
                    PRICING
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#aaa",
                      cursor: "pointer",
                      "&:hover": { color: "white" },
                    }}
                  >
                    FAQ
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" sx={{ color: "white" }}>
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "white" }}>
                    <TwitterIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "white" }}>
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />
            <Typography
              variant="body2"
              align="center"
              sx={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}
            >
              ©{new Date().getFullYear()} All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
