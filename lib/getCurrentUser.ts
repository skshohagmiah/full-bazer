import { auth } from "@/auth"
import prisma from "./db";
import { Role } from "@prisma/client";


export type CurrentUser = {
    name: string
    email: string
    id: string
    role: Role
    image: string | null
} | null | undefined
export async function getCurrentUser() {
    try {
        const session = await auth();
        const user = await prisma.user.findFirst({
            where:{
                email:session?.user?.email as string
            },
            select:{
                name:true,
                email:true,
                id:true,
                role:true,
                image:true
            }
        })
        return user
    } catch (error) {
        console.log('[Get current user error]', error)
    }
}