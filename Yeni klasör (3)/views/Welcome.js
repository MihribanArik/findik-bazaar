import React,{useEffect} from "react";
import { ImageBackground } from "react-native";
import { Heading, Text , VStack, HStack, Center, Box,Stack, Button, View} from "native-base";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';

export default function Welcome() {
  const navigation = useNavigation();

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
      <ImageBackground source={require('../assets/welcome.jpg')} style={{width: '100%', height: '100%'}}>
      <Center flex={1} mx={2}  mb={5}>
      <VStack space={60} >
        <VStack space={1} mt="70" mx={5}>
          <Heading textAlign="left" size="2xl" color="white" fontFamily='Poppins-Regular'> Hoşgeldiniz!  </Heading>
          <Heading textAlign="center" mx="0" size="3xl" fontSize={45} color="amber.700" fontFamily='Poppins-Regular'>Fındık Bazzar</Heading>
          <Heading textAlign="right" size="2xl" color="white" fontFamily='Poppins-Regular'>artık yanınızda</Heading>
        </VStack>

        <HStack space={2} alignSelf="center" mx={5}>
          <Button size="lg" borderRadius={50}  px="10" colorScheme="amber" backgroundColor="amber.800" onPress={() => navigation.navigate('Register')}>
           <Text fontWeight="bold" fontSize="xl" fontFamily='Poppins-Regular'  color="white"> Kayıt Ol </Text>
          </Button>
          <Button size="lg" borderRadius={50} px="10" colorScheme="amber"  backgroundColor="amber.800" onPress={() => navigation.navigate('Login')}>
           <Text fontWeight="bold" fontSize="xl" fontFamily='Poppins-Regular'  color="white"> Giriş Yap </Text>
          </Button>

        </HStack>
        <HStack alignSelf="center" mx={5} my={0}
        alignItems="center" py={0}
        >
           <Button size="lg" borderRadius={50} px="10" colorScheme="amber"  backgroundColor="amber.800" onPress={() => navigation.navigate('ZiraiDestek')}>
           <Text fontWeight="bold" fontSize="xl" fontFamily='Poppins-Regular'  color="white"> Zirai Destek Al </Text>
          </Button>
          
        </HStack>
        
        <Stack  space={3}>
          <Box p="4" maxW="1000" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" >
            <Text fontWeight="600" color="white" fontSize="lg">
            Fındık Üreticileri İçin Kolay Satış Kanalı! Üretiminizi daha geniş kitlelere ulaştırmanızı sağlıyoruz.
            </Text>
          </Box>
          <Box p="4" maxW="1000" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" >
            <Text fontWeight="600" color="white" fontSize="lg">Toptan Fındık Alımında Güvenilir Partneriniz! Kaliteli ürünleri uygun fiyatlarla temin edin</Text>
          </Box>
          <Box p="4" maxW="1000" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" >
            <Text fontWeight="600" color="white" fontSize="lg">Bir Tıkla Fındık Ticareti! Fındık üretimi ve alım-satım işlemleri için en pratik çözüm.</Text>
          </Box>
        </Stack>
        
      </VStack>
      </Center>
      </ImageBackground>
      </View>
  );
}