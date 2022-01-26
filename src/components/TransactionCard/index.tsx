import React from 'react';
import { categories } from '../../utils/categories';

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';
import { TransactionCardData } from './types';

interface TransactionCardProps {
  data: TransactionCardData;
}

export const TransactionCard = ({ data }: TransactionCardProps) => {
  // [ category ] = estou pegando a primeira posição e nomeando de category
  const [ category ] = categories.filter(item => item.key === data.category)
  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        { data.type === 'negative' && '- ' }
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon}/>
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>

    </Container>
  )
}