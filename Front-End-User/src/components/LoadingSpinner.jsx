import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="relative w-16 h-16">
                {/* Vòng gradient xoay */}
                <div className="absolute w-full h-full border-4 border-transparent border-t-blue-500 border-l-blue-500 rounded-full animate-spin"></div>
                {/* Vòng trong */}
                <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-gray-300 border-l-gray-300 rounded-full"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
