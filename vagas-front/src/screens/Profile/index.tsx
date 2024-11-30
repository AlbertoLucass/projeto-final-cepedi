import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
  Wrapper,
  Container,
  Header,
  HeaderButtonContainer,
  ButtonIcon,
  ButtonText,
  ContentContainer,
} from "../Profile/styles";
import Logo from "../../components/Logo";
import theme from "../../theme";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "react-native"; // Import Alert for user feedback

export default function Profile({ navigation }) {
  // Get the user from AuthContext
  const { user } = useAuth();

  // State to store the user data
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  // State to manage loading and edit mode
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user data using useEffect and async/await
  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const response = await api.get('api/usuarios/3');  // Make the GET request to fetch user by ID
        setUserData(response.data.user);  // Set the user data to state
      } catch (error) {
        console.log('Error fetching user data:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
      }
    };

    // Call the function to fetch user data when the component mounts
    fetchUserData();
  }, []);  // Empty dependency array to run this effect only once on mount

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setUserData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  // Handle user update
  const handleUpdateUser = async () => {
    setIsLoading(true);
    try {
      // Perform user update API call
      const response = await api.put(`api/usuarios/${userData.id}`, {
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha
      });

      // Show success message
      Alert.alert('Sucesso', 'Informações atualizadas com sucesso');
    } catch (error) {
      console.log('Error updating user data:', error);
      Alert.alert('Erro', 'Não foi possível atualizar as informações');
    } finally {
      setIsLoading(false);
    }
  };

  // Render the Profile screen
  return (
    <Wrapper>
      <Header>
        <HeaderButtonContainer onPress={() => navigation.goBack()}>
          <ButtonIcon>
            <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
          </ButtonIcon>
          <ButtonText>Voltar</ButtonText>
        </HeaderButtonContainer>
        <Logo />
      </Header>

      <Container>
        {userData ? (
          <ContentContainer>
            <Input 
              label="Nome" 
              placeholder="digite seu nome" 
              value={userData.nome} 
              onChangeText={(text) => handleInputChange('nome', text)}
            />
            <Input 
              label="E-mail" 
              placeholder="digite seu e-mail" 
              value={userData.email} 
              onChangeText={(text) => handleInputChange('email', text)}
            />
            <Input 
              label="Senha" 
              placeholder="digite sua senha" 
              value={userData.senha} 
              onChangeText={(text) => handleInputChange('senha', text)}
              secureTextEntry
            />
          </ContentContainer>
        ) : (
          <Button title="Carregando..." noSpacing={true} variant="primary" disabled />
        )}

        <Button 
          title={isLoading ? "Salvando..." : "Salvar informações"} 
          noSpacing={true} 
          variant="primary" 
          onPress={handleUpdateUser}
          disabled={isLoading}
        />
      </Container>
    </Wrapper>
  );
}
