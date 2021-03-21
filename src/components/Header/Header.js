import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles( {
    header: {
        display: "flex",
        '@media (max-width: 600px)': {
            display: "inline-block",

        },


    }
} )

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext( UserContext );

    const classes = useStyles();


    return (

        <Box className={classes.header} p={1}>
            <Box p={1} flexGrow={1} >
                <Link to="/home"><h2 >Bahon</h2></Link>
            </Box>
            <Box p={1} >
                <Link to="/home"><h5>Home</h5></Link>
            </Box>
            <Box p={1} >
                <Link to="/destination"><h5>Destination</h5></Link>
            </Box>
            <Box p={1} >
                <Link to="/blog"><h5>Blog</h5></Link>
            </Box>
            <Box p={1} >
                <Link to="/contact"><h5>Contact</h5></Link>
            </Box>
            <Box p={1} >
                {
                    loggedInUser.displayName || loggedInUser.name || <Link to="/login"><Button variant="contained" color="secondary">Log in</Button></Link>
                }
            </Box>
        </Box>
    );
};


export default Header;