import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, TextField, Tabs, Tab } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchPage = () => {
    const [type, setType] = useState(0);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQ3MDk3MzhmMWMwNzg3NTk5NjZkNDgzZGZkYzkxNSIsIm5iZiI6MTcyODQwODMyMi4yNTMxNjEsInN1YiI6IjY3MDU2YTYyMWI5NmI4ZWY0YzY5ZTIzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AaCRMWLaaxtpRI3i_qbPC78rwbmdQku4iDcCQfDNPMw';

    const handleSearch = async () => {
        if (!query) return;

        const url = type === 0
            ? `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`
            : `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US`;

        try {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
            });
            setResults(data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [query, type]);

    return (
        <Box sx={{ backgroundColor: '#39445A', padding: '160px', minHeight: '100vh', width: '100%'}}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <TextField
                    variant="outlined"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{ input: { color: 'white' }, width: '50%', border: 'white' }}
                    InputProps={{
                        endAdornment: (
                            <SearchIcon sx={{ cursor: 'pointer', color: 'white' }} onClick={handleSearch} />
                        ),
                    }}
                />
            </Box>

            <Tabs
                value={type}
                onChange={(event, newValue) => setType(newValue)}
                centered
                textColor="white"
                indicatorColor="primary"
            >
                <Tab label="Search Movies" sx={{ color: 'white'}} />
                <Tab label="Search TV Series" sx={{ color: 'white'}}  />
            </Tabs>

            <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                {results.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Box sx={{
                            backgroundColor: '#2A323E',
                            color: 'white',
                            borderRadius: '10px',
                            padding: '10px',
                            transition: 'background-color 0.3s ease',
                            height: '510px',
                            '&:hover': {
                                backgroundColor: 'white',
                                color: 'black',
                            }
                        }}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={item.title || item.name}
                                style={{ width: '100%', borderRadius: '10px' }}
                            />
                            <Typography variant="h6" sx={{ marginTop: '10px' }}>
                                {item.title || item.name}
                            </Typography>
                            <Typography variant="body2" color="gray">
                                {type === 0 ? 'Movie' : 'TV Series'} | {item.release_date || item.first_air_date}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SearchPage;
