import React, {useState} from 'react';
import {Appbar} from 'react-native-paper';
import {useColorScheme, View, StyleSheet} from 'react-native';
import ButtonTable from '../../components/ButtonTable';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

const MyComponent = props => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLoading, setIsLoading] = useState(true);
  const [killed, setKilled] = useState([]);
  const [active, setActive] = useState([]);
  const [maxActive, setMax] = useState([]);

  const forceUpdate = useForceUpdate();

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

  let _goBack = () => {
    props.navigation.navigate({
      name: 'Nicks',
    });
  };

  const [buttons, setButtons] = useState([]);

  const getNames = () => {
    return async () => {
      try {
        await AsyncStorage.getItem('buttons').then(data => {
          setButtons(JSON.parse(data));
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    };
  };

  const updateAll = key => {
    let newButtons = buttons;
    if (buttons[key].color !== 'darkseagreen') {
      return false;
    }

    buttons.map(btn => {
      if (key <= 3) {
        if (
          btn.key === key + 5 &&
          btn.color === 'tomato' &&
          !killed.includes(btn.key)
        ) {
          newButtons[btn.key].color = 'darkseagreen';
        } else if (
          btn.key === key + 5 &&
          btn.color !== 'tomato' &&
          !killed.includes(btn.key)
        ) {
          newButtons[btn.key].color = 'tomato';
        }
      } else {
        if (
          btn.key === key - 3 &&
          btn.color === 'tomato' &&
          !killed.includes(btn.key)
        ) {
          newButtons[btn.key].color = 'darkseagreen';
        } else if (
          btn.key === key - 3 &&
          btn.color !== 'tomato' &&
          !killed.includes(btn.key)
        ) {
          newButtons[btn.key].color = 'tomato';
        }
      }
    });
    setButtons(newButtons);
    forceUpdate();
  };

  const onButtonClick = childData => {
    let newButtons = buttons;

    updateAll(childData);

    if (undefined === newButtons[childData].color) {
      newButtons[childData].color = '';
    }

    if (newButtons[childData].color === 'grey') {
      return;
    }

    if (newButtons[childData].color !== 'tomato') {
      newButtons[childData].color = 'tomato';
    }

    setButtons(newButtons);
    forceUpdate();
  };

  const killEnemy = childData => {
    let newButtons = buttons;

    killed.push(childData);
    setKilled(killed);

    newButtons[childData].color = 'grey';

    setButtons(newButtons);
    forceUpdate();
  };

  const [names] = useState(getNames());

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{width: '100%'}} dark={true}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="TFT" />
      </Appbar.Header>
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <ButtonTable
            onClick={onButtonClick}
            onLongClick={killEnemy}
            buttons={buttons}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyComponent;
