import React, { useEffect, useState } from 'react';
import './Home.css'
import data from '../../FakeData/data.json'
import Ride from '../Ride/Ride';


const Home = () => {
    const [rides, setRides] = useState( [] )
    useEffect( () => {
        setRides( data )
    }, [] )


    return (
        <div>
            {
                <Ride ride={rides}></Ride>
            }
        </div>
    );
};

export default Home;