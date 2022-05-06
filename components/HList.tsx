import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import VMedia from './VMedia';

const ListContainer = styled.View``;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-top: 30px;
`;

const HListSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: any[];
}

const HList: React.FC<HListProps> = ({ data, title }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id + ''}
      ItemSeparatorComponent={HListSeparator}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 15 }}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path || ''}
          originalTitle={item.original_title}
          voteAverage={item.vote_average}
        />
      )}
    />
  </ListContainer>
);

export default HList;
