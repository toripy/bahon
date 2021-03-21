
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import "./RideItem.css"
import { useParams } from 'react-router';

const libraries = ["places"]
const mapContainerStyle = {
    width: "70vw",
    height: "60vh",
    marginRight: "10px",
}
const center = {
    lat: 23.810331,
    lng: 90.412521
}
const RideItem = () => {

    const { isLoaded, loadError } = useLoadScript( {
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    } );
    if ( loadError ) return "Error loading maps"
    if ( !isLoaded ) return "loading Maps"
    return (

        <div className="change" >
            <div className="search" >
                <div className="searchContainer">
                    <input type="text" name="" id="" placeholder="from" />
                    <br />
                    <input type="text" placeholder="to" />
                    <br />
                    <button >Search</button>
                </div>
            </div>
            <div className="map">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={8} center={center}

                ></GoogleMap>

            </div>

        </div>
    );
};

export default RideItem;