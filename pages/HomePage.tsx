import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import Loader from '../components/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = ({navigation}) => {
  const [peopleNumber, setPeopleNumber] = useState(69);
  const [showLoading, setShowLoading] = useState(false);
  const [uuid, setUuid] = useState<any>();
  const [isAlreadyQualified, setIsAlreadyQualified] = useState(false);
  const [userData, setUserData] = useState({
    isMedicare: '',
    isCreditDebt: '',
    isDiscountedInsurence: '',
    isComponsation: '',
    isACA: '',
    name: '',
  });

  const generateUniqueId = () => {
    return (
      Date.now().toString() + Math.floor(Math.random() * 1000000).toString()
    );
  };

  const storeUuid = async () => {
    try {
      const existingId = await AsyncStorage.getItem('uniqueUserId');

      if (!existingId) {
        const randomUuid = generateUniqueId();
        await AsyncStorage.setItem('uniqueUserId', randomUuid);
        setUuid(randomUuid);
      } else {
        setUuid(existingId);

        const response = await fetch(
          `https://benifit-gpt-be.onrender.com/api/messages/${existingId}`,
        );
        const data = await response.json();
        console.log('Response data:', data.data);
        if (data.data.isQualified) {
          setUserData({
            isMedicare: data.data.qualifiedFor.medicare,
            isCreditDebt: data.data.qualifiedFor.creditDebtRelief,
            isDiscountedInsurence: data.data.qualifiedFor.discountedAutoInsurancePlan,
            isComponsation: data.data.qualifiedFor.higherCompensationForAccidents,
            isACA: data.data.qualifiedFor.aca,
            name: data.data.responses[1] || 'User',
          });
          setIsAlreadyQualified(true);
        }
      }
    } catch (error) {
      console.error('Error in storeUuid:', error);
    }
  };

  const handleStartNow = () => {
    setTimeout(() => {
      setShowLoading(true);
    }, 1000);
    setTimeout(() => {
      setShowLoading(false);
      if (isAlreadyQualified) {
        navigation.navigate('CongratulationsPage', {
          isMedicare: userData.isMedicare,
          isCreditDebt: userData.isCreditDebt,
          isDiscountedInsurence: userData.isDiscountedInsurence,
          isComponsation: userData.isComponsation,
          isACA: userData.isACA,
          name: userData.name,
        });
        return;
      } else {
        navigation.navigate('ChatPage', {
          uuid: uuid,
        });
      }
    }, 4000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const random = Math.random() < 0.5 ? 1 : 2;
      setPeopleNumber(prevNumber => prevNumber + random);
    }, 2000);

    storeUuid();

    return () => clearInterval(intervalId);
  }, []);
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
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/logo.webp')} style={styles.logo} />
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>
            22,578 Seniors Helped In Last 24 Hours!
          </Text>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerText}>100% FREE, NO HIDDEN COSTS!</Text>
        </View>

        {!showLoading && (
          <View style={styles.row}>
            <Text style={styles.title}>
              Seniors, Get Your Free Benefits Check in Just 60 Seconds!
            </Text>

            <View style={styles.listContainer}>
              <View style={styles.listImageContainer}>
                <Image
                  source={require('../assets/Tick.webp')}
                  style={styles.tickImage}
                />
                <Text style={styles.listItem}>
                  Over 2M+ Seniors Helped Till Date.
                </Text>
              </View>
              <View style={styles.listImageContainer}>
                <Image
                  source={require('../assets/Tick.webp')}
                  style={styles.tickImage}
                />
                <Text style={styles.listItem}>Completely Free & Easy.</Text>
              </View>
              <View style={styles.listImageContainer}>
                <Image
                  source={require('../assets/Tick.webp')}
                  style={styles.tickImage}
                />
                <Text style={styles.listItem}>
                  Specially Made For Seniors Over 65!
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={handleStartNow} style={styles.button}>
              <Text style={styles.buttonText}>START NOW ➤</Text>
            </TouchableOpacity>
            <Text style={styles.claimText}>
              <Text style={styles.greenText}>{peopleNumber}</Text> People Are{' '}
              <Text style={styles.boldText}>Claiming</Text> Right Now!
            </Text>
            <View style={styles.aiImageContainer}>
              <Image
                source={require('../assets/Loader.webp')}
                style={styles.aiImage}
              />
              <Text style={styles.aiText}>Activating AI</Text>
            </View>
          </View>
        )}

        {showLoading && (
          <View style={styles.loader}>
            <Loader isAlreadyQualified={isAlreadyQualified} />
          </View>
        )}

        <Text style={styles.note}>
          <Text style={styles.redText}>NOTE:</Text> We don’t spam OR sell
          information & we aren’t affiliated with any gov. branch. We are not
          sponsored by any External Private Organisation.
        </Text>

        <Text style={styles.warningText}>
          Beware of other fraudulent & similar looking websites that might look
          exactly like ours, we have no affiliation with them. This is the only
          official website to claim your Burial Protection Plan with the domain
          name burialprotectionplan.org.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    height: '100%',
  },
  row: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  header: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 10,
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    resizeMode: 'contain',
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
  },
  bannerText: {color: '#FFF', fontSize: 12, fontWeight: 'bold'},
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
    width: '90%',
  },
  listContainer: {
    width: '70%',
    marginVertical: 10,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  listItem: {fontSize: 16, marginBottom: 5, color: '#000', fontWeight: '400'},
  button: {
    backgroundColor: '#01b55e',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 50,
    width: '70%',
    marginTop: 30,
  },
  buttonText: {color: '#FFF', fontSize: 24, fontWeight: 'bold'},
  claimText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  boldText: {fontWeight: 'bold'},
  greenText: {color: '#22C55E', fontWeight: 'bold'},
  aiImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: '100%',
    gap: 15,
  },
  listImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    width: '100%',
    gap: 5,
  },
  aiText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  aiImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  tickImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
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
  loader: {
    height: '50.5%',
    justifyContent: 'center',
  },
});

export default HomePage;
