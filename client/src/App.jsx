import { Route, Routes } from "react-router-dom";
import { Container, AppBar, Typography, Grow, Grid2 } from "@mui/material";
import Recipes from "./components/Recipes/Recipes";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        {/* Container is to center elements*/}
        <AppBar position="static" color="inherit">
          {/* Web page title*/}
          <Typography variant="h2" align="center">
            Recipe Book
          </Typography>
          {/* Grow is for animations, has property to grow in */}
          <Grow in>
            <Container>
              {/* Grid contained then contains grid items */}
              <Grid2
                container
                justify="space-between"
                alignItems="stretch"
                spacing={3}
              >
                {/* Makw the item take the full space on very small device but 7/12 space on small and medium devices*/}
                <Grid2 item xs={12} sm={7}>
                  <Recipes />
                </Grid2>
              </Grid2>
            </Container>
          </Grow>
        </AppBar>
      </Container>
      {/* 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      */}
    </>
  );
}

export default App;
