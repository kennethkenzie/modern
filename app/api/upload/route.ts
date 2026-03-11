import { NextResponse } from "next/server";
import { configureCloudinary } from "@/lib/cloudinary-server";

export async function POST(request: Request): Promise<Response> {
    try {
        const cloudinary = configureCloudinary();
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return await new Promise<Response>((resolve) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    folder: "brands",
                    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || undefined,
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        resolve(NextResponse.json({ error: error.message }, { status: 500 }));
                        return;
                    }
                    resolve(NextResponse.json({ url: result?.secure_url }));
                }
            ).end(buffer);
        });
    } catch (error: unknown) {
        console.error("Upload error:", error);
        const message = error instanceof Error ? error.message : "Upload failed.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
