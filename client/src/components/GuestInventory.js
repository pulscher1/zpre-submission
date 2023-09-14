import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent,  CardHeader, CircularProgress, Container, 
    Grid, Typography } from '@mui/material';

const Inventory = () => {
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
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <Container>
            <Typography variant="h3"  gutterBottom>
                Fens Fresh Foods Inventory
            </Typography>
            <Typography variant="h6"  gutterBottom>
                Select an item to view more details
            </Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={5}>
                    {inventory.map((inventory, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Link to={`/inventory/${inventory.id}`}
                                style={{ textDecoration: "none" }}
                            >
                                <Card>

                                    <CardHeader title={inventory.item_name} />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {inventory.quantity}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {/* Description: {inventory.description.length > 100 ? inventory.description: 
                                                (inventory.description(0, 100) + "..." )} */}
                                            Description: {inventory.description.length > 100 ?
                                                `${inventory.description.slice(0, 100)}...` : inventory.description}
                                        </Typography>
                                    </CardContent>
                                    {/* <Button size="small">More</Button> */}
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Inventory;