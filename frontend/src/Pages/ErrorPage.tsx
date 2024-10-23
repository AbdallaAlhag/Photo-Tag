import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, Header } from "../Components";
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  statusCode = 404,
  title = "Oops! Page not found",
  message = "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            {statusCode} - {title}
          </h1>
          <p className="mt-2 text-sm text-gray-600">{message}</p>
          <div className="mt-8 space-y-4">
            <Link
              to="/"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300"
            >
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorPage;