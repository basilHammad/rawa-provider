import { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import RadioForm, {
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";
import { closeKeyboard } from "../utils";
import { Btn } from "./Buttons";
import Input from "./Input";

// const drivers = [
//   { label: "driver 1 ", id: 1 },
//   { label: "driver 2 ", id: 2 },
//   { label: "driver 3 ", id: 3 },
//   { label: "driver 4 ", id: 4 },
//   { label: "driver 5 ", id: 5 },
//   { label: "driver 6 ", id: 6 },
// ];

const AssignDriverModal = ({
  modal,
  setModal,
  note,
  setNote,
  assignDriver,
  loading,
  drivers,
}) => {
  const [error, setError] = useState("");

  const handelSubmit = () => {
    if (!modal.selectedDriver) {
      setError("please select a driver");
      return;
    }

    assignDriver(
      modal.selectidTripId,
      modal.selectedDriver,
      note,
      setError,
      () =>
        setModal({
          isShown: false,
          selectidTripId: null,
          shouldFetchTrips: true,
          selectedDriver: null,
        })
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modal.isShown && modal.selectidTripId ? true : false}
      onRequestClose={() => {
        setModal((prev) => ({
          ...prev,
          isShown: false,
          selectidTripId: null,
        }));
      }}
    >
      <TouchableWithoutFeedback onPress={closeKeyboard}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        >
          <View
            style={{
              padding: SIZES.large,
              width: "91%",
              backgroundColor: COLORS.white,
              borderRadius: SIZES.large,

              ...SHADOWS.dark,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.extraLarge,
                marginBottom: SIZES.extraLarge,
              }}
            >
              Drivers
            </Text>
            <RadioForm formHorizontal={false} animation={true}>
              {drivers &&
                drivers.map((driver) => (
                  <View
                    key={driver.id}
                    style={{
                      flexWrap: "wrap",
                      flexDirection: "row",
                      marginBottom: SIZES.small,
                    }}
                  >
                    <RadioButtonInput
                      obj={driver}
                      index={driver.id}
                      isSelected={modal.selectedDriver === driver.id}
                      onPress={() =>
                        setModal((prev) => ({
                          ...prev,
                          selectedDriver: driver.id,
                        }))
                      }
                      borderWidth={1}
                      buttonInnerColor={"#2196f3"}
                      buttonOuterColor={
                        modal.selectedDriver === driver.id ? "#2196f3" : "#000"
                      }
                      buttonSize={10}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={{}}
                    />
                    <RadioButtonLabel
                      obj={driver}
                      index={driver.id}
                      labelHorizontal={true}
                      onPress={() =>
                        setModal((prev) => ({
                          ...prev,
                          selectedDriver: driver.id,
                        }))
                      }
                      labelStyle={{ fontSize: 20, color: "#333" }}
                    />
                  </View>
                ))}
            </RadioForm>
            <Input
              value={note}
              onChange={setNote}
              placeholder="Note ....."
              allowFontScaling={true}
              multiline={true}
              style={{
                height: "auto",
                borderWidth: 1,
                marginTop: SIZES.large,
              }}
            />
            {error ? (
              <Text
                style={{
                  color: COLORS.red,
                  fontFamily: FONTS.semiBold,
                  textAlign: "center",
                  marginTop: "auto",
                }}
              >
                {error}
              </Text>
            ) : null}
            <Btn
              style={{
                backgroundColor: COLORS.darkBlue,
                justifyContent: "center",
                alignItems: "center",
                padding: SIZES.medium,
                marginTop: SIZES.large,
                borderRadius: SIZES.medium,
                marginBottom: SIZES.extraLarge,
                marginTop: error ? SIZES.medium : "auto",
              }}
              onPress={handelSubmit}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={{ color: COLORS.white }}>Assign</Text>
              )}
            </Btn>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AssignDriverModal;
