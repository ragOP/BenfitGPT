import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

interface Message {
  type: 'bot' | 'user' | 'typing';
  text: string;
}

const questions = [
  {
    id: 1,
    text: "Let's Kick off the conversation",
    type: 'choice',
    options: ['Start'],
  },
  {id: 1, text: "What's your Full Name?", type: 'text'},
  {id: 2, text: "What's your Running Age?", type: 'text'},
  {id: 3, text: "What's your zipcode?", type: 'text'},
  {id: 4, text: 'Are you on Medicare?', type: 'choice', options: ['Yes', 'No']},
  {
    id: 5,
    text: 'Do you have any of the following health conditions?',
    type: 'multi',
    options: ['Alzheimers', 'Diabetes', 'Hypertension', 'Arthritis'],
  },
  {
    id: 6,
    text: 'Do you own your home or rent?',
    type: 'choice',
    options: ['I Own', 'I Rent'],
  },
  {
    id: 7,
    text: 'Do you drive regularly?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
  {
    id: 8,
    text: 'Do you have any DUIs in the last 6 months?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
  {
    id: 9,
    text: 'Have you faced any motor vehicle accidents in the last 2 years?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
  {
    id: 10,
    text: 'Do you have any children between the age of 18-64?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
  {
    id: 11,
    text: 'Do you have a credit card debt of 10,000 or more?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
  {
    id: 12,
    text: 'Do you exercise at least once a week?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
];

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {type: 'bot', text: questions[0].text},
  ]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({animated: true});
      }
    }, 100);
  };

  const handleResponse = (response: string) => {
    if (!response.trim()) return;

    const updatedMessages = [...messages, {type: 'user', text: response}];
    setMessages(updatedMessages);
    setInputText('');
    scrollToBottom();

    if (currentIndex < questions.length - 1) {
      setIsTyping(true);
      setMessages([
        ...updatedMessages,
        {type: 'bot', text: 'Bot is typing...'},
      ]);
      scrollToBottom();

      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          ...updatedMessages,
          {type: 'bot', text: questions[currentIndex + 1].text},
        ]);
        setCurrentIndex(currentIndex + 1);
        scrollToBottom();
      }, 3000);
    } else {
      setIsTyping(true);
      setMessages([
        ...updatedMessages,
        {type: 'bot', text: 'Bot is typing...'},
      ]);
      scrollToBottom();

      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          ...updatedMessages,
          {type: 'bot', text: 'Thank you for your responses!'},
        ]);
        setCurrentIndex(currentIndex + 1);
        scrollToBottom();
      }, 3000);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>
          22,578 Seniors Helped In Last 24 Hours!
        </Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>100% FREE, NO HIDDEN COSTS!</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={
              msg.type === 'bot'
                ? styles.messageContainerBot
                : styles.messageContainerUser
            }>
            {msg.type === 'bot' && (
              <Image
                source={require('../assets/bot.png')}
                style={styles.icon}
              />
            )}
            <View
              style={
                msg.type === 'bot'
                  ? styles.botMessageContainer
                  : styles.userMessageContainer
              }>
              <Text
                style={
                  msg.type === 'bot'
                    ? styles.messageTextBot
                    : styles.messageTextUser
                }>
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
        {!isTyping && currentIndex < questions.length && (
          <View style={styles.inputContainer}>
            {questions[currentIndex].type === 'text' ? (
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={() => handleResponse(inputText)}
                placeholder="Type your response..."
                returnKeyType="send"
              />
            ) : (
              <View style={styles.responseContainer}>
                {questions[currentIndex].options?.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={styles.button}
                    onPress={() => handleResponse(option)}>
                    <Text style={styles.buttonText}>{option}</Text>
                  </TouchableOpacity>
                ))}
                {/* <Text style={styles.noteChat}>*Takes 2 minutes on average</Text> */}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  header: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 10,
    alignItems: 'center',
  },
  subHeader: {
    width: '100%',
    backgroundColor: '#277869',
    paddingVertical: 5,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  subHeaderText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 1,
    fontWeight: '600',
  },
  banner: {
    backgroundColor: '#222',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 25,
    paddingLeft: 25,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 70,
  },
  bannerText: {color: '#FFF', fontSize: 12, fontWeight: 'bold'},
  logo: {width: '60%', resizeMode: 'contain'},
  chatContainer: {flexGrow: 1, paddingHorizontal: 20, paddingBottom: 20},
  messageContainerBot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  messageContainerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  botMessageContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  userMessageContainer: {
    backgroundColor: '#0FAA53',
    padding: 10,
    borderRadius: 20,
  },
  messageTextBot: {fontSize: 16, color: '#333'},
  messageTextUser: {fontSize: 16, color: '#FFF'},
  icon: {width: 30, height: 30, marginRight: 10},
  inputContainer: {
    marginTop: 2,
    alignSelf: 'flex-start',
    width: '100%',
    marginLeft: 40,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    borderWidth: 1,
    width: '70%',
  },
  responseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    maxWidth: '80%',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#0FAA53',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {color: '#FFF', fontSize: 18, fontWeight: 'bold'},
  noteChat: {fontSize: 10, color: '#555', marginTop: 5, fontWeight: 'bold'},
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  typingText: {marginLeft: 10, fontSize: 14, color: '#666'},
  note: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 40,
    color: '#000',
    width: '90%',
    fontWeight: '500',
  },
  redText: {color: 'red', fontWeight: 'bold'},
  warningText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
    width: '90%',
    position: 'absolute',
    fontWeight: 'bold',
    bottom: 30,
  },
});

export default ChatScreen;
