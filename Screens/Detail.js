import { View, Text, TextInput, StyleSheet, Pressable, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Detail = ({ route }) => {
  const todoRef = firebase.firestore().collection('todos');
  const [textHeading, onchangeHeadingText] = useState(route.params.item.heading); // Retrieve the heading from route.params.item
  const navigation = useNavigation();

  const updateTodo = () => {
    if (textHeading && textHeading.length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading,
        })
        .then(() => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <ImageBackground source={require('../assets/adv3.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              onChangeText={onchangeHeadingText}
              value={textHeading}
              placeholder="Update Plan"
              multiline={true}
              scrollEnabled={true}
            />
            <Pressable style={styles.button} onPress={() => updateTodo()}>
              <Text style={styles.buttonText}>UPDATE</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Detail;

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