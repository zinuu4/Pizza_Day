import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = ({ lat, lng }) => {
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  return (
    <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={{ lat, lng }}>
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

export default Map;
