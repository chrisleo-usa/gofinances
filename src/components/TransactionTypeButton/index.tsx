import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { 
  Container,
  Icon,
  Title,
} from './styles'

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

export const TransactionTypeButton = ({ title, type, isActive, ...rest }: TransactionTypeButtonProps) => {
  return (
    <Container 
      type={type}
      isActive={isActive}
      {...rest}
    >
      <Icon 
        type={type}
        name={icons[type]} 
      />
      <Title>{title}</Title>
    </Container>
  )
}