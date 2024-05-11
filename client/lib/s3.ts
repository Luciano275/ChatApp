'use server'

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@/auth";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

type ResponseS3 = {
    error?: string;
    success?: {
        url: string;
    };
}

export async function getSignedUrlAction(): Promise<ResponseS3> {

    const session = await auth();

    if (!session || !session.user) {
        return {
            error: 'Not authenticated'
        }
    }

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `${session.user.id}`
    })

    const signedURL = await getSignedUrl(s3, command, {
        expiresIn: 60
    });

    return {
        success: {
            url: signedURL
        }
    }
}