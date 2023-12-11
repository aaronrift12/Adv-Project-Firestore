import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Pressable, Keyboard, StyleSheet, ImageBackground } from 'react-native';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection('todos');
  const [addData, setAddData] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    todoRef
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const todos = [];
        querySnapshot.forEach((doc) => {
          const { heading } = doc.data();
          todos.push({
            id: doc.id,
            heading,
          });
        });
        setTodos(todos);
      });
  }, []);

  const deleteTodo = (item) => {
    todoRef
      .doc(item.id)
      .delete()
      .then(() => {
        alert('Removed');
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addTodo = () => {
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setAddData('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <ImageBackground source={require('../assets/adv3.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="What's your plan for today?"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setAddData(text)}
            value={addData}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={addTodo}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={todos}
          numColumns={1}
          renderItem={({ item }) => (
            <View>
              <Pressable
                style={styles.todoContainer}
                onPress={() => navigation.navigate('Detail', { item })}
              >
                <FontAwesome
                  name="trash-o"
                  color="red"
                  onPress={() => deleteTodo(item)}
                  style={[styles.todoIcon, { fontSize: 20,color: 'black' }]}
                />
                <View style={styles.innerContainer}>
                  <Text style={styles.itemHeading}>
                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
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
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: 'black',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  listContentContainer: {
    flexGrow: 1,
  },
  todoContainer: {
    backgroundColor: '#e5e5e5',
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 325, // Increase the minimum width for each todo item
    paddingHorizontal: 20, // Increase the padding to the sides
    paddingVertical: 10, // Add vertical padding
  },
  innerContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  itemHeading: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  todoIcon: {
    marginRight: 22,
  },
});

export default Home;