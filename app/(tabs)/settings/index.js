import { Redirect, Stack, useRouter } from "expo-router";
import { Button, Pressable, Text, TouchableOpacity, View,Image } from "react-native";
import { AuthStore, appSignOut } from "../../../store";
import { primaryColor,textColor,bgColor,secondaryColor,darkwhite } from '../../../color';
import profile from '../../../assets/profile.jpg'
import { AntDesign,Feather,Fontisto } from '@expo/vector-icons';

const Profile = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1,backgroundColor:bgColor,flexDirection:'column'}}>
      <Stack.Screen options={{ headerShown: false}} />
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Image source={profile} style={{height:100,width:100,borderRadius:50,borderColor:primaryColor,borderWidth:1}}/>
      <Text style={{fontSize:15,color:textColor,fontWeight:'bold',marginTop:20}}>
        {AuthStore.getRawState().user?.displayName}
      </Text>
      <Text style={{color:primaryColor,fontSize:15 }}>
        {AuthStore.getRawState().user?.email}
      </Text>
      </View>
      <View style={{flex:2,flexDirection:'column',marginLeft:30,marginTop:10}}>
        <View>
        <TouchableOpacity>
      <Text style={{fontSize:16,color:textColor,margin:10}}> <Feather name="moon" size={16} color={textColor}/>  Dark Mode</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity>
      <Text style={{fontSize:16,color:textColor,margin:10}}> <Fontisto name="world-o" size={16} color="black" />  Language</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={async () => {
          const resp = await appSignOut();
          if (!resp?.error) {
            router.replace("/(auth)/login");
          } else {
            Alert.alert(resp.error);
            Alert.alert("Logout Error", resp.error?.message);
          }
        }}>
      <Text style={{fontSize:16,color:textColor,margin:10}}> <AntDesign name="logout" size={16} color={textColor} />  Log Out</Text>
        </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};
export default Profile;
