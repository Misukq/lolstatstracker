'use client'

import { LoginButton, LogoutButton } from "@/app/auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data: session } = useSession();

    const handleLogout = async () => {
        await signOut()
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (
        <nav style={{ backgroundColor: '#101E35' }} className="shadow shadow-gray-300 w-full px-8 md:px-auto">
            <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">

                <div className="text-white md:order-1">
                    <a href="" className="text-md font-bold">
                        Misukq.gg
                    </a>
                </div>
                
                <div className="hidden md:flex text-gray-500 order-3 w-full md:w-auto md:order-2">
                    <ul className="flex font-semibold justify-between">
                        <li className="md:px-4 md:py-2 hover:text-white"><Link href="/">Dashboard</Link></li>
                        <li className="md:px-4 md:py-2 hover:text-white"><Link href="/champions">Champions</Link></li>
                        <li className="md:px-4 md:py-2 hover:text-white"><Link href="/classements">Classements</Link></li>
                        <li className="md:px-4 md:py-2 hover:text-white"><Link href="/statistiques">Statistiques</Link></li>
                        <li className="md:px-4 md:py-2 hover:text-white"><Link href="/parameters">Parameters</Link></li>
                    </ul>
                </div>

                <div className="hidden md:flex order-2 md:order-3">
                    { session ?
                    (<>
                        <div className="flex relative" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                            <div className="text-white md:px-4 md:py-2">{session?.user?.name}</div>
                            <svg className="h-8 w-8 text-gray-500 pt-1"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"> 
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                            </svg>
                            {isDropdownOpen && (
                                <div style={{ backgroundColor: '#1a3054' }} className="absolute top-full right-0 mt-1 text-gray-500 rounded shadow-md">
                                    <ul className="py-1">
                                        <li className="px-4 py-2 hover:bg-#101E35">
                                            <Link href="/profile/edit" className="hover:text-white">
                                                Edit Profile
                                            </Link>
                                        </li>
                                        <li className="px-4 py-2">
                                            <LogoutButton />
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>
                    ):
                    (
                        <LoginButton/>
                    )}
                </div>

                <button onClick={() => setIsOpen(!isOpen)} type="button" className="md:hidden text-gray-500 hover:text-white focus:outline-none focus:text-white">
                    <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden text-gray-500 w-full">
                    <ul className="flex flex-col items-start font-semibold">
                        <li className="px-4 py-2 text-white"><Link href="/">Dashboard</Link></li>
                        <li className="px-4 py-2 hover:text-white"><Link href="/champions">Champions</Link></li>
                        <li className="px-4 py-2 hover:text-white"><Link href="/classements">Classements</Link></li>
                        <li className="px-4 py-2 hover:text-white"><Link href="/statistiques">Statistiques</Link></li>
                        <li className="px-4 py-2 hover:text-white"><Link href="/parameters">Parameters</Link></li>
                        <li className="px-4 py-2 hover:text-white">
                            {session ? (<LogoutButton />) : (<LoginButton />)}
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}