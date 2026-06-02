import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: false, message: "This legacy local API has been retired. Portfolio data now comes from Copy Vortex." }, { status: 410 });
}

export async function POST() {
  return NextResponse.json({ success: false, message: "This legacy local API has been retired. Portfolio data now comes from Copy Vortex." }, { status: 410 });
}
