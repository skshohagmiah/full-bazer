'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";


export async function createColor(name:string,value:string){
    try {
       await prisma.Color.create({
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
       await prisma.Color.update({
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
        await prisma.Color.delete({
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