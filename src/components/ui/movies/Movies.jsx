import { useState, useEffect } from 'react';
import axios from 'axios';
import {Box, Grid, Card, CardMedia, CardContent, Typography, Modal, Stack} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import person1 from '../../../assets/images/person1.jpg'
import person2 from '../../../assets/images/person2.jpg'
import person3 from '../../../assets/images/person3.jpg'


const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (movieId) => {
        setSelectedMovie(null);
        fetchMovieDetails(movieId);
    };

    const handleClose = () => setOpen(false);

    const fetchMovieDetails = async (id) => {
        const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQ3MDk3MzhmMWMwNzg3NTk5NjZkNDgzZGZkYzkxNSIsIm5iZiI6MTcyODQwODMyMi4yNTMxNjEsInN1YiI6IjY3MDU2YTYyMWI5NmI4ZWY0YzY5ZTIzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AaCRMWLaaxtpRI3i_qbPC78rwbmdQku4iDcCQfDNPMw';
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
                {
                    headers: {
                        Authorization: `Bearer ${apiToken}`,
                    },
                }
            );
            setSelectedMovie(response.data);
            setOpen(true);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    useEffect(() => {
        const fetchMovies = async () => {
            const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQ3MDk3MzhmMWMwNzg3NTk5NjZkNDgzZGZkYzkxNSIsIm5iZiI6MTcyODQwODMyMi4yNTMxNjEsInN1YiI6IjY3MDU2YTYyMWI5NmI4ZWY0YzY5ZTIzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AaCRMWLaaxtpRI3i_qbPC78rwbmdQku4iDcCQfDNPMw';
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/discover/movie?language=en-US&page=1',
                    {
                        headers: {
                            Authorization: `Bearer ${apiToken}`,
                        },
                    }
                );
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true,
        className: "slider-space",
        arrows: false,
    };

    const images =[person1, person2, person3]

    return (
        <Box sx={{ backgroundColor: '#39445A', padding: '150px' }}>
            <Typography variant="h4" color="white" gutterBottom textAlign="center" textTransform='uppercase'>
                Trending Today
            </Typography>
            <Grid container spacing={3}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={2.4} key={movie.id}>
                        <Card sx={{
                            backgroundColor: '#2A323E',
                            color: 'white',
                            height: '460px',
                            borderRadius: '10px',
                            transition: 'background-color 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'white',
                                color: 'black',
                            },
                        }}
                              onClick={() => handleOpen(movie.id)}
                        >
                            <Box sx={{ padding: '10px' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    sx={{ borderRadius: '10px' }}
                                />
                            </Box>
                            <CardContent>
                                <Stack height='80px'>
                                    <Typography variant="h6" gutterBottom>
                                        {movie.title}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2} justifyContent="space-between">
                                    <Typography variant="body2" color="gray">
                                        TV Series
                                    </Typography>
                                    <Typography variant="body2" color="gray">
                                        {movie.release_date}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    bgcolor: '#39445A',
                    color: 'white',
                    p: 4,
                    borderRadius: '10px',
                    boxShadow: 24,
                }}>
                    <CloseIcon onClick={handleClose} sx={{float: 'right', cursor: 'pointer'}} />
                    {selectedMovie && (
                        <Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <CardMedia
                                        component="img"
                                        height="650"
                                        sx={{ objectFit: 'contain', width: '100%' }}
                                        image={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                                        alt={selectedMovie.title}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h4" gutterBottom>
                                        {selectedMovie.title} ({new Date(selectedMovie.release_date).getFullYear()})
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {selectedMovie.overview}
                                    </Typography>

                                    <Grid item xs={12}>
                                        <Slider {...settings}>
                                            {images.map((image, index) => (
                                                <Box key={index} sx={{ padding: '10px' }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="450"
                                                        sx={{ objectFit: 'contain', width: '100%' }}
                                                        image={image}
                                                        alt={`Image ${index + 1}`}
                                                    />
                                                </Box>
                                            ))}
                                        </Slider>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default Movies;
