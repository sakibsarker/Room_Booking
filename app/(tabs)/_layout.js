import { Tabs } from "expo-router";
import { Text } from "react-native";
import {primaryColor,bgColor,textColor,darkwhite,secondaryColor} from '../../color.js'
import { Octicons,Ionicons } from '@expo/vector-icons';
import { useState } from "react";
const TabsLayout = () => {
  const [mapRegin,setMapRegin]=useState(null)
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown:true,
          title: "Home",
          tabBarActiveTintColor:primaryColor,
          tabBarInactiveTintColor:textColor,
          tabBarIcon: ({ color, size }) => <Octicons name="home" size={size} color={color} />,
          headerStyle: {
            backgroundColor:primaryColor,
          },
          headerTintColor: bgColor,
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          headerShown:true,
          headerTitle:'Add room',
          tabBarLabel:'Add room',
          tabBarActiveTintColor:primaryColor,
          tabBarInactiveTintColor:textColor,
          tabBarIcon: ({ color, size }) => <Octicons name="diff-added" size={size} color={color} />,
          headerStyle: {
            backgroundColor:primaryColor,
          },
          headerTintColor: bgColor,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown:true,
          headerTitle:'Profile',
          tabBarLabel:'Profile',
          tabBarActiveTintColor:primaryColor,
          tabBarInactiveTintColor:textColor,
          tabBarIcon: ({ color, size }) => <Ionicons name="ios-person-outline" size={size} color={color} />,
          headerStyle: {
            backgroundColor:primaryColor,
          },
          headerTintColor: bgColor,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
