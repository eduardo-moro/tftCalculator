import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet, FlatList, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage';

export default props => {

  let theme = {
    colors: {
      primary: '#48f',
      underlineColor: 'transparent',
      text: '#333',
      placeholder: '#656',
    },
  };

  const setNick = (val, key) => {
    switch (key) {
      case 1:
        setNick1(val);
        break;
      case 2:
        setNick2(val);
        break;
      case 3:
        setNick3(val);
        break;
      case 4:
        setNick4(val);
        break;
      case 5:
        setNick5(val);
        break;
      case 6:
        setNick6(val);
        break;
      case 7:
        setNick7(val);
        break;
      case 8:
        setNick8(val);
        break;
    }
  };

  const [nick1, setNick1] = useState('');
  const [nick2, setNick2] = useState('');
  const [nick3, setNick3] = useState('');
  const [nick4, setNick4] = useState('');
  const [nick5, setNick5] = useState('');
  const [nick6, setNick6] = useState('');
  const [nick7, setNick7] = useState('');
  const [nick8, setNick8] = useState('');

  let callBack = (val, key) => {
    let arr = [nick1, nick2, nick3, nick4, nick5, nick6, nick7, nick8];
    arr[key - 1] = val;
    props.callBack(arr);
  };

  let inputs = [
    {key: 1, var: nick1, set: setNick1},
    {key: 2, var: nick2, set: setNick2},
    {key: 3, var: nick3, set: setNick3},
    {key: 4, var: nick4, set: setNick4},
    {key: 5, var: nick5, set: setNick5},
    {key: 6, var: nick6, set: setNick6},
    {key: 7, var: nick7, set: setNick7},
    {key: 8, var: nick8, set: setNick8},
  ];

  const getMyNumber = async () => {
    try {
      await AsyncStorage.getItem('myNumber').then(data => {
        data = JSON.parse(data);
        setNick(data.name, data.key);
        if (data.name) {
          callBack(data.name, data.key);
        } else {
          callBack('', data.key);
        }
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const init = useState(getMyNumber());

  return (
    <FlatList
      data={inputs}
      keyExtrator={item => item.key}
      renderItem={({item}) => {
        return (
          <KeyboardAvoidingView>
            <TextInput
              theme={theme}
              label={'nick' + item.key}
              value={item.var}
              style={styles.input}
              onChangeText={item => {
                setNick(item.var, item.key);
                callBack(item.var, item.key);
              }}
            />
          </KeyboardAvoidingView>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 52,
    backgroundColor: '#f7f7f7',
    width: '100%',
    marginBottom: 8,
    paddingHorizontal: 22,
    borderRadius: 3,
    justifyContent: 'center',
  },
});
