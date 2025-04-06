import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Message {
  type: 'bot' | 'user' | 'typing';
  text: string;
}

const questions = [
  {
    id: 0,
    text: "Let's Kick off the conversation",
    type: 'choice',
    options: ['Start'],
  },
  {id: 1, text: "What's your Full Name?", type: 'text', keyType: 'alphabet'},
  {id: 2, text: "What's your Running Age?", type: 'text', keyType: 'alphabet'},
  {id: 3, text: "What's your zipcode?", type: 'text', keyType: 'numeric'},
  {id: 4, text: 'Are you on Medicare?', type: 'choice', options: ['Yes', 'No']},
  {
    id: 5,
    text: 'Do you have any of the following health conditions?',
    type: 'multi',
    options: ['Alzheimers', 'Diabetes', 'Hypertension', 'Arthritis', 'No'],
  },
  {
    id: 6,
    text: 'Do you own your home or rent?',
    type: 'choice',
    options: ['I Own', 'I Rent'],
  },
  {
    id: 7,
    text: 'Do you drive atleast once a week?',
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

const ChatScreen: React.FC = ({navigation, route}) => {
  const {uuid} = route.params;
  const [messages, setMessages] = useState<Message[]>([
    {type: 'bot', text: questions[0].text},
  ]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isMedicare, setIsMedicare] = useState<boolean>(true);
  const [isCreditDebt, setIsCreditDebt] = useState<boolean>(true);
  const [isDiscountedInsurence, setIsDiscountedInsurance] =
    useState<boolean>(true);
  const [isComponsation, setIsComponsation] = useState<boolean>(true);
  const [isACA, setIsACA] = useState<boolean>(true);
  const [name, setName] = useState<string>('');

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({animated: true});
      }
    }, 100);
  };

  const sendMessagesToServer = async (messages: Message[]) => {
    try {
      const qualifiedFor = {
        medicare: false,
        creditDebtRelief: false,
        discountedAutoInsurancePlan: false,
        higherCompensationForAccidents: false,
        aca: false,
      };
      if (isMedicare) qualifiedFor.medicare = true;
      if (isCreditDebt) qualifiedFor.creditDebtRelief = true;
      if (isDiscountedInsurence) qualifiedFor.discountedAutoInsurancePlan = true;
      if (isComponsation) qualifiedFor.higherCompensationForAccidents = true;
      if (isACA) qualifiedFor.aca = true;
      const response = await fetch('http://10.0.2.2:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: uuid, messages, qualifiedFor}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Messages sent successfully:', data);
    } catch (error) {
      console.log('Error sending messages:', error);
    }
  };

  const handleResponse = (response: string) => {
    if (!response.trim()) return;

    const updatedMessages = [...messages, {type: 'user', text: response}];
    if (questions[currentIndex].id === 7) {
      setIsDiscountedInsurance(response === 'Yes');
    } else if (questions[currentIndex].id === 8) {
      setIsComponsation(response === 'Yes');
    } else if (questions[currentIndex].id === 9) {
      setIsACA(response === 'Yes');
    } else if (questions[currentIndex].id === 10) {
      setIsCreditDebt(response === 'Yes');
    }

    if (questions[currentIndex].id === 1) {
      setName(response);
    }

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
        setTimeout(() => {
          setTimeout(() => {
            navigation.navigate('CongratulationsPage', {
              isMedicare,
              isCreditDebt,
              isDiscountedInsurence,
              isComponsation,
              isACA,
              name,
            });
          }, 2000);
          sendMessagesToServer(updatedMessages);
        }, 2000);
        setCurrentIndex(currentIndex + 1);
        scrollToBottom();
      }, 3000);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
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
                <View style={styles.typingContainer}>
                  <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={() => handleResponse(inputText)}
                    placeholder="Type your response..."
                    returnKeyType="send"
                    keyboardType={
                      questions[currentIndex].keyType === 'numeric'
                        ? 'numeric'
                        : 'default'
                    }
                  />

                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {
                      if (inputText.trim()) {
                        handleResponse(inputText);
                        setInputText('');
                      }
                    }}>
                    <Image
                      source={require('../assets/sendBtn.webp')}
                      style={styles.sendBtnImg}
                    />
                  </TouchableOpacity>
                </View>
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
    </SafeAreaView>
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
    marginHorizontal: 90,
  },
  bannerText: {color: '#FFF', fontSize: 12, fontWeight: 'bold'},
  logo: {width: '60%', resizeMode: 'contain'},
  sendBtnImg: {width: 40, height: 40},
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
  sendButton: {
    borderRadius: 20,
    width: 70,
    marginLeft: 10,
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
