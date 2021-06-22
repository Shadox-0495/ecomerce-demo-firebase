import React , { useState } from "react";
import { TextField , Button , IconButton } from "@material-ui/core";
import { MyLocation } from "@material-ui/icons";
import { GoogleMap , Marker , useJsApiLoader } from '@react-google-maps/api';



function Entregas() {
    const [mapLocations,setMapLocations] = useState([]);

    const containerStyle = {
        width: "100%"
        ,height: "clamp(9rem, 60vw, 60vh)"
      };

      const center = {
        lat: 15.550397781819417
        ,lng: -88.00943662242742
      };

      const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_FIREBASE_API_KEY
      });

      //const [map, setMap] = React.useState(null);

      /*const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
      }, []);

      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, []);*/

      //onLoad={onLoad} onUnmount={onUnmount} defaultOptions={{...mapSettings}}
      //{window.navigator.geolocation.getCurrentPosition(console.log)}
      /**/

    function Prueba(){
        //{ id: 2, title: "Origen", coordinates: { lat: 15.550766257542122, lon: -88.00551871892975 } }
        setMapLocations(oldData => [...oldData, { id: 1, title: "Destino", coordinates: { lat: 15.54933323310234, lon: -88.01283211736204 } }]);
    }

    return (
        <>
            <form className="entrega-ubicacion">
                <div className="ubicacion-origen">
                    <TextField aria-invalid="false" size="small" id="origen" label="Origen" variant="outlined" />
                    <IconButton aria-label="ubicacion_actual"><MyLocation /></IconButton>
                </div>
                <div className="ubicacion-destino">
                    <TextField aria-invalid="false" size="small" id="destino" label="Destino" variant="outlined" />
                    <IconButton aria-label="ubicacion_actual"><MyLocation /></IconButton>
                </div>
                {isLoaded?
                    <GoogleMap  mapContainerStyle={containerStyle}  center={center}  zoom={15} >
                        {mapLocations.map(({ coordinates: { lat, lon: lng }, id }) => (
                            <Marker key={id} position={{ lat, lng }} />
                        ))}
                    <></>
                    </GoogleMap>
                :<></>} 
                <Button variant="contained" color="primary" onClick={Prueba}> Prueba </Button>
            </form>
        </>        
    );
}

export default Entregas;