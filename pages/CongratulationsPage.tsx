import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const CongratulationsPage = ({route}) => {
  const {
    isMedicare,
    isCreditDebt,
    isDiscountedInsurence,
    isComponsation,
    isACA,
    name
  } = route.params;

  const [totalBenefits, setTotalBenefits] = useState(0);

  useEffect(() => {
    const total = [
      isMedicare,
      isCreditDebt,
      isDiscountedInsurence,
      isComponsation,
      isACA,
    ].filter((item) => item === true).length;
    setTotalBenefits(total);
  }, []);

  // console.log('isMedicare:', isMedicare);
  // console.log('isCreditDebt:', isCreditDebt);
  // console.log('isDiscountedInsurence:', isDiscountedInsurence);
  // console.log('isComponsation:', isComponsation);
  // console.log('isACA:', isACA);
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

        <View style={styles.greenContainer}>
          <Text style={styles.congratsText}>Congratulations, {name}!</Text>
          <Text style={styles.benefitText}>
            Here are the <Text style={styles.highlightText}>{totalBenefits}</Text> Benefits
            You Qualify
          </Text>
          <Text style={styles.subText}>Go one by one!</Text>
        </View>

        {isMedicare && (
          <>
            <View style={styles.redBanner}>
              <Text style={styles.redBannerText}>Easiest To Claim</Text>
            </View>

            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>
                <Text style={styles.boldText}>Food Allowance Card</Text>
              </Text>
              <Image
                source={require('../assets/benifit1.webp')}
                style={styles.cardImage}
              />
              <Text style={styles.cardDescription}>
                This food allowance card gives you{' '}
                <Text style={styles.greenText}>thousands of dollars</Text> a
                year to spend on groceries, rent, prescriptions, etc.
              </Text>
              <Text style={styles.instructionText}>
                Simply click below & call now to claim
              </Text>
              <TouchableOpacity style={styles.callButton}>
                <Text style={styles.callButtonText}>CALL (XXX) XXX-XXXX</Text>
              </TouchableOpacity>
              <Text style={styles.note}>
                *Takes <Text style={styles.boldText}>couple minutes</Text> on
                average
              </Text>
            </View>
          </>
        )}

        {isCreditDebt && (
          <>
            <View style={styles.redBanner}>
              <Text style={styles.redBannerText}>WORTH THE MOST $$</Text>
            </View>

            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>
                <Text style={styles.boldText}>CREDIT CARD DEBT RELIEF</Text>
              </Text>
              <Image
                source={require('../assets/benifit2.webp')}
                style={styles.cardImage}
              />
              <Text style={styles.cardDescription}>
                Aman, You're qualified to claim 100% Debt Relief by end of today
                <Text style={styles.greenText}>(RARE)</Text>
              </Text>
              <Text style={styles.instructionText}>
                Simply click below & call now to claim
              </Text>
              <TouchableOpacity style={styles.callButton}>
                <Text style={styles.callButtonText}>CALL (XXX) XXX-XXXX</Text>
              </TouchableOpacity>
              <Text style={styles.note}>
                *Takes <Text style={styles.boldText}>couple minutes</Text> on
                average
              </Text>
            </View>
          </>
        )}

        {isDiscountedInsurence && (
          <>
            <View style={styles.redBanner}>
              <Text style={styles.redBannerText}>MUST CLAIM!</Text>
            </View>

            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>
                <Text style={styles.boldText}>
                  Discounted Auto Insurance Plan
                </Text>
              </Text>
              <Image
                source={require('../assets/benifit3.webp')}
                style={styles.cardImage}
              />
              <Text style={styles.cardDescription}>
                Aman, You're <Text style={styles.greenText}>eligible</Text> for
                a "Discounted Auto Insurance Plan" with all the coverages.
              </Text>
              <Text style={styles.instructionText}>
                Simply click below & call now to claim
              </Text>
              <TouchableOpacity style={styles.callButton}>
                <Text style={styles.callButtonText}>CALL (XXX) XXX-XXXX</Text>
              </TouchableOpacity>
              <Text style={styles.note}>
                *Takes <Text style={styles.boldText}>couple minutes</Text> on
                average
              </Text>
            </View>
          </>
        )}

        {isComponsation && (
          <>
            <View style={styles.redBanner}>
              <Text style={styles.redBannerText}>GET UPTO $100,000+!</Text>
            </View>

            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>
                <Text style={styles.boldText}>
                  GET HIGHER COMPENSATION FOR YOUR ACCIDENT.
                </Text>
              </Text>
              <Image
                source={require('../assets/benifit4.webp')}
                style={styles.cardImage}
              />
              <Text style={styles.cardDescription}>
                Based on your answers, you might be eligible for a
                <Text style={styles.greenText}>higher compensation</Text> on
                your accident. (Most people get{' '}
                <Text style={styles.greenText}>3x</Text> of their past
                compensations)
              </Text>
              <Text style={styles.instructionText}>
                Simply click below & call now to claim
              </Text>
              <TouchableOpacity style={styles.callButton}>
                <Text style={styles.callButtonText}>CALL (XXX) XXX-XXXX</Text>
              </TouchableOpacity>
              <Text style={styles.note}>
                *Takes <Text style={styles.boldText}>couple minutes</Text> on
                average
              </Text>
            </View>
          </>
        )}

        {isACA && (
          <>
            <View style={styles.redBanner}>
              <Text style={styles.redBannerText}>Easiest To Claim</Text>
            </View>

            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>
                <Text style={styles.boldText}>ACA</Text>
              </Text>
              <Image
                source={require('../assets/benifit1.webp')}
                style={styles.cardImage}
              />
              <Text style={styles.cardDescription}>
                This food allowance card gives you{' '}
                <Text style={styles.greenText}>thousands of dollars</Text> a
                year to spend on groceries, rent, prescriptions, etc.
              </Text>
              <Text style={styles.instructionText}>
                Simply click below & call now to claim
              </Text>
              <TouchableOpacity style={styles.callButton}>
                <Text style={styles.callButtonText}>CALL (XXX) XXX-XXXX</Text>
              </TouchableOpacity>
              <Text style={styles.note}>
                *Takes <Text style={styles.boldText}>couple minutes</Text> on
                average
              </Text>
            </View>
          </>
        )}

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
    backgroundColor: '#277869',
    alignItems: 'center',
    paddingBottom: 20,
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
    backgroundColor: '#fff',
    paddingVertical: 5,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  subHeaderText: {
    color: '#000',
    fontSize: 12,
    marginTop: 1,
    fontWeight: '600',
  },
  greenContainer: {width: '90%', marginTop: 20, alignItems: 'center'},
  congratsText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 5,
  },
  benefitText: {
    color: '#FFF',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 1,
    fontWeight: '800',
  },
  highlightText: {color: '#e4d14f', fontWeight: 'bold'},
  subText: {color: '#FFF', fontSize: 16, fontStyle: 'italic', marginTop: 10},
  redBanner: {
    backgroundColor: '#de1819',
    paddingVertical: 10,
    width: '90%',
    alignItems: 'center',
    marginTop: 15,
  },
  redBannerText: {color: '#FFF', fontSize: 20, fontWeight: 'bold'},
  cardContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: '90%',
    alignItems: 'center',
  },
  cardTitle: {fontSize: 26, color: '#000', marginBottom: 10},
  boldText: {fontWeight: 'bold', textAlign: 'center'},
  cardImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 15,
    borderRadius: 20,
  },
  cardDescription: {fontSize: 16, color: '#000', textAlign: 'center'},
  greenText: {color: '#559c5a', fontWeight: 'bold'},
  instructionText: {fontSize: 16, marginVertical: 10, color: '#000'},
  callButton: {
    backgroundColor: '#01b55e',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 50,
    width: '100%',
  },
  callButtonText: {color: '#FFF', fontSize: 18, fontWeight: 'bold'},
  note: {
    fontSize: 10,
    marginTop: -7,
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 5,
  },
  warningText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
    paddingHorizontal: 20,
  },
});

export default CongratulationsPage;
