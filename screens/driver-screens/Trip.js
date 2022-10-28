import { StyleSheet, FlatList } from "react-native";

import Container from "../../components/Container";
import DelOrder from "../../components/DelOrder";
import { COLORS } from "../../constants";

const Trip = ({ route }) => {
  const { orders } = route.params;

  // ! get Order by trip id here and sort them

  return (
    <Container style={stl.container}>
      <FlatList
        data={orders}
        renderItem={({ item, index }) => (
          <DelOrder
            item={item}
            index={index}
            length={orders.length}
            handleCheckboxChange={null}
            selectedOrdersIds={null}
            showsVerticalScrollIndicator={false}
          />
        )}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 50 }}
      />
    </Container>
  );
};

const stl = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
  },
});

export default Trip;
