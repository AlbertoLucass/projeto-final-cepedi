import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Feather } from "@expo/vector-icons";
import {
  Wrapper,
  Container,
  Header,
  HeaderButtonContainer,
  ButtonIcon,
  ButtonText,
  ContentContainer,
  Title,
  Description,
} from "../Details/styles";
import Logo from "../../components/Logo";
import theme from "../../theme";
import { Button } from "../../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack"; // Import this type
import { RootStackParamList } from "../../utils/Types"; // Import your root stack params

import { VagaProps } from "../../utils/Types";

// Use NativeStackScreenProps to type the props correctly
type DetailsProps = NativeStackScreenProps<RootStackParamList, "Details">;

const Details: React.FC<DetailsProps> = ({ route, navigation }) => {
  const [id, setID] = useState<string>(route.params.id);
  const [vaga, setVaga] = useState<VagaProps | null>(null);

  const fetchVaga = async (): Promise<void> => {
    try {
      const response = await api.get(`api/vagas/${id}`);
      const data = response.data;
      setVaga({
        id: data.id,
        title: data.title,
        date: data.dataCadastro,
        description: data.descricao,
        phone: data.telefone,
        company: data.empresa,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVaga();
  }, [id]);

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

      {vaga ? (
        <Container>
          <ContentContainer>
            <Title>{vaga.title}</Title>
            <Description>{vaga.description}</Description>
          </ContentContainer>

          <Button
            title="Entrar em contato"
            noSpacing={true}
            variant="primary"
          />
        </Container>
      ) : (
        <Title>Vaga não foi encontrada</Title>
      )}
    </Wrapper>
  );
};

export default Details;
