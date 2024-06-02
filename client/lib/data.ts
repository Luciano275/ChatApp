import { db } from "./db";
import { uuidv7 } from 'uuidv7'
import {sendVerificationEmail} from "@/lib/mail";
import { SearchUserType } from "@/types";

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
    throw new Error('Failed to get user by email');
  }
}

export async function getProviderByEmail(email: string) {
  try {
    const result = await db.user.findUnique({
      where: {email},
      select: {
        accounts: {
          select: {
            provider: true
          }
        }
      }
    })

    return result;
  }catch (e) {
    console.error(e);
    throw new Error('Failed to get provider by email');
  }
}

export async function getUserById(id: string) {
  try {
    const results = await db.user.findUnique({
      where: {
        id
      },
      select: {
        name: true,
        id: true,
        accounts: {
          select: {
            provider: true
          }
        },
        email: true,
        emailVerified: true,
        image: true,
        password: true
      }
    })

    return results;
  }catch (e) {
    console.error(e);
    throw new Error("Failed to get user by id")
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

export async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token: token
      }
    })

    return verificationToken;
  }catch (e) {
    console.error(e);
    throw new Error('Failed to get verification token')
  }
}

export async function generateVerificationToken(email: string) {
  try {
    const token = uuidv7();

    const nowDate = new Date();
    const expires = new Date(nowDate.setDate(nowDate.getDate() + 30));

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

    await sendVerificationEmail(token.identifier, token.token)

    return results;
  }catch (e) {
    console.error(e);
    throw new Error('Failed to register user')
  }
}

export async function changeImage(image: string, email: string) {
  try {

    const results = await db.user.update({
      where: {
        email
      },
      data: {
        image
      }
    })

    return results;

  }catch (e) {
    console.error(e);
    throw new Error('Failed to change the profile photo')
  }
}

export async function fetchUsersByQuery(query: string, omit: string) {
  try {

    const results = await db.user.findMany({
      select: {
        name: true,
        image: true,
        email: true,
        id: true,
        accounts: {
          select: {
            provider: true
          }
        }
      },
      where: {
        AND: [
          {
            id: {
              not: omit
            }
          },
          {
            OR: [
              {
                name: {
                  contains: query,
                  mode: 'insensitive'
                }
              },
              {
                email: {
                  contains: query,
                  mode: 'insensitive'
                }
              }
            ]
          }
        ]
      }
    })

    return results as SearchUserType[]

  }catch (e) {
    console.log(e)
    throw new Error('Failed to fetch users by query')
  }
}