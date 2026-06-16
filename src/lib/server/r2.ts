/**
 * Typed helpers around the R2 bucket binding. Used to serve optimized
 * image variants (WebP/AVIF) uploaded at build/upload time.
 */
export async function getAsset(bucket: R2Bucket, key: string): Promise<R2ObjectBody | null> {
  return bucket.get(key);
}

export async function putAsset(
  bucket: R2Bucket,
  key: string,
  data: ArrayBuffer | ReadableStream,
  contentType: string
): Promise<void> {
  await bucket.put(key, data, {
    httpMetadata: { contentType }
  });
}
