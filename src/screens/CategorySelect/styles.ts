import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

//Não necessário para android 9+ => Em androids mais antigos, pode ser que o Botão de selecionar categoria ao ser apertado, não feche a Modal. Isso pq ele precisa que o estilo dele seja um específico. Para isso será necessário importar da lib react-native-gesture-handler o tipo GestureHandlerRootView e no lugar da View do Container nós colocamos styled(GestureHandlerRootView), dessa forma funcionará. Este tipo é responsável por preservar o nosso component e garantindo o comportamento natural. 
//import {GestureHandlerRootView} from 'react-native-gesture-handler'
//ex: export const Container = styled(GestureHandlerRootView)

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;

  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
