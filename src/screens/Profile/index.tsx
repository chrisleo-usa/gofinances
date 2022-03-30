import React from 'react';

import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native'

export const Profile = () => {
  return (
    <View>
      <Text testID='text-title'>Perfil</Text>

      <TextInput 
        testID='input-name'
        placeholder='Nome'
        autoCorrect={false}
        value='Chris'
      />

      <TextInput 
        testID='input-surname'
        placeholder='Sobrenome'
        value='Alves'
      />

      <Button 
        title='Salvar'
        onPress={() => {}}
      />
    </View>
  )
}