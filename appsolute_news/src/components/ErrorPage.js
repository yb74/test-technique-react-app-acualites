import React from 'react';

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="px-4 lg:py-12">
                <div className="lg:gap-4 lg:flex">
                    <div
                        className="flex flex-col items-center justify-center md:py-24 lg:py-32"
                    >
                        <h1 className="font-bold text-blue-600 text-9xl">API error</h1>
                        <p
                            className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
                        >
                            <span className="text-red-500">Oops!</span> Aucune donnée trouvée
                        </p>
                        <p className="mb-8 text-center text-gray-500 md:text-lg">
                            Il semblerait qu'il y ait une erreur dans votre requête d'API
                        </p>
                    </div>
                    <div className="mt-4">
                        <img src="/api_request_error.png" alt="Error API request" className="object-cover w-full h-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;