'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";


export async function createSize(name:string,value:string){
    try {
       await prisma.size.create({
        data:{
            name,
            value,
        }
       })

       revalidatePath('/dashboard/sizes');
       return {
        status:200,
        message:'Size created succesfully.'
       }
    } catch (error) {
        console.log('[Size creating error]', error)
        return {
            status:400,
            message:'Sorry, something went wrong !'
        }
    }
}

export async function updateSize(id:string,name:string,value:string){
    try {
       await prisma.size.update({
        where:{
            id
        },
        data:{
            name,
            value,
        }
       })

       revalidatePath('/dashboard/sizes');
       return {
        status:200,
        message:'Size updated succesfully.'
       }
    } catch (error) {
        console.log('[Size update error]', error)
        return {
            status:400,
            message:'Sorry, something went wrong !'
        }
    }
}


export async function deleteSize(id:string){
    try {
        await prisma.size.delete({
            where:{id}
        })

        revalidatePath(`/dashboard/sizes`)
        return {
            status:200,
            message:'Size deleted succesfully.'
        }
    } catch (error) {
        console.log("Size Delete Error", error);
        return {
            status:400,
            message:'Sorry, something went wrong !s'
        }
    }
}