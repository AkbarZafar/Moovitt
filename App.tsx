import React from "react";
import Amplify, { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import awsconfig from "./aws-exports";
import 'react-native-gesture-handler';
import { Authentication } from "./components/Authentication/Authentication";
import { BoxInterface } from "./components/BoxManagement/BoxInterface";
import { Button, KeyboardAvoidingView, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from "./components/Home/HomeScreen";
import { QRScanner } from "./components/QRScanner/QRScanner";
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  BoxInterface: { boxId: string | undefined };
  Authentication: undefined;
  QRScanner: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

//TODO remove for mobile testing
// awsconfig.oauth.redirectSignIn = "http://localhost:19006/";
// awsconfig.oauth.redirectSignOut = "http://localhost:19006/";

Amplify.configure(awsconfig);

const App: React.FC = () => {
  const [user, setUser] = useState<any>(undefined);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch(() => console.log("Not signed in"));
  }, [user]);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user && <Stack.Screen name="Authentication" component={Authentication}/>}
        <Stack.Screen name="Home" 
          component={HomeScreen} 
          options={
            { 
              title: 'Overview'
            }
          }/>
        <Stack.Screen
            name="BoxInterface"
            component={BoxInterface}
        />
        <Stack.Screen
          name="QRScanner"
          component={QRScanner}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};
export default App;
