import React from 'react';

// Define la forma de un enlace de breadcrumb
interface BreadcrumbLink {
    name: string;
    onClick?: () => void;
}

interface BreadcrumbProps {
    links: BreadcrumbLink[];
}

const ChevronRightIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);


const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                {links.map((link, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && <ChevronRightIcon />}
                        {index < links.length - 1 && link.onClick ? (
                            <button
                                onClick={link.onClick}
                                className="ml-1 text-sm font-medium text-gray-700 hover:text-pink-600 md:ml-2"
                            >
                                {link.name}
                            </button>
                        ) : (
                            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 capitalize" aria-current="page">
                                {link.name}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
