import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Typography, 
    Container, Grid, CircularProgress, Box } from '@mui/material';

const Edit = () => {
    const { itemId, username, user_id } = useParams(); 
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8081/inventory/${itemId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setItem(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [itemId]);

    const handleSave = (currentItem) => {
        const updatedItem = {
            item_name: currentItem.item_name,
            quantity: currentItem.quantity,
            description: currentItem.description,
        };

        fetch(`http://localhost:8081/edit/${currentItem.id}`, {
             method: 'PATCH',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(updatedItem),
         })
             .then((response) => {
                 if (!response.ok) {
                     throw new Error('Network response was not ok');
                 }
                 return response.json();
             })
             .then((data) => {  
                alert("Item successfully edited!");  
                nav(`/${username}/${user_id}/${itemId}`);
            })
             .catch((error) => {
                 console.error('Item could not be updated:', error);
             });
    };

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
                        <Grid key={currentItem.id} item xs={12} sm={6}>
                            <Card>
                                <CardContent>
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <Typography variant="body1" mr={2}>
                                            Item Name:
                                        </Typography>
                                        <TextField
                                            value={currentItem.item_name}
                                            onChange={(e) => {
                                                const updatedItem = {
                                                    ...currentItem,
                                                    item_name: e.target.value
                                                };
                                                setItem(prevItems => {
                                                    const updatedItems = [...prevItems];
                                                    updatedItems[index] = updatedItem;
                                                    return updatedItems;
                                                });
                                            }}
                                        />
                                    </Box>
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <Typography variant="body1" mr={2}>
                                            Quantity:
                                        </Typography>
                                        <TextField
                                            value={currentItem.quantity}
                                            onChange={(e) => {
                                                const updatedItem = {
                                                    ...currentItem,
                                                    quantity: e.target.value
                                                };
                                                setItem(prevItems => {
                                                    const updatedItems = [...prevItems];
                                                    updatedItems[index] = updatedItem;
                                                    return updatedItems;
                                                });
                                            }}
                                        />
                                    </Box>
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <Typography variant="body1" mr={2}>
                                            Description:
                                        </Typography>
                                        <TextField
                                            value={currentItem.description}
                                            onChange={(e) => {
                                                const updatedItem = {
                                                    ...currentItem,
                                                    description: e.target.value
                                                };
                                                setItem(prevItems => {
                                                    const updatedItems = [...prevItems];
                                                    updatedItems[index] = updatedItem;
                                                    return updatedItems;
                                                });
                                            }}
                                        />
                                    </Box>
                                </CardContent>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => handleSave(currentItem)}>  {/* Here we pass currentItem to handleSave */}
                                    Save
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Edit;
