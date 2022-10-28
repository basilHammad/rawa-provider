import { Button, View } from "react-native";
import { createOpenLink } from "react-native-open-maps";

export default function OpenMapBtn() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        color={"#bdc3c7"}
        onPress={createOpenLink({
          start: "",
          end: "31.96663144213858, 35.845153646494055",
          navigate: true,
        })}
        title="Click To Open Maps 🗺"
      />
    </View>
  );
}
