'use client'

import Link from "next/link";

export default function Administration() {
    return (
        <div className='container flex h-screen flex-col text-white p-8 bg-gray-900 rounded-lg shadow-lg'>
            <div className="container mx-auto p-8">
                <h1 className="text-3xl text-gray-500 font-bold mb-8">Administration</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <Link href="/parameters/caisses" className="block group flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow transition duration-300 ease-in-out group-hover:bg-gray-100">
                        <div className="text-4xl text-gray-600 mb-4">
                            <i className={`fas fa-box`}></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Caisses</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
}
