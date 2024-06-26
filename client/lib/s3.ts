'use server'

import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@/auth";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { isImage, regexToExt } from "./utils";

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!
    }
})

type ResponseS3 = {
    error?: string;
    success?: {
        url: string;
        key: string;
    };
}

export async function getSignedUrlAction(ext: string): Promise<ResponseS3> {

    const session = await auth();

    if (!session || !session.user) {
        return {
            error: 'Not authenticated'
        }
    }

    const key = `${session.user.id}.${ext}`

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key
    })

    const signedURL = await getSignedUrl(s3, command, {
        expiresIn: 60
    });

    return {
        success: {
            url: signedURL,
            key: key
        }
    }
}

export async function getProfilePhotoAction(key: string): Promise<ResponseS3> {
    const extensionMatch = key.match(regexToExt);
    const isAnImage = extensionMatch ? isImage(extensionMatch[1]) : false

    const profilePhotoName = isAnImage ? key : 'default.png'
    
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: profilePhotoName
    })

    try {

        return {
            success: {
                url: await getSignedUrl(s3, command, {
                    expiresIn: 3600*24
                }),
                key: profilePhotoName
            }
        }

    }catch (e) {
        console.error(e);
        return {
            error: 'Something went wrong!'
        }
    }
}