import React from 'react';
import { Text } from 'react-native';

interface Props {
  title: string
}

export const Welcome = ({title}: Props) => {
  return (
    <Text>{title}</Text>
  )
}