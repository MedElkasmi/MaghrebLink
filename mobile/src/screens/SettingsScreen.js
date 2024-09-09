import React from 'react'
import { View, Button, Text, StyleSheet } from 'react-native'
import i18n, { changeLanguage } from '../i18n/i18n'

const SettingsScreen = () => {
  const switchToFrench = () => {
    changeLanguage('fr')
  }

  const switchToSpanish = () => {
    changeLanguage('es')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{i18n.t('language')}</Text>
      <Button title="Switch to French" onPress={switchToFrench} />
      <Button title="Switch to Spanish" onPress={switchToSpanish} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
})

export default SettingsScreen
