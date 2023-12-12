import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="container">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-5 text">Oops!</h1>
          <p className="mb-3 text-lg">Sorry, an unexpected error has occurred.</p>
          <p className="italic text-lg text-muted">Page {error.statusText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-xl font-bold">Something went wrong!</h1>
    </div>
  );
}
