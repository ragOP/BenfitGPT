import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const questions = [
  {
    id: 0,
    text: "Let's Kick off the conversation",
    type: 'choice',
    options: ['Start'],
  },
  { id: 1, text: "What's your Full Name?", type: 'text', keyType: 'alphabet' },
  { id: 2, text: "What's your Running Age?", type: 'text', keyType: 'alphabet' },
  { id: 3, text: "What's your zipcode?", type: 'text', keyType: 'numeric' },
  { id: 4, text: 'Are you on Medicare?', type: 'choice', options: ['Yes', 'No'] },
  {
    id: 5,
    text: 'What is your gender?',
    type: 'choice',
    options: ['Male', 'Female', 'Other'],
  },
];

const NewChatPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handlePress = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${((currentIndex + 1) / questions.length) * 100}%` }]} />
        </View>
        <Text style={styles.question}>{currentQuestion.text}</Text>
        {currentQuestion.type === 'choice' &&
          currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={handlePress}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    backgroundColor: '#000',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#f5c542',
  },
  question: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default NewChatPage;
