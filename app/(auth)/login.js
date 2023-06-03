import { Text, View, TextInput, StyleSheet, Alert,Image,TouchableOpacity } from "react-native";
import { AuthStore, appSignIn } from "../../store.js";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import {primaryColor,bgColor,textColor,darkwhite,secondaryColor} from '../../color.js'


export default function LogIn() {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  return (
    <View style={{flex:1,justifyContent: "center", alignItems: "center",backgroundColor:bgColor }}>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          nativeID="email"
          onChangeText={(text) => {
            emailRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          nativeID="password"
          onChangeText={(text) => {
            passwordRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity  onPress={async () => {
          const resp = await appSignIn(emailRef.current, passwordRef.current);
          if (resp?.user) {
            router.replace("/(tabs)/home");
          } else {
            Alert.alert(resp.error)
            Alert.alert("Login Error", resp.error?.message)
          }
        }}>
      <View style={{backgroundColor:primaryColor,
        margin:20,borderColor:primaryColor,
        width:350,height:40,alignItems:'center',justifyContent:'center',borderRadius:5}}>
      <Text style={{color:secondaryColor,fontSize:15,fontWeight:'bold'}}
      >
        Login
      </Text>
      </View>
      </TouchableOpacity>
      <Text style={{textAlign:'left'}}>Do you have account?</Text>
      <Text
      style={{color:primaryColor,fontSize:15,textDecorationLine:'underline',}}
        onPress={() => {
          AuthStore.update((s) => {
            s.isLoggedIn = true;
          });
          router.push("/create-account");
        }}
      >
        Sign up
      </Text>
    </View>
  );
}

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
    backgroundColor:secondaryColor,
    color:textColor
  },
});
