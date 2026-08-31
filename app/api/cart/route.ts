import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/database/mongodb";
import Cart from "@/database/cart.model";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const cart = await Cart.findOne({ user: session.user.id }).populate("items.product");
  return NextResponse.json(cart ?? { items: [] });
}