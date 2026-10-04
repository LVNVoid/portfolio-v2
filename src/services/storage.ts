import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const STORAGE_BUCKET = 'asset';

// ponytail: key = new key per version (avatars/<id>/<uuid>.ext), never overwrite — CDN caches by key
function s3() {
  return new S3Client({ forcePathStyle: true });
}

export function publicUrl(key: string): string {
  const base =
    process.env.AWS_ENDPOINT_URL_S3 ??
    'https://br-rapid-block-b3i6s8r9.storage.c-4.ap-southeast-1.aws.neon.tech';
  return `${base}/${STORAGE_BUCKET}/${key}`;
}

const MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
};

export async function uploadToStorage(
  key: string,
  body: Buffer,
  contentType?: string
): Promise<string> {
  const ext = key.split('.').pop()?.toLowerCase() ?? '';
  await s3().send(
    new PutObjectCommand({
      Bucket: STORAGE_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType ?? MIME[ext] ?? 'application/octet-stream',
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );
  return publicUrl(key);
}
