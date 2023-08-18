// import { StyleSheet, Text, View, ScrollView } from 'react-native'
// import React, { useState } from 'react'
// import { TextInput, Button } from 'react-native-paper'

// const App = () => {
//   const [list, setList] = useState([]);

//   const addInputField = () => {
//     setList([...list, ""]);
//   };

//   const handleChange = (text, index) => {
//     const updatedList = [...list];
//     updatedList[index] = text;
//     setList(updatedList);
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         {list.length > 0 ? (
//           list.map((item, index) => (
//             <View key={index}>
//               <TextInput
//                 mode="flat"
//                 value={item}
//                 onChangeText={(text) => handleChange(text, index)}
//                 style={styles.txt}
//               />
//             </View>
//           ))
//         ) : (
//           <View style={{ justifyContent: 'center', alignItems: "center" }}>
//             <Text style={styles.message}>No inputs added.</Text>
//           </View>
//         )}


//         {list.length > 0 ? (
//           list.map((item, index) => (
//             <View key={index} style={styles.card}>
//               <Text>{item}</Text>
//             </View>
//           ))
//         ) : (
//           <View style={{ justifyContent: 'center', alignItems: "center" }}>
//             <Text style={styles.message}>No Data</Text>
//           </View>
//         )}

//         <View style={{ flex: 4, justifyContent: 'flex-end' }}>
//           <Button onPress={addInputField} mode="contained-tonal" style={styles.input}>Add input</Button>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// export default App;

// const styles = StyleSheet.create({
//   container:
//   {
//     flex: 1,
//     marginTop: '10%'
//   },
//   input:
//   {
//     marginHorizontal: 20,
//     marginVertical: 20
//   },
//   message:
//   {
//     textAlign: "center",
//     alignSelf: 'center'
//   },
//   txt:
//   {
//     marginHorizontal: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 2,
//     marginVertical: 2
//   },
//   card:
//   {
//     marginHorizontal: 20,
//     backgroundColor: 'white',
//     elevation: 8,
//     paddingHorizontal: 30,
//     paddingVertical: 10,
//     marginVertical: 2,
//     borderRadius: 20
//   }
// });
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import MakeCv from './Screens/MakeCv';
import ViewCv from './Screens/ViewCv';
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MakeCv"
          component={MakeCv}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewCv"
          component={ViewCv}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;