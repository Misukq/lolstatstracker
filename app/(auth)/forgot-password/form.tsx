'use client'

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { sendPasswordResetEmail } from "@/lib/email";


export const ForgotPasswordForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const callbackUrl = '/'

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try{
            await sendPasswordResetEmail(email)
            setSuccessMessage('Email sent successfully.');
        }
        catch(err: any){
            setError('Failed to send email.');
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
            {error && <Alert>{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <div className="w-full">
                <Button className="w-full" size="lg">Send</Button>
            </div>
        </form>
    )
}