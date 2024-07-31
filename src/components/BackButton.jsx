import { useNavigate } from 'react-router';
import Button from './Button';

function BackButton() {
  // use navigate
  const navigate = useNavigate();

  return (
    <Button
      type='back'
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
