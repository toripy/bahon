import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './Ride.css'
import { Link } from "react-router-dom";




const useStyles = makeStyles( {
    root: {
        width: "350px",
        margin: '20px',
        textAlign: "center",
        height: 280,




    },
    media: {
        height: 200,
        backgroundSize: "cover",
        '@media (max-width: 600px)': {
            width: "100%",
            backgroundSize: "contain"
        }

    },
    container: {
        display: "flex",
        justifyContent: "center",
        '@media (max-width: 600px)': {
            display: "block",
            margin: "2px"
        }



    }
} );


const Ride = ( props ) => {


    const classes = useStyles();
    const ride = props.ride;



    return (



        <Box className={classes.container} >

            {
                ride.map( ride => {
                    return <Link key={ride.id} className={classes.root} to={`/ride/${ride.name}`}>
                        <Card >
                            <Box style={{ padding: '0px', width: '100%' }}  >
                                <CardActionArea >
                                    <CardMedia
                                        className={classes.media}
                                        image={ride.image}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography style={{
                                            color: "green",

                                        }} gutterBottom variant="h3" component="h3">
                                            {ride.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Box>
                        </Card>
                    </Link>
                } )
            }

        </Box>



    );
};

export default Ride;