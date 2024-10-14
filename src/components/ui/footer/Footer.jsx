import React from 'react';
import { BottomNavigation, BottomNavigationAction} from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Footer.module.css'
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();


    const handleNavigation = (newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/');
                break;
            case 2:
                navigate('/');
                break;
            case 3:
                navigate('/search');
                break;
            default:
                break;
        }
    };


    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => handleNavigation(newValue)}
            sx={{ backgroundColor: '#2d313a', position: 'fixed', bottom: 0, width: '100%' }}
        >
            <BottomNavigationAction className={styles['navigation-color']} label="Trending" icon={<WhatshotIcon />} />
            <BottomNavigationAction className={styles['navigation-color']} label="Movies" icon={<MovieIcon />} />
            <BottomNavigationAction className={styles['navigation-color']} label="TV Series" icon={<TvIcon />} />
            <BottomNavigationAction className={styles['navigation-color']} label="Search" icon={<SearchIcon />} />
        </BottomNavigation>
    );
}

export default Footer;
