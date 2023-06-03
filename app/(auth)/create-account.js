import { Text, View, TextInput, StyleSheet,Alert,TouchableOpacity } from "react-native";
import { useRef } from "react";
import { AuthStore, appSignUp } from "../../store.js";
import { Stack, useRouter } from "expo-router";
import {primaryColor,bgColor,textColor,darkwhite,secondaryColor} from '../../color.js'
export default function CreateAccount() {
  const router = useRouter();
  const emailRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const passwordRef = useRef("");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{color:primaryColor,fontSize:20,marginBottom:20}}>Sign Up</Text>
      <Stack.Screen
        options={{ title: "Create Account", headerLeft: () => <></> }}
      />
      
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="email"
          nativeID="email"
          onChangeText={(text) => {
            emailRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder="firstName"
          nativeID="firstName"
          onChangeText={(text) => {
            firstNameRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="lastName"
          nativeID="lastName"
          onChangeText={(text) => {
            lastNameRef.current = text;
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
          const resp = await appSignUp(
            emailRef.current,
            passwordRef.current,
            firstNameRef.current + " " + lastNameRef.current
          );
          if (resp?.user) {
            router.replace("/(tabs)/home");
          } else {
            Alert.alert(resp.error);
            Alert.alert("Sign Up Error", resp.error?.message);
          }
        }}>
      <View style={{backgroundColor:primaryColor,
        margin:20,borderColor:primaryColor,
        width:350,height:40,alignItems:'center',justifyContent:'center',borderRadius:5}}>
      <Text style={{color:secondaryColor,fontSize:15,fontWeight:'bold'}}>
        Sign Up
      </Text>
      </View>
      </TouchableOpacity>
      <Text style={{color:textColor}}>Already have account ?</Text>
      <Text
      style={{color:textColor,textDecorationLine:'underline',color:primaryColor,fontSize:15}}
        onPress={() => {
          AuthStore.update((s) => {
            s.isLoggedIn = false;
          });
          router.back();
        }}
      >
        Login
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
