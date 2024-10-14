import {Box, Typography} from "@mui/material";
import styles from "./Header.module.css";

const Header = () => {
    return (
        <Box className={styles['header']}>
            <Typography variant="h3" className={styles['header-text']}>🎬 Entertainment Hub 📽</Typography >
        </Box>
    );
};

export default Header;