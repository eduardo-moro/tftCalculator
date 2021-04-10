import React from 'react';
import {Button, Text} from 'react-native-paper';
import {DefaultTheme} from '@react-navigation/native';
import {StyleSheet, FlatList} from 'react-native';

export default props => {
  const btnStyles = StyleSheet.create({
    button: {
      alignItems: 'center',
      flex: 1,
      flexGrow: 1,
      height: 100,
      width: 100,
      margin: 8,
      justifyContent: 'center',
    },
    buttonTouch: {
      height: 100,
      width: 100,
      justifyContent: 'center',
    },
    blank: {
      width: 240,
    },
    list: {
      flex: 1,
      maxWidth: 344,
    },
  });

  let buttons = props.buttons;

  let orderedButtons = [];

  [1, 2, 3, 8, 0, 4, 7, 6, 5].map((i, which) => {
    orderedButtons[which] = buttons[i];
    console.log(orderedButtons[which]);
  });

  return (
    <FlatList
      style={btnStyles.list}
      data={orderedButtons}
      numColumns={3}
      keyExtrator={item => item.key}
      renderItem={({item}) => {
        return (
          <Button
            style={btnStyles.button}
            contentStyle={btnStyles.buttonTouch}
            color={item.color ?? '#3e63b0'}
            theme={DefaultTheme}
            dark={true}
            mode={item.key !== 0 ? 'contained' : 'outlined'}
            onPress={() => {
              if (item.key > 0) {
                props.onClick(item.key);
              }
            }}>
            <Text>{item.key !== 0 ? item.name : ''}</Text>
          </Button>
        );
      }}
    />
  );
};
