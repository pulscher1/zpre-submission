// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CircularProgress, Container, Grid, Typography, TextField } from '@mui/material';
// import Button from '@mui/material/Button';
// import { Link as RouterLink } from 'react-router-dom';

// const NewUserItemPage = () => {
//     const { id, username, user_id, itemId } = useParams();
//     console.log('Is usParams being used correctly on items page??', itemId, id);
    
//     return (
//         <div>
//             Item ID: {itemId}
//             User ID: {user_id}
//         </div>
//     );
// };

// export default NewUserItemPage;    



import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CircularProgress, Container, Grid, Typography, TextField, Button } from '@mui/material';


const UserItemPage = () => {
    const nav = useNavigate();
    const { id, username, user_id, itemId } = useParams();
    console.log('Is usParams being used correctly on items page??', itemId, id);
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [edit, setEdit] = useState(false);


    useEffect(() => {
        fetch(`http://localhost:8081/inventory/${itemId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('this should be the data' ,data);
                setItem(data);
                setIsLoading(false);
                console.log('isLoading set to false');
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [id]);


    const handleDelete = () => {
        fetch(`http://localhost:8081/delete/${itemId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            return response.json();
        })
        .then(data => {
            alert('Item deleted successfully!');
            console.log('Item deleted:', data);
            nav(`/${username}/${user_id}`);
            
        })
        .catch(error => {
            console.error('Error during delete:', error);
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
                                                sx={{ mt: 3, mb: 3, rm: 3}}
                                                component={RouterLink} to={`/${username}/${user_id}/${itemId}/Edit`}
                                            >
                                                Edit
                                            </Button>
                                        <Button
                                                variant="contained"
                                                sx={{ mt: 3, mb: 3, rm: 3}}
                                                onClick={handleDelete}
                                            >
                                                Delete
                                            </Button>
                                        <Button
                                                variant="contained"
                                                sx={{ mt: 3, mb: 3 }}
                                                component={RouterLink} to={`/${username}/${user_id}`}
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

export default UserItemPage;