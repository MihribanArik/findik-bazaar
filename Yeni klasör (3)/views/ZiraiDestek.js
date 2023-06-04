import React,{useEffect} from "react";
import { ImageBackground } from "react-native";
import { Heading, Text , VStack, HStack, Center, Box,Divider,FlatList,Stack, Button, View,ScrollView} from "native-base";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import { Linking } from "react-native";

export default function ZiraiDestek() {
  const navigation = useNavigation();
  const elemanlar = [
    {
      id:1,
      meslek:'Ziraat Mühendisi',
      adsoyad:'Sedat Çeker',
      telefon:'05694123658',
      eposta:'sedatceker@gmail.com'
    },
    {
      id:2,
      meslek:'Kalite Kontrol Mühendisi',
      adsoyad:'Melahat Adıgüzel',
      telefon:'05326585545',
      eposta:'melahatadiguzel@gmail.com'
    },
    {
      id:3,
      meslek:'Gıda Mühendisi',
      adsoyad:'Celal Güngör',
      telefon:'05654551445',
      eposta:'celalgungor@outlook.com'
    }
  ]

  useEffect(() => {
    
    (async () => {
      AsyncStorage.getItem("token").then((value) => {
        var token = JSON.parse(decode(JSON.parse(value)));
        if(token!=null){
          if(token.userType=='ciftci'){
            navigation.navigate("HomeCiftci");
          }else{
            navigation.navigate("HomeMusteri");
          }
        }
      });
    })();

  }, []);

  return (
      <View  height="100%" width="100%" >
      <ImageBackground source={require('../assets/login.png')} style={{width: '100%', height: '100%'}}>
      <Center flex={1} mx={2}  mb={5}>
      <VStack space={60} >
        <VStack space={1} mt="70" mx={5}>
          <Heading textAlign="center" size="2xl" color="white" fontFamily='Poppins-Regular'> Zirai Destek almak bu kadar kolay  </Heading>
        </VStack>

          <Stack  space={3}>
          <Box p="4" maxW="1000" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" >
            <Text fontWeight="600" color="white" fontSize="lg">
            Zirai Destek elemanlarımız her zaman bir cep telefonu kadar yakınınızda
            </Text>
          </Box>
          <Box p="4" maxW="1000" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" >
            <Text fontWeight="600" color="white" fontSize="lg">Her biri alanında uzman mühendislerimizle her zaman daha kaliteli bir deneyim sunuyoruz</Text>
         
          </Box>
        </Stack>

        <ScrollView showsHorizontalScrollIndicator={false} height="75%">
        
        <FlatList
          data={elemanlar}
          m="0"
          p={0}
          renderItem={({ item }) => (
            <Box
              bg="amber.900"
              shadow={2}
              rounded="lg"
              my="2"
              maxWidth="100%"
              width="100%"
              alignSelf="center"
            >
              <HStack
                space={2}
                alignItems="center"
                justifyContent="center"
                p={2}
              >
                <Text bold textAlign="center" color="lightText">
                {item.meslek}
                </Text>
               
              </HStack>
              <Divider />
              <HStack
                space={2}
                alignItems="center"
                justifyContent="center"
                p={2}
              >
                <Text bold textAlign="center" color="lightText">
                {item.adsoyad}
                </Text>
               
              </HStack>
              <Divider />
              <HStack
                space={2}
                alignItems="center"
                justifyContent="space-between"
                p={2}
              >
                
                <Button
                  colorScheme="success"
                  onPress={() => Linking.openURL('tel:'+item.telefon)}
                >
                  Telefon
                </Button>

                <Button
                  colorScheme="danger"
                  onPress={() => Linking.openURL('mailto:'+item.eposta)}
                >
                  Eposta
                </Button>



                
                </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      </VStack>
      </Center>
      </ImageBackground>
      </View>
  );
}