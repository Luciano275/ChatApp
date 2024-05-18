export const regexToExt = /\.([^.]+)$/;
export const regexToExtWithSlash = /\/([^.]+)$/;
export const isImage = (ext: string) => ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);