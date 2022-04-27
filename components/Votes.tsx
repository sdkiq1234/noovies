import React from 'react';
import styled from 'styled-components/native';

const Vote = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

interface VotesProps {
  voteAverage: number;
}

const Votes: React.FC<VotesProps> = ({ voteAverage }) => (
  <Vote>{voteAverage > 0 ? `⭐ ${voteAverage}/10` : 'Coming soon'} </Vote>
);

export default Votes;
