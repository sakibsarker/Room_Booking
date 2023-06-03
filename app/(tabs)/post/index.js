import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Image, Alert } from 'react-native';
import { primaryColor, secondaryColor, textColor, bgColor } from '../../../color';
import { get, ref, set } from 'firebase/database';
import { db } from '../../../firebase-config';
import { AuthStore } from '../../../store';
import { MaterialIcons } from '@expo/vector-icons';

const Post = () => {
    const [room, setRoom] = useState('');
    const [amount, setAmount] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    
    function addRoom() {
      const serialNumber = Date.now().toString(); // Generate unique serial number
      const path = `addroom/${AuthStore.getRawState().user?.displayName}/${serialNumber}`;

      set(ref(db,path), {
        username: AuthStore.getRawState().user?.displayName,
        room: room,
        amount: amount,
        imgUrl: imgUrl,
      }).then(() => {
        // Clear form fields after successfully adding the room
        setRoom('');
        setAmount('');
        setImgUrl('');
      })
      .catch((error) => {
        Alert.alert('Error adding room:', error);
      });
    }
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: textColor, fontSize: 25, marginBottom: 20,fontWeight:'400' }}>Enter Room Details</Text>
  
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: secondaryColor, height: '5%', width: '40%', borderRadius: 5,alignContent:'center',flexDirection:'row' }}>
        <MaterialIcons name="person-pin" size={25} color={primaryColor} />
          <Text style={{ color: textColor,justifyContent:'center',alignItems:'center',marginLeft:5 }}>{AuthStore.getRawState().user?.displayName}</Text>
        </View>
        <View>
          <Text style={styles.label}>Room Title</Text>
          <TextInput
            value={room}
            onChangeText={(room) => {
              setRoom(room);
            }}
            placeholder="Enter Room Title"
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Room  charge</Text>
          <TextInput
            value={amount}
            onChangeText={(amount) => {
              setAmount(amount);
            }}
            placeholder="Enter room charge"
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Picture Url
          </Text>
          <TextInput
            value={imgUrl}
            onChangeText={(imgUrl) => {
              setImgUrl(imgUrl);
            }}
            placeholder="Enter picture link"
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity onPress={addRoom}>
          <View
            style={{
              backgroundColor: primaryColor,
              margin: 20,
              borderColor: primaryColor,
              width: 350,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <Text style={{ color: secondaryColor, fontSize: 15, fontWeight: 'bold' }}>Add Room</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    label: {
      marginBottom: 4,
      color: textColor,
    },
    textInput: {
      width: 350,
      borderWidth: 3,
      borderRadius: 4,
      borderColor: secondaryColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginBottom: 8,
      backgroundColor: secondaryColor,
      color: textColor,
    },
  });  

export default Post