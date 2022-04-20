import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = ({ route }) => {
  const { latitude, longitude, name, coordinates } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 32.06287768249983,
          longitude: 35.836628965783056,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: 32.06287768249983,
            longitude: 35.836628965783056,
          }}
          title={"current location"}
        />
        {coordinates.map((coor, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: coor.lat,
              longitude: coor.long,
            }}
            title={coor.name}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
