import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
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

interface HighlightProps {
  amount: string;
}
interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export interface DataListProps extends TransactionCardData {
  id: string;
}

export const Dashboard = () => {
  const [transactions, setTransactions] = useState<DataListProps[]>()
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  const loadTransactions = async() => {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0;
    let expensivesTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

      if (item.type === 'positive') {
        entriesTotal += Number(item.amount)
      } else {
        expensivesTotal += Number(item.amount)
      }

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
    console.log("entriesTotal", entriesTotal)

    const total = entriesTotal - expensivesTotal
    setTransactions(transactionsFormatted)
    console.log("entries", transactionsFormatted)
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensivesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
      }
    })
    console.log("ENTRADAS", highlightData.entries.amount)
    console.log("SAÍDAS", highlightData.expensives.amount)
  }

  useEffect(() => {
    loadTransactions()
  }, []) 

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

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
        <HighlightCard title="Entradas" amount={highlightData.entries.amount} lastTransaction="Última entrada dia 13 de abril" type="up" />
        <HighlightCard title="Saídas" amount={highlightData.expensives.amount} lastTransaction="Última saída dia 03 de abril" type="down" />
        <HighlightCard title="Total" amount={highlightData.total.amount} lastTransaction="01 à 16 de abril" type="total" />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList 
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions> 

    </Container>
  )
}
