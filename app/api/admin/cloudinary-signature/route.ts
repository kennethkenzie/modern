import { NextResponse } from "next/server";
import {
  assertCloudinaryServerConfig,
  signCloudinaryParams,
} from "@/lib/cloudinary-server";

type SignatureRequest = {
  folder?: string;
  publicId?: string;
  tags?: string[];
};

function sanitizeSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9/_-]/g, "").trim();
}

export async function POST(request: Request) {
  try {
    const { cloudName, apiKey, uploadPreset } = assertCloudinaryServerConfig();
    const body = (await request.json().catch(() => ({}))) as SignatureRequest;

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = sanitizeSegment(body.folder || "modern/admin");
    const publicId = body.publicId ? sanitizeSegment(body.publicId) : "";
    const tags = Array.isArray(body.tags)
      ? body.tags.map((tag) => sanitizeSegment(tag)).filter(Boolean).join(",")
      : "";

    const paramsToSign: Record<string, string | number> = {
      folder,
      timestamp,
    };

    if (uploadPreset) {
      paramsToSign.upload_preset = uploadPreset;
    }

    if (publicId) {
      paramsToSign.public_id = publicId;
    }

    if (tags) {
      paramsToSign.tags = tags;
    }

    const signature = signCloudinaryParams(paramsToSign);

    return NextResponse.json({
      cloudName,
      apiKey,
      timestamp,
      folder,
      uploadPreset: uploadPreset || null,
      publicId: publicId || null,
      tags: tags || null,
      signature,
      uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    });
  } catch (error) {
    console.error("Failed to create Cloudinary upload signature.", error);

    return NextResponse.json(
      { error: "Cloudinary server credentials are missing or invalid." },
      { status: 500 }
    );
  }
}
