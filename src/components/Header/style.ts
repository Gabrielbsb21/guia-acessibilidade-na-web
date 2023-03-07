import styled from 'styled-components';
import { theme } from '../../theme';

export const WrapperHeader = styled.header`
  background-color: ${theme.colors.yellow};
  padding: 1.5rem;

  h1 {
    color: ${theme.colors.black};
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
