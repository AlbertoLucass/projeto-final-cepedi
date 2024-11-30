import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container, Content, OpenButton, Title, Data, Company } from './styles';
import { Feather } from '@expo/vector-icons';

import { RootStackParamList } from '../../utils/Types';

interface VagaCardProps {
  id: string;
  title: string;
  dataCreated: string;
  company: string;
}


type VagaCardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

const VagaCard: React.FC<VagaCardProps> = ({ id, title, dataCreated, company }) => {
  const navigation = useNavigation<VagaCardNavigationProp>();

  return (
    <Container onPress={() => navigation.navigate('Details', { id })}>
      <Content>
        <Title numberOfLines={1}>{title}</Title>
        <Data>{dataCreated}</Data>
        <Company numberOfLines={1}>{company}</Company>
      </Content>
      <OpenButton>
        <Feather name="chevron-right" size={24} color={'#3D6CB9'} />
      </OpenButton>
    </Container>
  );
};

export default VagaCard;
