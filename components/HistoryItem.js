import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton, Divider } from 'react-native-paper';
import { format } from 'date-fns';

const HistoryItem = ({ record }) => {
  const date = new Date(record.date);
  const formattedDate = format(date, 'MMM d, yyyy h:mm a');
  
  // Determine icon based on recommendation
  let icon = 'information';
  let color = '#2196f3';
  
  if (record.result.recommendation === 'See a doctor') {
    icon = 'alert-circle';
    color = '#d32f2f';
  } else if (record.result.recommendation === 'Consider resting') {
    icon = 'alert';
    color = '#ff9800';
  } else if (record.result.recommendation === 'Safe to go') {
    icon = 'check-circle';
    color = '#4caf50';
  }

  return (
    <Card style={styles.historyItem}>
      <Card.Content style={styles.historyContent}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyDate}>{formattedDate}</Text>
          <IconButton
            icon={icon}
            color={color}
            size={24}
            style={styles.historyIcon}
          />
        </View>
        
        <Divider style={styles.divider} />
        
        <Text style={styles.recommendationText}>
          {record.result.recommendation}
        </Text>
        
        <View style={styles.symptomsList}>
          {record.symptoms.fever > 99 && (
            <Text style={styles.symptomText}>• Fever: {record.symptoms.fever.toFixed(1)}°F</Text>
          )}
          {record.symptoms.cough !== 'none' && (
            <Text style={styles.symptomText}>• Cough: {record.symptoms.cough}</Text>
          )}
          {record.symptoms.soreThroat && (
            <Text style={styles.symptomText}>• Sore Throat</Text>
          )}
          {record.symptoms.bodyAches && (
            <Text style={styles.symptomText}>• Body Aches</Text>
          )}
          {record.symptoms.fatigue !== 'none' && (
            <Text style={styles.symptomText}>• Fatigue: {record.symptoms.fatigue}</Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    marginBottom: 12,
    elevation: 1,
  },
  historyContent: {
    padding: 8,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyDate: {
    fontSize: 14,
    color: '#666',
  },
  historyIcon: {
    margin: 0,
  },
  divider: {
    marginVertical: 8,
  },
  recommendationText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  symptomsList: {
    marginTop: 8,
  },
  symptomText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default HistoryItem;
