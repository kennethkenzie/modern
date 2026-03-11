const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();

export function toCloudinaryUrl(url: string): string {
  if (!url) return url;
  if (url.includes("res.cloudinary.com")) return url;
  if (!CLOUD_NAME) return url;

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/f_auto,q_auto/${encodeURIComponent(
    url
  )}`;
}

export function getCloudinaryCloudName() {
  return CLOUD_NAME ?? "";
}
