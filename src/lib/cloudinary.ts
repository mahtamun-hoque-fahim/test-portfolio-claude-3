import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  }
) {
  const { width, height, quality = "auto", format = "auto" } = options ?? {};

  const transforms: string[] = [
    `q_${quality}`,
    `f_${format}`,
    width ? `w_${width}` : "",
    height ? `h_${height}` : "",
    width || height ? "c_fill" : "",
  ].filter(Boolean);

  const base = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  return `${base}/${transforms.join(",")}/${publicId}`;
}

export async function deleteCloudinaryImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}

export async function getMediaLibrary(folder = "portfolio") {
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: folder,
    max_results: 100,
    resource_type: "image",
  });
  return result.resources;
}
