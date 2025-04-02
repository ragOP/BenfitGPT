import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

const ChatPage = () => {
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

      <View style={styles.banner}>
        <Text style={styles.bannerText}>100% FREE, NO HIDDEN COSTS!</Text>
      </View>

      <View style={styles.chatscreen}>
        <Text>Chat Screen Here</Text>
      </View>

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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
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
  chatscreen: {
    height: '50.5%',
    justifyContent: 'center',
  },
});

export default ChatPage;
