import { Button } from '@/components/ui/button';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="container">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-5 text">Oops!</h1>
          <p className="text-lg">Sorry, an unexpected error has occurred.</p>
          <p className="italic text-2xl text-muted my-3">Page {error.statusText}</p>
          <Button type="button" variant="outline" onClick={() => navigate('/')}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-xl font-bold">Something went wrong!</h1>
      <Button type="button" variant="outline" onClick={() => navigate('/')}>
        Go Back
      </Button>
    </div>
  );
}
