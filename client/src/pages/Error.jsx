
export default function ErrorPage() {


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Oops! Something went wrong.
          </h2>
        </div>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-500">
            There was an error processing your request. Please try again later.
          </p>
        </div>
        <div className="text-center">
          <a
            href="/"
            className="block w-full text-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
}

