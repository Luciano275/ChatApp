export const regexToExt = /\.([^.]+)$/;
export const isImage = (ext: string) => ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);