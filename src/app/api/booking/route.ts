import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BOOKINGS_FILE = path.join(process.cwd(), "bookings.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Add timestamp
    const booking = {
      ...body,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    // Read existing bookings
    let bookings = [];
    if (fs.existsSync(BOOKINGS_FILE)) {
      const fileContent = fs.readFileSync(BOOKINGS_FILE, "utf-8");
      bookings = JSON.parse(fileContent);
    }

    // Add new booking
    bookings.push(booking);

    // Save back to file
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));

    console.log("Booking saved successfully:", booking);

    return NextResponse.json({ message: "Booking successful", id: booking.id }, { status: 200 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(BOOKINGS_FILE)) {
      return NextResponse.json([], { status: 200 });
    }
    const fileContent = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    const bookings = JSON.parse(fileContent);
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching bookings" }, { status: 500 });
  }
}
