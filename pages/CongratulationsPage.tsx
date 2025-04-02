import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

const CongratulationsPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>
          22,578 Seniors Helped In Last 24 Hours!
        </Text>
      </View>

      <View style={styles.greenContainer}>
        <Text style={styles.congratsText}>Congratulations, Aman Dev!</Text>
        <Text style={styles.benefitText}>
          Here are the <Text style={styles.highlightText}>5</Text> Benefits You
          Qualify
        </Text>
        <Text style={styles.subText}>Go one by one!</Text>
      </View>

      <View style={styles.redBanner}>
        <Text style={styles.redBannerText}>Easiest To Claim</Text>
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>
          1. <Text style={styles.boldText}>Food Allowance Card</Text>
        </Text>
        <Image
          source={require('../assets/benifit1.jpeg')}
          style={styles.cardImage}
        />
        <Text style={styles.cardDescription}>
          This food allowance card gives you{' '}
          <Text style={styles.greenText}>thousands of dollars</Text> a year to
          spend on groceries, rent, prescriptions, etc.
        </Text>
        <Text style={styles.instructionText}>
          Simply click below & call now to claim
        </Text>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>CALL (XXX) XXX-XXXX</Text>
        </TouchableOpacity>
        <Text style={styles.note}>
          *Takes <Text style={styles.boldText}>couple minutes</Text> on average
        </Text>
      </View>

      <Text style={styles.warningText}>
        Beware of other fraudulent & similar looking websites that might look
        exactly like ours, we have no affiliation with them. This is the only
        official website to claim your Burial Protection Plan with the domain
        name burialprotectionplan.org.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#277869',
    alignItems: 'center',
    paddingBottom: 20,
    height: '100%',
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
  boldText: {fontWeight: 'bold'},
  cardImage: {width: 200, height: 150, resizeMode: 'contain', marginBottom: 15},
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
