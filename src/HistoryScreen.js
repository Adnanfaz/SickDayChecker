import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Title, Text, Button, IconButton, Divider, useTheme } from 'react-native-paper';
import { HealthContext } from '../context/HealthContext';

import format from 'date-fns/format';


const HistoryScreen = ({ navigation }) => {
  const { symptomHistory, loadHistory, clearHistory } = useContext(HealthContext);
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    loadHistory();
  }, []);
  
  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all symptom history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            await clearHistory();
            setIsLoading(false);
          } 
        },
      ]
    );
  };
  
  const renderHistoryItem = ({ item }) => {
    const date = new Date(item.date);
    const formattedDate = format(date, 'MMM d, yyyy h:mm a');
    
    // Determine icon based on recommendation
    let icon = 'information';
    let color = '#2196f3';
    
    if (item.result.recommendation === 'See a doctor') {
      icon = 'alert-circle';
      color = '#d32f2f';
    } else if (item.result.recommendation === 'Consider resting') {
      icon = 'alert';
      color = '#ff9800';
    } else if (item.result.recommendation === 'Safe to go') {
      icon = 'check-circle';
      color = '#4caf50';
    }

    return (
      <Card style={[styles.historyItem, { backgroundColor: theme.colors.surface }]}>
        <Card.Content style={styles.historyContent}>
          <View style={styles.historyHeader}>
            <Text style={[styles.historyDate, { color: theme.colors.text }]}>{formattedDate}</Text>
            <IconButton
              icon={icon}
              color={color}
              size={32}
              style={styles.historyIcon}
            />
          </View>
          
          <Divider style={styles.divider} />
          
          <Text style={[styles.recommendationText, { color: theme.colors.text }]}>
            {item.result.recommendation}
          </Text>
          
          <View style={styles.symptomsList}>
            {item.symptoms.fever > 99 && (
              <Text style={[styles.symptomText, { color: theme.colors.text }]}>• Fever: {item.symptoms.fever.toFixed(1)}°F</Text>
            )}
            {item.symptoms.cough !== 'none' && (
              <Text style={[styles.symptomText, { color: theme.colors.text }]}>• Cough: {item.symptoms.cough}</Text>
            )}
            {item.symptoms.soreThroat && (
              <Text style={[styles.symptomText, { color: theme.colors.text }]}>• Sore Throat</Text>
            )}
            {item.symptoms.bodyAches && (
              <Text style={[styles.symptomText, { color: theme.colors.text }]}>• Body Aches</Text>
            )}
            {item.symptoms.fatigue !== 'none' && (
              <Text style={[styles.symptomText, { color: theme.colors.text }]}>• Fatigue: {item.symptoms.fatigue}</Text>
            )}
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerContainer}>
        <Title style={[styles.title, { color: theme.colors.text }]}>Your Symptom History</Title>
        
        {symptomHistory.length > 0 && (
          <Button 
            mode="outlined" 
            onPress={handleClearHistory}
            color={theme.colors.error}
            loading={isLoading}
            icon="delete"
            style={styles.clearButton}
          >
            Clear History
          </Button>
        )}
      </View>
      
      {symptomHistory.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: theme.colors.text }]}>No symptom records found.</Text>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Symptoms')}
            style={styles.emptyStateButton}
            color={theme.colors.primary}
          >
            Check Symptoms Now
          </Button>
        </View>
      ) : (
        <FlatList
          data={symptomHistory.sort((a, b) => new Date(b.date) - new Date(a.date))}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => `history-${index}-${item.date}`}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
  },
  clearButton: {
    borderColor: '#d32f2f',
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    width: '80%',
  },
  historyItem: {
    marginBottom: 12,
    elevation: 1,
    borderRadius: 8,
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
  },
  historyIcon: {
    margin: 0,
  },
  divider: {
    marginVertical: 8,
  },
  recommendationText: {
    fontSize: 18,
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

export default HistoryScreen;
