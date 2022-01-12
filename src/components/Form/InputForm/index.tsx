import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextInputProps } from 'react-native'
import { FormDataProps } from '../../../screens/Register'
import { Input } from '../Input'
import { Container, Error } from './styles'

interface InputFormProps extends TextInputProps {
  control: Control<FormDataProps>;
  name: 'name' | 'amount';
  error: string | undefined;
}

export const InputForm = ({
  control,
  name,
  error,
  ...rest
}: InputFormProps) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value} }) => (
          <Input 
            onChangeText={onChange}
            value={value as string}
            {...rest} 
          />
        )}
        name={name}
      />

      {error && <Error>{error}</Error>}
    </Container>
  )
}