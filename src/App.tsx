import {
  ConnectWallet,
  ThirdwebProvider,
  coinbaseWallet,
  localWallet,
  metamaskWallet,
  smartWallet,
  trustWallet,
  walletConnect,
  embeddedWallet,
  Locale,
  Box,
} from '@thirdweb-dev/react-native';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Mumbai, Sepolia, Goerli} from '@thirdweb-dev/chains';
import {TW_CLIENT_ID} from '@env';
import LanguageSelector from './LanguageSelector';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Title = () => {
  return (
    <View>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require('./assets/logo.png')}
      />
    </View>
  );
};

const DrawerContent = (props: DrawerContentComponentProps) => {
  const sendSupportEmail = () => {
    const email = 'support@thirdweb.com';
    const subject = encodeURIComponent('Account Deletion Request');
    const body = encodeURIComponent('Hi, I would like to delete my account.');
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    Linking.canOpenURL(mailtoLink)
      .then(supported => {
        if (!supported) {
          Alert.alert(
            'Account Deletion Request',
            'Please email support@thirdweb.com with the subject "Accound Deletion Request" from the email you want to delete the account for.',
          );
        } else {
          return Linking.openURL(mailtoLink);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const onPrivacyPolicyPress = () => {
    Linking.openURL('https://thirdweb.com/privacy');
  };

  return (
    <View style={styles.drawer}>
      <DrawerItemList {...props} />
      <View>
        <TouchableOpacity
          style={styles.sendEmailContainer}
          onPress={sendSupportEmail}>
          <Text style={styles.link}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sendEmailContainer}
          onPress={onPrivacyPolicyPress}>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safe}>
        <Drawer.Navigator
          screenOptions={{
            drawerActiveTintColor: '#fff',
            drawerStyle: {
              backgroundColor: '#131417',
            },
          }}
          drawerContent={DrawerContent}>
          <Drawer.Screen
            name="ConnectWallet"
            component={Main}
            options={{
              headerStyle: {
                backgroundColor: '#131417', // Background color of the header
                borderColor: 'transparent',
                shadowColor: 'transparent',
                elevation: 0,
                borderBottomWidth: 0,
              },
              headerTitle: Title,
              headerTitleAlign: 'center',
              headerTintColor: '#fff', // Color of the header title and buttons
            }}
          />
        </Drawer.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;

const Main = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Locale>('en');

  const [customButtonText, setCustomButtonText] = useState('');
  const [customModalTitle, setCustomModalTitle] = useState('');
  const [customModalIconUrl, setCustomModalIconUrl] = useState<
    string | undefined
  >();

  const [isLightTheme, setIsLightTheme] = useState(false);
  const toggleSwitch = () => setIsLightTheme(previousState => !previousState);

  const onLearnMorePress = () => {
    Linking.openURL(
      'https://portal.thirdweb.com/react-native/react-native.connectwallet#configuration',
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={-50}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.view}>
        <View>
          <Text style={styles.motto}>The fastest way to build web3 apps.</Text>
          <View style={styles.switch}>
            <Text style={styles.theme}>Theme: </Text>
            <Text style={styles.text}>dark</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isLightTheme ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isLightTheme}
            />
            <Text style={styles.text}>light</Text>
          </View>
          <LanguageSelector onLanguageSelected={setSelectedLanguage} />
          <Text style={styles.title}>Customization</Text>
          <TextInput
            placeholder="Enter button text"
            placeholderTextColor={'#fff'}
            style={styles.textInput}
            value={customButtonText}
            onChangeText={setCustomButtonText}
          />
          <TextInput
            placeholder="Enter modal title"
            placeholderTextColor={'#fff'}
            style={styles.textInput}
            value={customModalTitle}
            onChangeText={setCustomModalTitle}
          />
          <TextInput
            placeholder="Enter modal icon"
            placeholderTextColor={'#fff'}
            style={styles.textInput}
            value={customModalIconUrl}
            onChangeText={setCustomModalIconUrl}
          />
          <TouchableOpacity onPress={onLearnMorePress}>
            <Text style={styles.link}>
              Learn more about customizing the ConnectWallet button
            </Text>
          </TouchableOpacity>
        </View>
        <ThirdwebProvider
          clientId={TW_CLIENT_ID}
          activeChain={Sepolia}
          locale={selectedLanguage}
          dAppMeta={{
            name: 'thirdweb connect demo',
            logoUrl: 'https://thirdweb.com/favicon.ico',
            isDarkMode: false,
            url: 'https://thirdweb.com',
          }}
          supportedChains={[Mumbai, Sepolia, Goerli]}
          supportedWallets={[
            embeddedWallet({
              auth: {
                redirectUrl: 'com.thirdweb.connect://',
                options: ['email', 'facebook', 'apple', 'google'],
              },
              walletConnectReceiver: true,
            }),
            coinbaseWallet({
              callbackURL: new URL('com.thirdweb.connect.coinbase://'),
            }),
            trustWallet(),
            metamaskWallet(),
            walletConnect({
              recommended: true,
            }),
            smartWallet(localWallet(), {
              factoryAddress: '0xF3a2674E24A26126794edFfb8b005F7fDb7baEf3', // sepolia
              gasless: true,
              walletConnectReceiver: true,
            }),
          ]}>
          <Box>
            <ConnectWallet
              buttonTitle={customButtonText}
              theme={isLightTheme ? 'light' : 'dark'}
              modalTitle={customModalTitle}
              {...(customModalIconUrl !== undefined
                ? {modalTitleIconUrl: customModalIconUrl}
                : {})}
            />
          </Box>
        </ThirdwebProvider>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  sendEmailContainer: {
    alignItems: 'center',
  },
  drawer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  safe: {
    flex: 1,
    backgroundColor: '#131417',
  },
  theme: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    marginRight: 15,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  textInput: {
    color: '#fff',
    padding: 10,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 10,
  },
  link: {
    color: '#3385FF',
    fontWeight: '700',
    margin: 16,
    textDecorationLine: 'underline',
  },
  title: {
    marginTop: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  motto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  text: {
    color: '#fff',
    paddingHorizontal: 10,
  },
  switch: {
    margin: 20,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  view: {
    backgroundColor: '#131417',
    justifyContent: 'space-between',
    paddingHorizontal: 34,
    paddingBottom: 20,
    paddingTop: 20,
    flex: 1,
  },
  logo: {
    width: 200,
  },
});
