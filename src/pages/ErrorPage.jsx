import { Link } from "react-router-dom";
// using the <Link> element under react router dom to navigate to another page by clicking on it
export default function ErrorPage() {
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>You seem to have lost your way.</p>
            <p>
                Go back to safety <Link to="/">Home</Link>
            </p>
        </div>
    );
}
