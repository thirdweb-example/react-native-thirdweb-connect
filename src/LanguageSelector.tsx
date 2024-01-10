import {Locale} from '@thirdweb-dev/react-native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const LanguageSelector = ({
  onLanguageSelected,
}: {
  onLanguageSelected: (lang: Locale) => void;
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Locale>('en');

  const handleSelectLanguage = (language: Locale) => {
    setSelectedLanguage(language);
    onLanguageSelected(language);
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleSelectLanguage('en')}
          style={{
            ...styles.button,
            ...(selectedLanguage === 'en' ? styles.selectedButton : {}),
          }}>
          <Text style={styles.langText}>English</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelectLanguage('ja')}
          style={{
            ...styles.button,
            ...(selectedLanguage === 'ja' ? styles.selectedButton : {}),
          }}>
          <Text style={styles.langText}>日本語</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelectLanguage('es')}
          style={{
            ...styles.button,
            ...(selectedLanguage === 'es' ? styles.selectedButton : {}),
          }}>
          <Text style={styles.langText}>Español</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({
  langText: {color: 'white'},
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: '#232429',
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedButton: {
    backgroundColor: '#3385FF',
  },
});
