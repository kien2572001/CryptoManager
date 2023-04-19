import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default async function middleware(req) {
  // Do something with the request
  // Do something with the response
  return NextResponse.next();
}
