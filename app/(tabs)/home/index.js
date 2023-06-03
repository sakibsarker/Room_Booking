import React, { useState, useEffect } from 'react';
import { View, Text,TextInput,Image } from 'react-native'
import {primaryColor,secondaryColor,textColor,bgColor} from '../../../color'
import { Octicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { get, ref, set } from 'firebase/database';
import { db } from '../../../firebase-config';
import { AuthStore } from '../../../store';


const Home = () => {
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    fetchRoomData();
  }, [roomData]);

  const fetchRoomData = async () => {
    try {
      const snapshot = await get(ref(db, `addroom/${AuthStore.getRawState().user?.displayName}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const roomData = Object.entries(data).map(([serialNumber, roomInfo]) => ({
          serialNumber,
          ...roomInfo,
        }));
        setRoomData(roomData);
      }
    } catch (error) {
      Alert.alert('Error fetching room data:', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginLeft: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: secondaryColor, borderRadius: 20 }}>
          <Image style={{ height: 250, width: 180, borderRadius: 20 }} source={{ uri: item.imgUrl }} />
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Text>{item.room}</Text>
            <Text>TK {item.amount}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderBestSellingItem = ({ item }) => {
    return (
      <View style={{ marginLeft: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: secondaryColor, borderRadius: 20 }}>
          <Image style={{ height: 80, width: 180, margin: 5, borderRadius: 20 }} source={{ uri: item.imgUrl }} />
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Text>{item.room}</Text>
            <Text>TK {item.amount}</Text>
          </View>
        </View>
      </View>
    );
  };
  

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: bgColor }}>
      <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Text style={{ color: primaryColor, fontSize: 20, fontWeight: 'bold', marginBottom: 30 }}>Find your room</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: 30, marginRight: 30 }}>
          <View style={{ flex: 6 }}>
            <TextInput
              placeholder="Search..."
              style={{
                width: 300,
                borderWidth: 3,
                borderRadius: 4,
                borderColor: secondaryColor,
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: secondaryColor,
                color: textColor,
              }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: primaryColor, borderRadius: 5 }}>
            <Octicons name="search" size={24} color={bgColor} />
          </View>
        </View>
      </View>
      <View style={{ flex: 3 }}>
        <Text style={{ fontWeight: 'bold', marginLeft: 30 }}>Top Rated</Text>
        <FlatList
          data={roomData}
          renderItem={renderItem}
          keyExtractor={(item) => item.serialNumber}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={{ fontWeight: 'bold', marginLeft: 30 }}>Best Selling</Text>
        <FlatList
          data={roomData}
          renderItem={renderBestSellingItem}
          keyExtractor={(item) => item.serialNumber}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, marginBottom: 30 }}
        />
      </View>
    </View>
  );
};

export default Home;
