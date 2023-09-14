import React from 'react';
import { Button, CssBaseline, TextField,  Grid, Box, Typography, 
  Container, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export default function CreateAccount() {
  const nav = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const accountData = {
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      username: data.get('username'),
      password: data.get('password'),
    };
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });

    fetch('http://localhost:8081/createAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        alert('Account created!');
        nav('/LogIn');
      })
      .catch((error) => {
        console.error('There was a problem with the POST operation:', error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h3">
            Create an Account
          </Typography>
          <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName" required fullWidth id="firstName" label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName" required fullWidth id="lastName" label="Last Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="username" required fullWidth id="username" label="username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="password" required fullWidth id="password" label="Password" type="password"
                />
              </Grid>
            </Grid>
            <Button
              sx={{ mt: 3, mb: 3 }}
              type="submit" fullWidth variant="contained"
              //this works, but will also work if creation fails...
              //Button component={RouterLink} to="/LogIn"
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}