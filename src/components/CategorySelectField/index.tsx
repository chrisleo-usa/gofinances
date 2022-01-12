import React from 'react'
import { 
  Container,
  Category,
  Icon,
} from './styles'

interface CategorySelectFieldProps {
  title: string;
  onPress: () => void;
}

export const CategorySelectField = ({ title, onPress }: CategorySelectFieldProps) => {
  return (
    <Container onPress={onPress}>
      <Category>
        {title}
      </Category>

      <Icon name='chevron-down' />
    </Container>
  )
}