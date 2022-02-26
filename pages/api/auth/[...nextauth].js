import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

import User from '../../../models/user';
import dbConnect from '../../../config/dbConnect';

export default NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {

                dbConnect();

                const { email, password } = credentials;

                // Check if email and password is entered
                if (!email || !password) {
                    throw new Error('Please enter email or password');
                }

                // Find user in the database
                const user = await User.findOne({ email }).select('+password')

                if (!user) {
                    throw new Error('Invalid Email or Password')
                }

                // Check if password is correct or not
                const isPasswordMatched = await user.comparePassword(password);

                if (!isPasswordMatched) {
                    throw new Error('Invalid Email or Password')
                }
                return Promise.resolve(user);

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Persist the OAuth access_token to the token right after signin
            if (user) {
                token.id = user.id
            }
            return Promise.resolve(token);
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            if (token) {
                session.id = token.id;
            }
            return Promise.resolve(session);
        }
    },
    secret: "test"
})