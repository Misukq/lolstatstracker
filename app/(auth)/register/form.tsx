'use client'

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useState } from "react"

export const RegisterForm = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try{
            const res = await fetch('/api/register', {
                method: "POST",
                body: JSON.stringify({
                    email,
                    name,
                    password
                }), 
                headers: {
                    'Content-Type': "application/json"
                }
            })

            if(res.ok){
                signIn()
            }
            else{
                setError((await res.json()).error)
            }
        }
        catch(error: any){
            setError(error?.message)
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]" action="">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email" 
                    type="email" 
                    required/>
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Name</Label>
                <Input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name" 
                    type="text" 
                    required/>
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password" 
                    type="password" 
                    required/>
            </div>
            {error && <Alert>{error}</Alert>}
            <div className="w-full">
                <Button className="w-full" size="lg">Register</Button>
            </div>
        </form>
    )
}