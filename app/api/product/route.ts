
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import connectToDatabase from "@/database/mongodb";
import Product from "@/database/product.model";


export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const formData = await req.formData();

        let coffeeProduct;

        try {
            coffeeProduct = Object.fromEntries(formData.entries());
        } catch(e) {
            return NextResponse.json({ message: 'Invalid JSON data format' }, { status: 400 });
        }

        const imageFile = formData.get('image') as File;
        if(!imageFile) {
          return NextResponse.json({ message: 'Image file is required' }, { status: 400 });
        }
        const imageArrayBuffer = await imageFile.arrayBuffer();
        const imageBuffer = Buffer.from(imageArrayBuffer);

        const uploadedImageResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'tara_kape_products' }, (error, results) => {
            if(error) {
              return reject(error);
            }
            return resolve(results);
          }).end(imageBuffer);
        });
        coffeeProduct.image = (uploadedImageResult as { secure_url: string }).secure_url;

        let notes = JSON.parse(formData.get('notes') as string);

        const createdProduct = await Product.create({
            ...coffeeProduct,
            notes: notes,
        });
        return NextResponse.json({ message: 'Product created successfully', coffeeProduct: createdProduct }, { status: 201 });
    } catch(e) {
        console.error('Error creating product:', e);
        return NextResponse.json({ message: 'Event Creation Failed', error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });
    }
}
