import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../context/auth";
import theme from "../../../assets/styles/theme";
import { MainButton } from "../../core";

const defaultValues = {
  name: "",
  description: "",
  price: "",
  discount: "",
};

const EditProductForm = (props) => {
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [filters, setFilters] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const fetchFilters = useCallback(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/services/${selectedService}/filters`)
      .then((res) => setFilters(res.data.filters[0].options))
      .catch((err) => console.log(err));
  }, [selectedService]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const placeholder = {
    label: "Selecteaza serviciul aferent produsului*",
    value: null,
    color: "#9EA0A4",
  };
  const placeholderOption = {
    label: "Selecteaza categoria produsului*",
    value: null,
    color: "#9EA0A4",
  };

  const onSubmit = (data) => {
    setLoading(true);
    const { description, price, discount, name } = data;
  };

  console.log(product);

  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/products/${props.productId}`,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.log(err));
  }, []);

  console.log(product);

  return (
    <>
      <View style={styles.row}>
        <RNPickerSelect
          placeholder={placeholder}
          useNativeAndroidPickerStyle={false}
          onValueChange={(text) => {
            setSelectedService(text);
            fetchFilters();
          }}
          value={product?.service}
          style={pickerSelectStyles}
          items={user?.services.map((service) => {
            return {
              label: service?.name,
              value: service?._id,
            };
          })}
        />
      </View>
      <View style={styles.row}>
        <RNPickerSelect
          placeholder={placeholderOption}
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => {}}
          style={pickerSelectStyles}
          items={filters.map((filter) => {
            return {
              label: filter?.name,
              value: filter?._id,
            };
          })}
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                ...styles.input,
              }}
              value={product?.name}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Numele produsului*"
              placeholderTextColor={"#9EA0A4"}
            />
          )}
          name="name"
        />
        {errors.street && <Text>This is required.</Text>}
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                ...styles.input,
              }}
              value={product?.description}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Scurta descriere"
              placeholderTextColor={"#9EA0A4"}
            />
          )}
          name="description"
        />
        {errors.street && <Text>This is required.</Text>}
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                ...styles.input,
              }}
              value={`${product?.price.toString()} RON`}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Pret*"
              placeholderTextColor={"#9EA0A4"}
            />
          )}
          name="price"
        />
        {errors.price && <Text>This is required.</Text>}
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                ...styles.input,
              }}
              value={product?.priceDiscount.toString()}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Discount"
              placeholderTextColor={"#9EA0A4"}
            />
          )}
          name="discount"
        />
        {errors.street && <Text>This is required.</Text>}
      </View>
      <View style={styles.row}>
        <MainButton
          title={loading ? <ActivityIndicator color="white" /> : "Adauga"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
};

export default EditProductForm;

const styles = StyleSheet.create({
  row: { marginBottom: 15, width: "100%" },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    fontFamily: "Exo-Regular",
    fontSize: 14,
    color: theme.lightColors.black,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: theme.lightColors.black,
    paddingRight: 30,
    fontFamily: "Exo-Regular",
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 10,
    color: theme.lightColors.black,
    fontFamily: "Exo-Regular",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});