import React, { useState } from 'react'
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'
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

  const navigation = useNavigation();

  const dataKey = '@gofinances:transactions'

  const {
    control, //responsável por controlar cada input e não ficar atualizando toda vez o seu estado, fazendo o form ser mais performático
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  })

  const handleTransactionTypeSelect = (type: 'positive' | 'negative') => setTransactionType(type)
  
  const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true)

  const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false)

  const handleRegister = async (form: FormDataProps) => {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []
      const dataFormatted = [
        ...currentData, newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))
      console.log(dataFormatted)

      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria'
      })
      navigation.navigate('Listagem')
      
      Alert.alert('Registro realizado com sucesso.')
    } catch (error) {
      console.log(error)
      Alert.alert('Ops, algo deu errado e não foi possível salvar o registro.')
    }
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
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton 
                title='Outcome'
                type='down' 
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionType === 'negative'}
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