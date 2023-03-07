import { IChildren } from '@/interfaces/IChildren';
import { WrapperContainer } from './style';

export const Container = ({ children }: IChildren) => {
  return <WrapperContainer>{children}</WrapperContainer>;
};
