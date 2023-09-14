import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, CardHeader, CircularProgress, Container, Grid, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

const UserFullInventory = () => {
    const { username, user_id } = useParams();
    const [inventory, setInventory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8081/inventory')

            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setInventory(data);
                setIsLoading(false);
                console.log('isLoading set to false');
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <Container>
            <Typography variant="h3" component="h1" gutterBottom>
                Fens Fresh Foods Inventory
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Button
                    sx={{ mt: 3, mb: 3, mr: 2 }}
                    variant="contained"
                    component={RouterLink} 
                    to={`/${username}/${user_id}`}>
                    Back
                </Button>
            </Box>
            <Typography variant="h6" component="h1" gutterBottom>
                Select an item to view more details
            </Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    {inventory.map((inventory, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Link to={`/inventory/${inventory.id}`} style={{ textDecoration: "none" }}>
                                <Card>
                                <CardActions>
                                    <CardHeader title={inventory.item_name} />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {inventory.quantity}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {/* Description: {inventory.description.length > 100 ? inventory.description: (inventory.description(0, 100) + "..." )} */}
                                            Description: {inventory.description.length > 100 ? `${inventory.description.slice(0, 100)}...` : inventory.description}
                                        </Typography>
                                    </CardContent>
                                        {/* <Button size="small">More</Button> */}
                                    </CardActions>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default UserFullInventory;