import React, {useState, useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import {useColorScheme, View, StyleSheet} from 'react-native';
import ButtonTable from '../../components/ButtonTable';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyComponent = props => {
  const [isLoading, setIsLoading] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      backgroundColor: isDarkMode ? '#333' : '#ddd',
      justifyContent: 'center',
    },
    row: {
      flex: 1,
      justifyContent: 'center',
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
  });

  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    const getNames = async () => {
      let response = false;
      try {
        response = await AsyncStorage.getItem('buttons').then(data => {
          setButtons(JSON.parse(data));
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    };

    const set = getNames();
  }, []);

  let _goBack = () => {
    props.navigation.navigate({
      name: 'Nicks',
    });
  };

  const [open, setOpen] = useState([]);

  const onButtonClick = childData => {
    setIsLoading(false);
    let newButtons = buttons;
    if (newButtons[childData].color !== 'tomato') {
      newButtons[childData].color = 'tomato';
    } else {
      newButtons[childData].color = 'darkseagreen';
    }
    setButtons(newButtons);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{width: '100%'}} dark={true}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="TFT" />
      </Appbar.Header>
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <ButtonTable onClick={onButtonClick} buttons={buttons} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyComponent;
