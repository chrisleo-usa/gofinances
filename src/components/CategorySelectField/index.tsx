import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler';
import { 
  Container,
  Category,
  Icon,
} from './styles'

interface CategorySelectFieldProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export const CategorySelectField = ({ title, onPress, testID }: CategorySelectFieldProps) => {
  return (
    <Container onPress={onPress} testID={testID} >
      <Category>
        {title}
      </Category>

      <Icon name='chevron-down' />
    </Container>
  )
}