import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Link = styled(NavLink)`
  &:hover,
  :focus {
    transform: scale(1.05);
    text-decoration: underline;
  }
  &.active {
    color: orange;
  }
`;

export const Navigation = () => {
  return (
    <nav className='flex gap-3'>
      <Link to='/'>Home</Link>
      <Link to='/movies'>Movies</Link>
    </nav>
  );
};
