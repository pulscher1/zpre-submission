import React, { useEffect, useState } from 'react';
import { Link, useParams, Link as RouterLink } from 'react-router-dom';
import { Button, Card, CardContent,  CardHeader, CircularProgress, 
    Container, Grid, Typography, Box } from '@mui/material';


const InventoryByUserId = () => {
    const { username, user_id, id } = useParams();
    console.log("Is usParams being used correctly?", user_id);
    const [inventory, setInventory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [checkInventory, setCheckInventory] = useState('');

    useEffect(() => {
        console.log('Is the useEffect even running?', user_id);
        //testing to see if user idea is actually making it?

        fetch(`http://localhost:8081/user/${user_id}`)

            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setInventory(data);
                console.log('data from fetch', data);
                if (data.length === 0) {
                    setCheckInventory('No items associated with this user ID. Please add an item.');
                }
                setIsLoading(false);
                console.log('isLoading set to false');
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                setIsLoading(false);
            });
    }, [user_id]);

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Fens Fresh Foods Inventory
            </Typography>
            <Box
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Button
                    sx={{ mt: 3, mb: 3, mr: 2 }}
                    variant="contained"
                    component={RouterLink}
                    to={`/${username}/${user_id}/AddItem`}>
                    Add an Item
                </Button>
                <Button
                    sx={{ mt: 3, mb: 3 }}
                    variant="contained"
                    component={RouterLink}
                    to={`/${username}/${user_id}/FullInventory`}>
                    View Full Inventory
                </Button>
            </Box>
            <Typography variant="h6" gutterBottom>
                Select an item to view more details, edit, or delete an item.
            </Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    {inventory.length > 0 ? (
                        <Grid container spacing={3}>
                            {inventory.map((inventory, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Link to={`/${username}/${user_id}/${inventory.id}`} style={{ textDecoration: "none" }}>
                                        <Card>
                                            <CardHeader title={inventory.item_name} />
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    Quantity: {inventory.quantity}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Description: {inventory.description.length > 100 ? 
                                                    `${inventory.description.slice(0, 100)}...` : inventory.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="body3" gutterBottom>
                            {checkInventory}
                            {/* //reminder - this shows up when there are no items in the inventory */}
                        </Typography>
                    )}
                </>
            )}
        </Container>
    );
};

export default InventoryByUserId;