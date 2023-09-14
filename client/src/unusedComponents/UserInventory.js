import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, CardHeader, CircularProgress, Container, Grid, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UserInventory = () => {
    const { username } = useParams();
    const [inventory, setInventory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log('Fetching inventory for username:', username);

    useEffect(() => {
        fetch(`http://localhost:8081/itemsByUser/${username}`, {
            credentials: 'include',
        })

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
    }, [username]);

    return (
        <Container>
            <Typography variant="h3" component="h1" gutterBottom>
                Fens Fresh Foods Inventory
            </Typography>
            <Button size="small" component={RouterLink} to="/AddItem" >Add an Item</Button>
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

export default UserInventory;