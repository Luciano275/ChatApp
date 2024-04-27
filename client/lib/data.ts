import { db } from "./db";

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