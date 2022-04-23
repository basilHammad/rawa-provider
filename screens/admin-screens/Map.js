import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = ({ route }) => {
  const { latitude, longitude, name, title } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={name}
        />
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
