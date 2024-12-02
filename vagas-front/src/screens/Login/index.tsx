import React, { useState } from "react";
import { Image } from "react-native";
import {
  Wrapper,
  Container,
  Form,
  TextContainer,
  TextBlack,
  TextLink,
  TextLinkContainer,
} from "./styles";

import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

import BGTop from "../../assets/BGTop.png";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import { Button } from "../../components/Button";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/Types";

type LoginScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

interface User {
  email: string;
  senha: string;
}

const Login: React.FC<LoginScreenNavigationProp> = ({ navigation }) => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.get<{ usuarios: User[] }>("api/usuarios");
      const users = response.data.usuarios;

      const user = users.find((u) => u.email === email && u.senha === senha);

      if (user) {
        signIn(email);
        navigation.navigate("Auth", { screen: "home" });
      } else {
        console.log("Login failed: Invalid credentials.");
      }
    } catch (error) {
      console.log("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Image source={BGTop} />

      <Container>
        <Form>
          <Logo />
          <Input
            label="E-mail"
            placeholder="digite seu e-mail"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Senha"
            placeholder="digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <Button
            title="Entrar"
            noSpacing={true}
            variant="primary"
            onPress={handleLogin}
            disabled={loading}
          />
          <TextContainer>
            <TextBlack>Não tem uma conta?</TextBlack>
            <TextLinkContainer
              onPress={() => navigation.navigate("FormScreen")}
            >
              <TextLink>Crie agora mesmo.</TextLink>
            </TextLinkContainer>
          </TextContainer>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default Login;
