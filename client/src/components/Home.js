import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Box, Typography } from '@mui/material';


function Home() {
  return (
    // <div>
    //   <h1 style={center} >Welcome to Fens Fresh Food!</h1>
    //   <div>
    <>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <Typography component="h3"  gutterBottom>
          Welcome to Fens Fresh Food!
        </Typography>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button
              sx={{ mt: 3, mb: 3 }}
              variant="contained"
              component={Link} to="/LogIn">
              Log In
            </Button>
            <Button
              sx={{ mt: 3, mb: 3 }}
              variant="contained"
              component={Link} to="/CreateAccount">
              Create an Account
            </Button>
            <Button
              sx={{ mt: 3, mb: 3 }}
              variant="contained"
              component={Link} to="/inventory">
              Continue as a Guest
            </Button>
          </Box>
        </Container>
        </Box>
        </>
    //   </div>
    // </div>
  );
}

export default Home;



