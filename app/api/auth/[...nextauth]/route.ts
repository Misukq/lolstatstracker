import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'hello@example.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    return null
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })

                if(!user) {
                    return null
                }

                const isPasswordValid = await compare(credentials.password, user.password)

                if(!isPasswordValid){
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    randomKey: 'Hey Cool!'
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            // Fetch additional data (e.g. role) and add it to the session
            const user = await prisma.user.findUnique({
                where: { id: token.id },
                select: { role: true } // Assume you have a field 'role' in your User model
            });
            
            if (user) {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.id,
                        randomKey: token.randomKey,
                        role: user.role
                    }
                };
            }

            return session;
        },
        jwt: ({ token, user }) => {
            // console.log('JWT Callback', {token, user})
            if(user){
                const u = user as unknown as any
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey
                }
            }
            return token
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }