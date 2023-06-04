import React, { useState } from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Text,
  View,
  Divider,
  Radio,
  useToast,
  Badge,
} from "native-base";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [bilgiler, setBilgiler] = useState({
    ad: "",
    soyad: "",
    email: "",
    password: "",
    userType: "musteri",
  });

  const kayit = () => {
    if(bilgiler.ad == "" || bilgiler.soyad == "" || bilgiler.email == "" || bilgiler.password == "" || bilgiler.userType == ""){
      toast.show({
        title: "Hata",
        status: "error",
        description: "Lütfen tüm alanları doldurunuz.",
        placement: "bottom",
        duration: 3000,
      });
      return;
    }
    var userData = new FormData();
    Object.entries(bilgiler).forEach(([key, value]) => {
      userData.append(key, value);
    });
    fetch('https://findikbazaar.com.tr.ht/testapi.php?action=register', {
      method: 'POST',
      headers: {
      'Accept': 'multipart/form-data',
      },
      body: userData
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status == "success"){
        toast.show({
          title: "Başarılı",
          status: "success",
          description: responseJson.message,
          placement: "bottom",
          duration: 3000,
        });
        navigation.navigate('Login');
      }else{
        toast.show({
          title: "Hata",
          status: "error",
          description: responseJson.message,
          placement: "bottom",
          duration: 3000,
        });
      }
    });
  };

  return (
    <View height="100%" width="100%">
      <ImageBackground
        source={require("../assets/login.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              textAlign="center"
              mx="0"
              my="10"
              px="0"
              size="xl"
              color="amber.700"
              fontFamily="Poppins-Regular"
            >
              Fındık Bazzar
              <Divider my="2" borderColor="coolGray.200" borderWidth="1" />
            </Heading>
            <Heading
              size="lg"
              fontWeight="600"
              color="lightText"
              fontFamily="Poppins-Regular"
            >
              Şimdi Aramıza Katıl!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>
                  <Text color="lightText" fontFamily="Poppins-Regular">
                    Ad
                  </Text>
                </FormControl.Label>
                <Input
                  backgroundColor="white"
                  id="ad"
                  value={bilgiler.ad}
                  onChangeText={(text) =>
                    setBilgiler({ ...bilgiler, ad: text })
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color="lightText" fontFamily="Poppins-Regular">
                    Soyad
                  </Text>
                </FormControl.Label>
                <Input
                  backgroundColor="white"
                  id="soyad"
                  value={bilgiler.soyad}
                  onChangeText={(text) =>
                    setBilgiler({ ...bilgiler, soyad: text })
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color="lightText" fontFamily="Poppins-Regular">
                    Eposta
                  </Text>
                </FormControl.Label>
                <Input
                  backgroundColor="white"
                  id="email"
                  value={bilgiler.email}
                  onChangeText={(text) =>
                    setBilgiler({ ...bilgiler, email: text })
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color="lightText" fontFamily="Poppins-Regular">
                    Parola
                  </Text>
                </FormControl.Label>
                <Input
                  id="password"
                  value={bilgiler.password}
                  onChangeText={(text) =>
                    setBilgiler({ ...bilgiler, password: text })
                  }
                  type="password"
                  backgroundColor="white"
                  fontSize="md"
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color="lightText" fontFamily="Poppins-Regular">
                    Hesap Tipi
                  </Text>
                </FormControl.Label>
                <Radio.Group
                  
                  value={bilgiler.userType}  flexDirection={'row'} my="1" >
                
                  <Radio value="ciftci" my="1" mx={1} onPress={()=>setBilgiler((prevState)=>({...prevState, userType:'ciftci'}))}>
                    <Text color="lightText" fontFamily="Poppins-Regular">
                      Çiftçi
                    </Text>
                  </Radio>
                  <Radio value="musteri" my="1" mx={1} onPress={()=>setBilgiler((prevState)=>({...prevState, userType:'musteri'}))}>
                    <Text color="lightText" fontFamily="Poppins-Regular">
                      Müşteri
                    </Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
              

              <Button
                mt="2"
                colorScheme="amber"
                backgroundColor="amber.800"
                color="lightText"
                onPress={() => kayit()}
              >
                <Text color="white" fontFamily="Poppins-Regular">
                  Kaydı Tamamla
                </Text>
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="lightText">
                  Hesabınız var mı?{" "}
                </Text>
                <Link
                  _text={{
                    textDecoration: "none",
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  href="#"
                  onPress={() => navigation.navigate("Login")}
                >
                  <Badge colorScheme="amber" backgroundColor="amber.700" rounded="lg">
                    <Text color="white" fontFamily="Poppins-Regular">
                      Giriş Yapın
                    </Text>
                  </Badge>
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </ImageBackground>
    </View>
  );
};

export default Register;
