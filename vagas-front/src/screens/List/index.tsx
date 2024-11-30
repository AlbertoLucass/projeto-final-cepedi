import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Image, FlatList, View, Text } from "react-native";
import { Wrapper, Container, ListContainer, TextVagas } from "./styles";
import BGTop from "../../assets/BGTop.png";
import Logo from "../../components/Logo";
import VagaCard from "../../components/VagaCard";
import { useAuth } from "../../contexts/AuthContext";

interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  dataCadastro: string;
  telefone: string;
  status: string;
  empresa: string;
  createdAt: string;
  updatedAt: string;
}

export default function List() {
  const { signOut } = useAuth();

  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await api.get<{ jobs: Vaga[] }>("api/vagas");
        const vagas = response.data.jobs;
        setVagas(vagas);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVagas();
  }, []);

  return (
    <Wrapper>
      <Image source={BGTop} style={{ maxHeight: 86 }} />

      <Container>
        <Logo />
        <TextVagas>{vagas.length} vagas encontradas!</TextVagas>
        <ListContainer>
          {isLoading ? (
            <Text>Carregando...</Text>
          ) : (
            <FlatList
              data={vagas}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <VagaCard
                  id={item.id}
                  title={item.titulo}
                  dataCreated={item.dataCadastro}
                  company={item.empresa}
                  status={item.status}
                />
              )}
              showsVerticalScrollIndicator={true}
              ListEmptyComponent={() => (
                <View>
                  <Text>Você ainda não tem vagas cadastradas</Text>
                  <Text>Crie vagas</Text>
                </View>
              )}
            />
          )}
        </ListContainer>
      </Container>
    </Wrapper>
  );
}
