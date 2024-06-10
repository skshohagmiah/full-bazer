'use server';

import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { revalidatePath } from "next/cache";


export async function createColor(name:string,value:string){
    try {
       await prisma.color.create({
        data:{
            name,
            value,
        }
       })

       revalidatePath('/dashboard/Colors');
       return {
        status:200,
        message:'Color created succesfully.'
       }
    } catch (error) {
        console.log('[Color creating error]', error)
        return {
            status:400,
            message:'Sorry, something went wrong !'
        }
    }
}

export async function updateColor(id:string,name:string,value:string){
    try {
       await prisma.color.update({
        where:{
            id
        },
        data:{
            name,
            value,
        }
       })

       revalidatePath('/dashboard/Colors');
       return {
        status:200,
        message:'Color updated succesfully.'
       }
    } catch (error) {
        console.log('[Color update error]', error)
        return {
            status:400,
            message:'Sorry, something went wrong !'
        }
    }
}


export async function deleteColor(id:string){
    try {

        const currentUser = await getCurrentUser();
        if(currentUser?.role !== "SUPER_ADMIN") {
            return {
                status: 400,
                message: "You don't have permission to delete this color.",
            };
        }

        const colorInUse = await prisma.color.findUnique({
            where:{
                id
            },
            include:{
                productsVariants:true
            }
        });


        if(colorInUse?.productsVariants?.length !== 0){
            return {
                status: 400,
                message: "Color is in use. you cannot delete it.",
            };
        }

        await prisma.color.delete({
            where:{id}
        })

        revalidatePath(`/dashboard/Colors`)
        return {
            status:200,
            message:'Color deleted succesfully.'
        }
    } catch (error) {
        console.log("Color Delete Error", error);
        return {
            status:400,
            message:'Sorry, something went wrong !s'
        }
    }
}