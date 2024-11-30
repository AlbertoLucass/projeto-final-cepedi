import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Feather } from "@expo/vector-icons";
import { Linking } from "react-native";
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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/Types";

import { VagaProps } from "../../utils/Types";

type DetailsProps = NativeStackScreenProps<RootStackParamList, "Details">;

const Details: React.FC<DetailsProps> = ({ route, navigation }) => {
  const [id, setID] = useState<string>(route.params.id);
  const [vaga, setVaga] = useState<VagaProps | null>(null);

  const fetchVaga = async (): Promise<void> => {
    try {
      const response = await api.get(`api/vagas/${id}`);
      if (response.data && response.data.job) {
        const data = response.data.job;
        setVaga({
          id: data.id,
          title: data.titulo,
          date: data.dataCadastro,
          description: data.descricao,
          phone: data.telefone,
          company: data.empresa,
          status: data.status,
        });
      } else {
        setVaga(null);
      }
    } catch (error) {
      setVaga(null);
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

      {vaga && (
        <Container>
          <ContentContainer>
            <Title>{vaga.title}</Title>
            <Description>{vaga.description}</Description>
          </ContentContainer>
          {vaga.status === "em aberto" && vaga.phone ? (
            <Button
              title="Entrar em contato"
              noSpacing={true}
              variant="primary"
              onPress={() =>
                Linking.openURL(
                  `https://wa.me/${vaga.phone.replace(/[- ]/g, "")}`
                )
              }
            />
          ) : (
            <Title style={{ marginTop: 15 }}>
              Vaga não disponível no momento
            </Title>
          )}
        </Container>
      )}
    </Wrapper>
  );
};

export default Details;
