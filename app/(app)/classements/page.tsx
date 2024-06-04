'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Champions(){
    

    if (!true) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
                    <svg className="animate-spin h-8 w-8 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 4.418 3.582 8 8 8v-4zm12-1.729A7.96 7.96 0 0120 12h4c0 4.418-3.582 8-8 8v-4z"></path>
                    </svg>
                    <p className="text-center mt-2">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 bg-gray-900">
            
        </div>
    );
}
