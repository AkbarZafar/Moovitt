import React, { useEffect, useState, version } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ToastAndroid,
} from "react-native";
import Amplify, { API, graphqlOperation, toast } from "aws-amplify";
import * as mutations from "../../src/graphql/mutations";
import * as queries from "../../src/graphql/queries";
import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from '../../App'
import { Box } from "../../models";
import * as APIt from '../../src/API'
import { RouteProp } from '@react-navigation/native';
import { GraphQLResult } from "@aws-amplify/api";

type BoxInterfaceNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BoxInterface'
>;

type BoxInterfaceRouteProp = RouteProp<RootStackParamList, 'BoxInterface'>;

type Props = {
  navigation: BoxInterfaceNavigationProp;
  route: BoxInterfaceRouteProp;
};

export const BoxInterface = ({route, navigation}: Props) => {
  const [boxName, setboxName] = useState('')
  const [boxLocation, setBoxLocation] = useState('')
  const [itemList, setItemList] = useState<(string)[]>([])

  const { boxId, version } = route.params

  useEffect(() => {
    if (boxId) {
      fetchBoxData().then(data => {
        setboxName(data!.name)
        setBoxLocation(data!.location)
        setItemList(data?.items!);
      });
    }    
  }, [boxId])

  const fetchBoxData = async () => {
    try {
      const boxQV: APIt.GetBoxQueryVariables = {id: boxId};
      const boxGQL: GraphQLResult<APIt.GetBoxQuery> = await API.graphql(
        graphqlOperation(queries.getBox, boxQV)
      ) as GraphQLResult<APIt.GetBoxQuery>

      if (boxGQL.data) {
        const box = boxGQL.data.getBox;
        return box
      }
      
    } catch (err) {
      console.log("error retrieving box:", err);
    }
  }

  const addbox = async () => {
    try {
      const box: APIt.CreateBoxInput = {
        name: boxName,
        location: boxLocation,
        items: itemList.filter( (element) => {
          return element != null && element != ''
        } )
      };
      const newBox = await API.graphql(
        graphqlOperation(mutations.createBox, { input: box })
      );
      if (newBox !== undefined) {
        navigation.goBack()
      }
    } catch (err) {
      console.log("error creating box:", err);
    }
  }

  const updateBox = async () => {
    try {
      const box: APIt.UpdateBoxInput = {
        id: boxId!,
        name: boxName,
        location: boxLocation,
        items: itemList.filter( (element) => {
          return element != null && element != ''
        } ),
        _version: version!
      };

      const updatedBox = await API.graphql(
        graphqlOperation(mutations.updateBox, { input: box, id: boxId })
      );
      if (updatedBox !== undefined) {
        navigation.goBack()
      }
    } catch (err) {
      console.log("error updating box:", err);
    }
  }

  const updateItem = ( val: string, index: number) => {
    let itemArray: string[] = [...itemList]
    itemArray[index] = val

    setItemList(itemArray)
  }

  const upsertBox = () => {
    if(boxId) {
      return <Button title="Update box" onPress={updateBox} />
    } else {
      return <Button title="Create box" onPress={addbox} />
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(val) => setboxName(val)}
        style={styles.input}
        value={boxName}
        placeholder="Name"
      />
      <TextInput
        onChangeText={(val) => setBoxLocation(val)}
        style={styles.input}
        value={boxLocation}
        placeholder="Location"
      />
      <Text>Items</Text>
      {itemList.map((name, index) => <TextInput
                    onChangeText={(val) => updateItem( val, index)}
                    style={styles.input}
                    value={name}
                    key={index}
                    placeholder="Item Name"
                    />)}
      
      <Button title="Create item" onPress={ () => {setItemList([...itemList, ''])}} />
      {upsertBox()}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  box: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
  boxName: { fontSize: 18 },
});
