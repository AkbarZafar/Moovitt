import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import awsconfig from './aws-exports';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Authentication } from './components/Authentication/Authentication';
import { Button, KeyboardAvoidingView, Text } from 'react-native';


//TODO remove for mobile testing 
awsconfig.oauth.redirectSignIn = "http://localhost:19006/"
awsconfig.oauth.redirectSignOut = "http://localhost:19006/"

Amplify.configure(awsconfig);


const App: React.FC = () => {
  const [user, setUser] = useState<any>(undefined);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(() => console.log("Not signed in"));
    console.log(user);
  }, [user]);


  return (
    <KeyboardAvoidingView>
      {!user && <Authentication />}
      <Text>{user?.attributes.email}</Text>
      <Button title='Sign out' onPress={() => Auth.signOut()} />
    </KeyboardAvoidingView>
  )
}
export default App;