import { useRouteError } from "react-router"

const ErrorPage = () => {
    const error = useRouteError();
  return (
    <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has ocurred.</p>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
    </div>
  )
}

export default ErrorPage