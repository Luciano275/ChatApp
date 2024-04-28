import { db } from "./db";
import { uuidv7 } from 'uuidv7'

export async function getUserByEmail(email: string) {
  try {
    const results = await db.user.findUnique({
      where: {
        email
      }
    })

    return results;
  }catch (e) {
    console.error(e);
    throw new Error('Failed to fetch user by email');
  }
}

export async function getVerificationTokenByEmail(email: string) {
  try {
    const token = await db.verificationToken.findFirst({
      where: {
        identifier: email
      }
    })

    return token;
  }catch (e) {
    console.error(e);
    throw new Error('Failed to get verification token')
  }
}

export async function generateVerificationToken(email: string) {
  try {
    const token = uuidv7();
    const expires = new Date((new Date().getTime() + 3600) * 30)

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id
        }
      })
    }

    const results = await db.verificationToken.create({
      data: {
        expires,
        identifier: email,
        token
      }
    })

    return results;
  }catch (e) {
    console.error(e);
    throw new Error('Failed to generate verification token')
  }
}

export async function registerUser({
  name,
  email,
  password
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const results = await db.user.create({
      data: {
        name,
        email,
        password
      }
    })

    const token = await generateVerificationToken(email);

    return results;
  }catch (e) {
    console.error(e);
    throw new Error('Failed to register user')
  }
}