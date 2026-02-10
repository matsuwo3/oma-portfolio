import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const signature = request.headers.get("X-MICROCMS-Signature");
  if (!signature) {
    return NextResponse.json(
      { message: "Missing signature" },
      { status: 401 }
    );
  }

  const body = await request.text();
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  ) {
    return NextResponse.json(
      { message: "Invalid signature" },
      { status: 401 }
    );
  }

  revalidatePath("/");
  revalidatePath("/works/[slug]", "page");
  revalidatePath("/column", "page");
  revalidatePath("/column/[slug]", "page");
  revalidatePath("/column/category/[cat]", "page");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ revalidated: true });
}
