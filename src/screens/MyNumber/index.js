import React, {useState} from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import ButtonTable from '../../components/ButtonTable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';

const saveMyNumber = async key => {
  try {
    await AsyncStorage.setItem('myNumber', JSON.stringify(key));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getMyNumber = async () => {
  try {
    let response = await AsyncStorage.getItem('myNumber').then(data => {
      return data;
    });
  } catch (error) {
    console.log(error);
    return "{key: 0, name: ''}";
  }
};

export default props => {
  const isDarkMode = useColorScheme() === 'dark';
  const [name, setName] = useState(getMyNumber().name);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      backgroundColor: isDarkMode ? '#333' : '#ddd',
      justifyContent: 'center',
    },
    row: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'space-around',
      marginBottom: 32,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    text: {
      fontSize: 18,
      marginBottom: 18,
      color: isDarkMode ? '#f7f7f7' : '#333',
    },
    input: {
      flex: 1,
      maxHeight: 52,
      marginHorizontal: '8%',
      backgroundColor: '#f7f7f7',
      borderRadius: 3,
      justifyContent: 'center',
    },
  });

  const buttonsArr = [
    {key: 0},
    {key: 1, name: 1, color: '#777'},
    {key: 2, name: 2, color: '#777'},
    {key: 3, name: 3, color: '#777'},
    {key: 4, name: 4, color: '#777'},
    {key: 5, name: 5, color: '#777'},
    {key: 6, name: 6, color: '#777'},
    {key: 7, name: 7, color: '#777'},
    {key: 8, name: 8, color: '#777'},
  ];

  const onButtonClick = childData => {
    if (undefined !== childData) {
      saveMyNumber({key: childData, name: name}).then(saved => {
        if (childData !== 0 && saved) {
          props.navigation.navigate({
            name: 'Nicks',
          });
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{width: '100%'}} dark={true}>
        <Appbar.Content title="Qual sua posição?" />
      </Appbar.Header>
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <ButtonTable onClick={onButtonClick} buttons={buttonsArr} />
        </View>
        <TextInput
          label={'Seu nick'}
          theme={{
            colors: {
              primary: '#48f',
              underlineColor: 'transparent',
              text: '#333',
              placeholder: '#656',
            },
          }}
          style={styles.input}
          onChangeText={name => {
            setName(name);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
