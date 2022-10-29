import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/Container";
import { COLORS, FONTS, SIZES } from "../../constants";
import Input from "../../components/Input";
import { Btn } from "../../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import orderContext from "../../context/order/orderContext";

const DeliveringOrder = ({ route }) => {
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const order = route.params.order;
  const navigation = useNavigation();
  const { trip, editOrder } = useContext(orderContext);

  console.log("order.id", order.id);

  const handleNoteChange = (val) => {
    setNote(val);
    setError("");
  };

  const handleSubmit = () => {
    editOrder(order.id, "3", note, () => {
      navigation.goBack();
    });
  };

  const handleReject = () => {
    if (!note) {
      return setError("يجب ادخال سبب الرفض");
    }

    editOrder(order.id, "0", note, () => {
      navigation.goBack();
    });
  };

  useEffect(() => {
    return () => {
      setNote("");
    };
  }, []);

  return (
    <Container>
      <View style={{ marginTop: SIZES.large }}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.font,
            marginBottom: SIZES.base,
            color: COLORS.red,
          }}
        >
          اسم العميل :{" "}
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.medium,
              color: "#333",
            }}
          >
            {order.customer.name}
          </Text>
        </Text>

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.font,
            color: COLORS.red,
            marginBottom: SIZES.base,
          }}
        >
          رقم الهاتف :{" "}
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.medium,
              color: "#333",
            }}
          >
            {order.customer.mobile_number}
          </Text>
        </Text>

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.font,
            color: COLORS.red,
            marginBottom: SIZES.large,
          }}
        >
          العنوان :{" "}
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.medium,
              color: "#333",
            }}
          >
            {order.customer.address_description}
          </Text>
        </Text>

        {order.note ? (
          <>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.medium,
                marginBottom: SIZES.large,
              }}
            >
              ملاحظات :{" "}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.small,
              }}
            >
              {order.note}
            </Text>
          </>
        ) : null}

        {order?.order_products.length && (
          <Text
            style={{
              fontSize: SIZES.large,
              fontFamily: FONTS.bold,
              marginBottom: SIZES.medium,
            }}
          >
            الطلبات
          </Text>
        )}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: SIZES.large,
          }}
        >
          {order?.order_products?.map((order, i) => (
            <Text
              key={Math.random()}
              style={{
                color: COLORS.textGray,
                marginRight: SIZES.large,
                marginBottom: SIZES.base,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.font,
              }}
            >
              {order.qty} {order.product_name}
            </Text>
          ))}
        </View>

        <View>
          <Input
            value={note}
            onChange={handleNoteChange}
            placeholder="سبب الرفض"
            allowFontScaling={true}
            multiline={true}
            style={{
              height: "auto",
              borderWidth: 1,
            }}
            error={error}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Btn
              onPress={handleSubmit}
              style={{ ...stl.btn, backgroundColor: COLORS.green }}
            >
              <Text style={{ fontFamily: FONTS.bold, color: "#fff" }}>
                اتمام
              </Text>
            </Btn>
            <Btn
              onPress={handleReject}
              style={{ ...stl.btn, backgroundColor: COLORS.red }}
            >
              <Text style={{ fontFamily: FONTS.bold, color: "#fff" }}>رفض</Text>
            </Btn>
          </View>
        </View>
      </View>
    </Container>
  );
};

const stl = StyleSheet.create({
  btn: {
    width: "48%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
});

export default DeliveringOrder;
