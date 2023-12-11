import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(username, password);

      if (response.user) {
        navigation.navigate('Home'); // Redirect to the "Home" screen
      } else {
        alert('Authentication failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <ImageBackground source={require('../assets/adv4.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 80,
    justifyContent: 'flex-end',
    width: '100%', // Added width
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparent background color
    borderRadius: 30,
    padding: 30,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  formContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 70,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Login;