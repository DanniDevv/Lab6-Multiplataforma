import React, { useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Button, Text } from 'react-native';
import { database } from '../database/firebase';
import { collection, addDoc } from 'firebase/firestore';
import * as Animatable from 'react-native-animatable';

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState('');

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === '') {
      setError('Por favor, ingresa un nombre');
      return;
    }

    try {
      await addDoc(collection(database, 'usuarios'), state);
      setState({ name: '', email: '', phone: '' });
      setError('');
      props.navigation.navigate('UsersList');
    } catch (error) {
      setError('Hubo un error al guardar el usuario. Inténtalo de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputGroup}>
        <Animatable.View animation="fadeIn" duration={500}>
          <TextInput
            placeholder='Nombre del usuario'
            onChangeText={(value) => handleChangeText('name', value)}
            style={styles.input}
            value={state.name}
          />
        </Animatable.View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <View style={styles.inputGroup}>
        <Animatable.View animation="fadeIn" duration={500} delay={200}>
          <TextInput
            placeholder='Correo electrónico'
            onChangeText={(value) => handleChangeText('email', value)}
            style={styles.input}
            value={state.email}
          />
        </Animatable.View>
      </View>
      <View style={styles.inputGroup}>
        <Animatable.View animation="fadeIn" duration={500} delay={400}>
          <TextInput
            placeholder='Número de teléfono'
            onChangeText={(value) => handleChangeText('phone', value)}
            style={styles.input}
            value={state.phone}
          />
        </Animatable.View>
      </View>
      <View style={styles.buttonContainer}>
        <Animatable.View animation="fadeIn" duration={500} delay={600}>
          <Button title='Guardar Usuario' onPress={saveNewUser} />
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default CreateUserScreen;
