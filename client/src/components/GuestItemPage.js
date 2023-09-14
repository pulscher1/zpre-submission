import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CircularProgress, 
    Container, Grid, Typography } from '@mui/material';


const ItemPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    //const [edit, setEdit] = useState(false);



    useEffect(() => {
        fetch(`http://localhost:8081/inventory/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setItem(data);
                setIsLoading(false);
                console.log('isLoading set to false');
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [id]);

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Fens Fresh Foods Item Details
            </Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    {Array.isArray(item) && item.map((currentItem, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardHeader title={currentItem.item_name} />
                                <CardContent>
                                        <>
                                            <Typography variant="body2" color="text.secondary">
                                                Quantity: {currentItem.quantity}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Description: {currentItem.description}
                                            </Typography>
                                        </>
                                        <Button
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                component={RouterLink} to='/Inventory'
                                            >
                                                Back
                                            </Button>
                        
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default ItemPage;