import React, { useState } from 'react'
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form' 
import { InputForm } from '../../components/Form/InputForm';
import { CategorySelectField } from '../../components/CategorySelectField';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { 
  Container,
  Header,
  Title,  
  Form,
  Fields,
  TransactionsTypes,
} from './styles';
import { CategorySelect } from '../../screens/CategorySelect'

export interface FormDataProps {
  name: string;
  amount: string;
}

const schema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number().typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')  
})

export const Register = () => {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const {
    control, //responsável por controlar cada input e não ficar atualizando toda vez o seu estado, fazendo o form ser mais performático
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  })

  const handleTransactionTypeSelect = (type: 'up' | 'down') => setTransactionType(type)
  
  const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true)

  const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false)

  const handleRegister = (form: FormDataProps) => {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const payload = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

   console.log(payload)
  }

  return (
    <TouchableWithoutFeedback //Utilizado para ao clicar em qualquer lugar o teclado também fecha
      onPress={Keyboard.dismiss}
    >
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm 
              name='name'
              control={control}
              placeholder='Nome' 
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm 
              name='amount'
              control={control}
              placeholder='Preço' 
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton 
                title='Income'
                type='up' 
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton 
                title='Outcome'
                type='down' 
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionsTypes>

            <CategorySelectField 
              title={category.name} 
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>


          <Button 
            title='Enviar' 
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal 
          visible={categoryModalOpen}
        >
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  );
}