import React, { useState } from 'react'
import { Modal } from 'react-native'
import { CategorySelectField } from '../../components/CategorySelectField';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
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

export const Register = () => {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const handleTransactionTypeSelect = (type: 'up' | 'down') => setTransactionType(type)
  
  const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true)

  const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false)

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder='Nome' />
          <Input placeholder='Preço' />

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


        <Button title='Enviar' />
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
  );
}