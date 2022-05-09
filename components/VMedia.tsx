import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 5px;
  margin-top: 5px;
`;

interface VMdiaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMdiaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stack', { screen: 'Detail' });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 13)}
          {originalTitle.length > 13 ? '...' : null}
        </Title>
        <Votes voteAverage={voteAverage} />
      </Movie>
    </TouchableOpacity>
  );
};

export default VMedia;
