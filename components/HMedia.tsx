import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Movie } from '../api';
import Poster from './Poster';

const HMovie = styled.View`
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 5px;
  margin-top: 5px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  releaseDate: string;
  overview: string;
  fullData: Movie;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  releaseDate,
  overview,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>{originalTitle}</Title>
          {releaseDate ? (
            <Release>
              {new Date(releaseDate).toLocaleDateString('ko', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Release>
          ) : null}
          <Overview>
            {overview !== '' && overview.length > 140
              ? `${overview.slice(0, 140)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;
