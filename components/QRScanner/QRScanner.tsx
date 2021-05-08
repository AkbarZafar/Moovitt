import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, PermissionStatus } from 'expo-camera';
import * as APIt from '../../src/API'
import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../src/graphql/queries";


type QRScannerNavigationProp = StackNavigationProp<
  RootStackParamList,
  "QRScanner"
>;

type Props = {
  navigation: QRScannerNavigationProp;
};

export const QRScanner = ({ navigation }: Props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect( () => {
    requestPermissions().then(
      ({ status }) => {
        setHasPermission(status === PermissionStatus.GRANTED);
      }
    )
     
  }, []);

  const scanBarcode = async (QRCode: string) => {
    if( verifyQRCode(QRCode) ) {
      try {
        navigation.navigate('BoxInterface', {boxId: QRCode})
      } catch (err) {
        console.log("error retrieving box:", err);
      }
    }
  }

  const verifyQRCode = (QRCode: string) => {
    //placeholder
    return true
  }
  
  const requestPermissions = async () => {
    return await Camera.requestPermissionsAsync();
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} onBarCodeScanned={(data) => {scanBarcode(data.data)}}>

      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
