'use server';

import { ResponseVerificationAction } from "@/types";
import { getVerificationTokenByToken } from "./data";
import { getUserByEmail } from "./data";
import { db } from "./db";

export async function NewVerificationAction(token: string): Promise<ResponseVerificationAction> {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return {
            error: 'Token not found'
        }
    }

    const expired = new Date(existingToken.expires) < new Date();

    if (expired) {
        return {
            error: 'Token has expired'
        }
    }

    const user = await getUserByEmail(existingToken.identifier);

    if (!user) {
        return {
            error: 'Email not found'
        }
    }

    await db.user.update({
        where: {
            id: user.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.identifier
        }
    })

    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return {
        success: 'Your email was verified'
    }
}