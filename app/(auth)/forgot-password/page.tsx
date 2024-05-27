import Link from "next/link";
import { ForgotPasswordForm } from "./form";

export default function ForgotPasswordPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
            <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
                <h1 className="font-semibold text-2xl">Forgot Password</h1>
                <div className="text-center text-gray-500" style={{'margin' : '12px 0 0 0'}}>
                    Enter your email and you will receive a link.
                </div>
                <ForgotPasswordForm/>
            </div>
        </div>
    )
}