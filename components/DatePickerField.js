import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { StyleSheet } from 'react-native';

const DatePickerField = ({
  initialValue = new Date(),
  onChange,
  format = 'YYYY-MM-DD',
  label = 'Select Date',
}) => {
  const [date, setDate] = useState(initialValue);
  const [show, setShow] = useState(false);

  const handleOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    if (onChange) {
      onChange(currentDate);
    }
  };

  const formatDate = (date, format) => {
    return moment(date).format(format);
  };

  const handlePress = () => {
    setShow(!show);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.text}>{formatDate(date, format)}</Text>
      </TouchableOpacity>
      {show && (
        <DatePicker
          value={date}
          onChange={handleOnChange}
          mode="date"
          style={styles.picker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    width: "100%",
  },
  button: {
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: '#333333',
  },
  picker: {
    width: 200,
    height: 200,
  },
});

export default DatePickerField;