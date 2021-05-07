import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ToastAndroid,
} from "react-native";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../src/graphql/queries";
import { Auth } from "aws-amplify";
import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from '../../App'
import { GraphQLResult } from "@aws-amplify/api";
import { useIsFocused } from "@react-navigation/native";
import * as APIt from '../../src/API'
import { Box } from "../../models";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen = ({navigation}: Props) => {
  const [BoxList, setBoxList] = useState<Box[] | undefined>([])
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchBoxes().then(data => {
      setBoxList(data)
      renderBoxList
    });
  },[isFocused])

  const fetchBoxes = async () => {
    try {
      const listQV: APIt.ListBoxsQueryVariables = {};
      const listGQL: GraphQLResult<APIt.ListBoxsQuery> = await API.graphql(
        graphqlOperation(queries.listBoxs, listQV)
      ) as GraphQLResult<APIt.ListBoxsQuery>

      if (listGQL.data) {
        const listQ = listGQL.data.listBoxs!.items!;
        let boxList = new Array<Box>()
        listQ.forEach(element => {
          boxList.push({
            id: element!.id,
            location: element!.location,
            name: element!.name,
            items: element!.items!
          })
        });
        return boxList
      }
      
    } catch (err) {
      console.log("error retrieving boxes:", err);
    }
  }

  const renderBoxList = () => {
    let boxObjectList: JSX.Element[] = [] 
    BoxList?.map( (x,index) => {
      boxObjectList.push(
      <View key={index}  style={styles.boxHolder}>
        <Text>
          Name: {x.name}
        </Text>
        <Text>
          Room: {x.location}  
        </Text>
        <Button
          title="Edit Box"
          onPress={() => navigation.navigate('BoxInterface', {boxId: x.id})}
        />
      </View>
)
    })
    

    return boxObjectList
  }


  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button
        title="NewBox"
        onPress={() => navigation.navigate('BoxInterface', {boxId: undefined})}
      />
      {renderBoxList()}
      <Button title="Sign out" onPress={() => Auth.signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  box: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
  boxName: { fontSize: 18 },
  boxHolder: {
    margin: 16,
    backgroundColor: "beige",
    borderWidth: 5,
  }
});