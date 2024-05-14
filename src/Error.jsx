import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div>
              <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
            <div className="rounded-lg  text-center">
                <img className="h-[400px]" src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png" alt="" />
            <h1 className="mb-4 text-4xl font-bold text-[#043BD4]">404</h1>
            <p className="text-gray-600">Oops! The page you are looking for could not be found.</p>

            <Link to="/" className="text-blue-700">Go back to home</Link>
            </div>
            </div>
        </div>
    );
};

export default Error;