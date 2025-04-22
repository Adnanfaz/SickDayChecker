import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch } from 'react-native-paper';

const SymptomItem = ({ symptom, value, onToggle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.symptomText}>{symptom}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        color="#ff5252"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  symptomText: {
    fontSize: 16,
  },
});

export default SymptomItem;