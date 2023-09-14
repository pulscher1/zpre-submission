import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardActions, CardContent, 
  Button, Typography, TextField, Box } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';


const AddItem = ({ item }) => {
  const { username, user_id } = useParams();
  console.log("usParams on addItem page", user_id);
  const [userId, setUserId] = useState(0);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = () => {
    const data = {
      user_id: user_id,
      item_name: itemName,
      description: description,
      quantity: quantity,
    };

    console.log('data enters:', data);

    fetch('http://localhost:8081/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        alert('Item added successfully!');
      })
      .catch((error) => {
        console.error('There was a problem with the POST operation:', error);
      });
  };

  return (
    <Container>
      <Box mt={12}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Add New Item
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="itemName"
                      label="Item Name"
                      variant="outlined"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="Quantity"
                      label="Quantity"
                      variant="outlined"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="Description"
                      label="Description"
                      variant="outlined"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to={`/${username}/${user_id}`}
                  sx={{ ml: 1, boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', mt: 2 }}
                >
                  Add Item
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};


export default AddItem;


