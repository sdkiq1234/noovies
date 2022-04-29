import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  View,
  Text,
  FlatList,
} from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import HMedia from '../components/HMedia';
import Poster from '../components/Poster';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import { useQuery, useQueryClient } from 'react-query';
import { moviesApi } from '../api';

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-top: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 15px;
`;

const ListContainer = styled.View``;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 15px;
`;

const VSeparator = styled.View`
  height: 20px;
`;
const HSeparator = styled.View`
  width: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(['movies', 'nowPlaying'], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery(['movies', 'upcoming'], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(['movies', 'trending'], moviesApi.trending);
  const onRefresh = async () => {
    queryClient.refetchQueries(['movies']);
  };
  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );
  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );
  const movieKeyExtractor = (item) => item.id + '';
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming;
  return loading ? (
    <Loader>
      <ActivityIndicator color={'white'} />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trendingData.results}
              horizontal
              keyExtractor={movieKeyExtractor}
              ItemSeparatorComponent={HSeparator}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 15 }}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={VSeparator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
