import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      Sorry, this page does not exist. Please follow this link to the
      <Link to='/'> home page</Link>.
    </div>
  );
}
