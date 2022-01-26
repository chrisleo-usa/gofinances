import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { TransactionCardData } from '../../components/TransactionCard/types';
import {
  Container,
  Header, 
  UserInfo, 
  Photo, 
  User, 
  UserGreeting, 
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from './styles';
import { useFocusEffect } from '@react-navigation/native';

export interface DataListProps extends TransactionCardData {
  id: string;
}

export const Dashboard = () => {
  const [data, setData] = useState<DataListProps[]>()

  const loadTransactions = async() => {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        amount: amount,
        type: item.type,
        category: item.category,
        date: date
      }

    })
    setData(transactionsFormatted)
  }
  useEffect(() => {
    loadTransactions()
  }, [data]) // qual melhor? utilizar o useFocusEffect ou deixar o data no parametro do useEffect?

  //Solução 2:
  // useEffect(() => {
  //   loadTransactions()
  // }, []) 
  // useFocusEffect(useCallback(() => {
  //   loadTransactions()
  // }, []))
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/83377901?v=4' }}/>
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Christopher</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name='power'/>
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards
      >
        <HighlightCard title="Entradas" amount="R$17.400,00" lastTransaction="Última entrada dia 13 de abril" type="up" />
        <HighlightCard title="Saídas" amount="R$ 1.259,00" lastTransaction="Última saída dia 03 de abril" type="down" />
        <HighlightCard title="Total" amount="R$ 16.141,00" lastTransaction="01 à 16 de abril" type="total" />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}

        />
      </Transactions> 

    </Container>
  )
}
