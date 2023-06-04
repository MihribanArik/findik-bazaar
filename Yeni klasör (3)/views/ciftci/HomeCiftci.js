import React from "react";
import { ImageBackground} from "react-native";
import { NativeBaseProvider, Box, Center, HStack, Icon, Pressable, Text, View } from "native-base";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import ProfilCiftci from "./ProfilCiftci";
import TekliflerCiftci from "./TekliflerCiftci";

function HomeCiftci() {

    const [selected, setSelected] = React.useState(1);
    return <NativeBaseProvider>
        <Box flex={1} bg="white" safeAreaTop width="100%" height="100%"  alignSelf="center">
        <ImageBackground source={require("../../assets/login.png")} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}>
          <View  flex={1} height="100%" width="100%" >
            {selected === 1 && <ProfilCiftci />}
            {selected === 2 && <TekliflerCiftci />}
          </View>
          
          <HStack bg="amber.800" alignItems="center" safeAreaBottom shadow={6}>
            <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1)}>
              <Center>
                <Icon mb="1" as={<MaterialCommunityIcons name={selected === 1 ? 'account' : 'account-outline'} />} color="white" size="sm" />
                <Text color="white" fontSize="12">
                  Profilim
                </Text>
              </Center>
            </Pressable>
            
            <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(2)}>
              <Center>
                <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? 'message' : 'message-outline'} />} color="white" size="sm" />
                <Text color="white" fontSize="12">
                  Teklifler
                </Text>
              </Center>
            </Pressable>
          </HStack>
        </ImageBackground>
        </Box>
      </NativeBaseProvider>;
}

export default HomeCiftci;