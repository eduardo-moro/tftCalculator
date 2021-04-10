import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, useColorScheme, KeyboarAvoidingView} from 'react-native';
import {Button, Appbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import GetNicks from '../../components/GetNicks';
import AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage';

const saveButtons = async buttons => {
  try {
    await AsyncStorage.setItem('buttons', JSON.stringify(buttons));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default props => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      height: height,
      backgroundColor: isDarkMode ? '#333' : '#f7f7f7',
    },
    text: {
      fontSize: 18,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 600,
      width: '90%',
    },
    error: {
      paddingHorizontal: 22,
      color: 'red',
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '90%',
      justifyContent: 'flex-end',
      marginVertical: 24,
    },
    button: {
      width: '48%',
    },
  });

  let _goBack = () => {
    props.navigation.navigate({
      name: 'MyNumber',
    });
  };

  let Buttons = [
    {key: 0},
    {key: 1, name: 1},
    {key: 2, name: 2},
    {key: 3, name: 3},
    {key: 4, name: 4},
    {key: 5, name: 5},
    {key: 6, name: 6},
    {key: 7, name: 7},
    {key: 8, name: 8},
  ];

  const [names, setNames] = useState([]);

  let nameNicks = () => {
    let errors = 0;
    let count = 0;
    names.map(item => {
      if (count === 0) {
        count += 1;
      }
      Buttons[count].name = item;

      if (item.length === 0) {
        Buttons[count].name = count;
        if (count === 1) {
          Buttons[count - 1].name = '';
        }
      }
      count += 1;
    });
    saveButtons(Buttons).then(() => {
      props.navigation.navigate({
        name: 'RunTft',
      });
    });
  };

  let getNicksFunc = childData => {
    if (undefined !== childData) {
      setNames(childData);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{width: '100%'}} dark={true}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Nicks" />
      </Appbar.Header>

      <View style={styles.form}>
        <GetNicks callBack={getNicksFunc} />
      </View>

      <View style={styles.actions}>
        <Button
          icon=""
          color="#48f"
          dark={true}
          style={styles.button}
          mode="contained"
          onPress={() => {
            nameNicks();
          }}>
          salvar
        </Button>
      </View>
    </SafeAreaView>
  );
};

const height = Dimensions.get('window').height;
