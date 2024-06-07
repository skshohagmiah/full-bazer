"use server";
import prisma from "@/lib/db";
import { productSchema } from "@/lib/zod";
import { z } from "zod";

export async function createProduct(productInput:any) {
    console.log('action called')
    console.log('server action', productInput)
  // Parse and validate the input data
  const parsedProduct = productSchema.safeParse(productInput);
  if (!parsedProduct.success) {
    return {
      status: 400,
      message: "Validation failed",
      errors: parsedProduct.error.errors,
    };
  }

  const product = parsedProduct.data;

  try {
    // Transformations
    const itemDetailsArray = product.itemDetails?.split(',') || [];
    const price = parseInt(product.price);
    const discount = product.discount ? parseInt(product.discount) : null;
    const stock = parseInt(product.stock);
    const description = product.description || "";
    const isFeatured = product.isFeatured !== undefined ? product.isFeatured : false;
    const isArchived = product.isArchived !== undefined ? product.isArchived : false;

    const variantsData = product.variants?.map(variant => ({
      sizeId: variant.sizeId || null,
      colorId: variant.colorId || null,
      price: parseInt(variant.price),
      stock: parseInt(variant.stock),
    })) || [];

    const imagesData = product.images?.map(url => ({ url })) || [];

    // Create the product in the database
    await prisma.product.create({
      data: {
        ...product,
        description: description,
        itemDetails: itemDetailsArray,
        price: price,
        discount: discount,
        stock: stock,
        isFeatured: isFeatured,
        isArchived: isArchived,
        images: {
          createMany: {
            data: imagesData,
          },
        },
        variants: {
          createMany: {
            data: variantsData,
          },
        },
      },
    });

    return {
      status: 200,
      message: "Product created successfully",
    };
  } catch (error) {
    console.error("[product create error]", error);
    return {
      status: 500,
      message: "Product not created, something went wrong!",
    };
  }
}





export async function updateProduct(productId: string, productInput: any) {
  console.log('update action called');
  console.log('server action', productInput);

  // Parse and validate the input data
  const parsedProduct = productSchema.safeParse(productInput);
  if (!parsedProduct.success) {
    return {
      status: 400,
      message: "Validation failed",
      errors: parsedProduct.error.errors,
    };
  }

  const product = parsedProduct.data;

  try {
    // Transformations
    const itemDetailsArray = product.itemDetails?.split(',') || [];
    const price = parseInt(product.price);
    const discount = product.discount ? parseInt(product.discount) : null;
    const stock = parseInt(product.stock);
    const description = product.description || "";
    const isFeatured = product.isFeatured !== undefined ? product.isFeatured : false;
    const isArchived = product.isArchived !== undefined ? product.isArchived : false;

    const variantsData = product.variants?.map(variant => ({
      sizeId: variant.sizeId || null,
      colorId: variant.colorId || null,
      price: parseInt(variant.price),
      stock: parseInt(variant.stock),
    })) || [];

    const imagesData = product.images?.map(url => ({ url })) || [];

    // Begin a transaction to update the product
    await prisma.$transaction(async (prisma) => {
      // Update the product details
      await prisma.product.update({
        where: { id: productId },
        data: {
          name: product.name,
          description: description,
          itemDetails: itemDetailsArray,
          price: price,
          discount: discount,
          stock: stock,
          isFeatured: isFeatured,
          isArchived: isArchived,
          brandName: product.brandName,
          categoryId: product.categoryId,
        },
      });

      // Handle variants: update existing or create new
  
      await prisma.productVariant.deleteMany({
        where: { productId: productId },
      })

      await prisma.productVariant.createMany({
        data: variantsData.map((variant) => ({ ...variant, productId })),
      })
      
      // Handle images: delete old and create new
      await prisma.image.deleteMany({
        where: { productId: productId },
      });

      if (imagesData.length > 0) {
        await prisma.image.createMany({
          data: imagesData.map((image) => ({ ...image, productId })),
        });
      }
    });

    return {
      status: 200,
      message: "Product updated successfully",
    };
  } catch (error) {
    console.error("[product update error]", error);
    return {
      status: 500,
      message: "Product not updated, something went wrong!",
    };
  }
}


export async function deleteProduct(productId:string) {
  console.log('Delete action called');

  try {
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({ where: { id: productId } });
    if (!existingProduct) {
      return {
        status: 404,
        message: "Product not found",
      };
    }

    // Delete the product from the database
    await prisma.product.delete({ where: { id: productId } });

    return {
      status: 200,
      message: "Product deleted successfully",
    };
  } catch (error) {
    console.error("[product delete error]", error);
    return {
      status: 500,
      message: "Product not deleted, something went wrong!",
    };
  }
}