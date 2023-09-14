import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, CardHeader, CircularProgress, 
    Container, Grid, Typography } from '@mui/material';

const TestInventory = () => {
    const [testInventory, setTestInventory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8081/TestInventory')

            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setTestInventory(data);
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
            <Typography variant="h6" component="h1" gutterBottom>
                Select an item to view more details
            </Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    {testInventory.map((testInventory, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Link to={`/inventory/${testInventory.id}`} style={{ textDecoration: "none" }}>
                                <Card>
                                <CardActions>
                                    <CardHeader title={testInventory.item_name} />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {testInventory.quantity}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {/* Description: {inventory.description.length > 100 ? inventory.description: (inventory.description(0, 100) + "..." )} */}
                                            Description: {testInventory.description.length > 100 ? `${testInventory.description.slice(0, 100)}...` : testInventory.description}
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

export default TestInventory;