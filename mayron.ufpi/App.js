import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { Component } from 'react';
import {View, StatusBar, Text, Image, Dimensions } from 'react-native';

import Home_Screen from './Screens/Home_Screen';
import Reader_Screen from './Screens/Reader_Screen';

const Stack = createStackNavigator();
var {width} = Dimensions.get('window');
var position_title = width/2 - 15 - (64.33333587646484/2)

function CustomHeader({}){
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <Text
        style={{
          color: '#fff',
          fontSize: 21,
          fontWeight: 'bold',
          position: 'absolute',
          right: position_title,
        }}
      >Luneta</Text>
      <Image
        source={require('./assets/Luneta.png')}
        style={{width: 50, height: 50, position: "absolute", right: 0}}
      />
    </View>
  )
}
// , left: 180 - (64.33333587646484/2)
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home_Screen}
          options={({ navigation, route })=> ({
            headerTitle: props => <CustomHeader navigation={navigation} route={route} {...props}/>,
            headerStyle: {
              backgroundColor: '#161A31',
            },
          })}
        />
        <Stack.Screen
          name="Reader"
          component={Reader_Screen}
          options={({ navigation, route })=> ({
            headerTitle: props => <CustomHeader navigation={navigation} route={route} {...props}/>,
            headerStyle: {
              backgroundColor: '#161A31'
            },
            headerTintColor: 'white'
          })}
        />
      </Stack.Navigator>
      <StatusBar style={{backgroundColor: '#161A31'}}/>
    </NavigationContainer>
  );
}
export default App