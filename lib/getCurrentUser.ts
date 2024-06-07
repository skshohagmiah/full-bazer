import { auth } from "@/auth"
import prisma from "./db";

export async function getCurrentUser() {
    try {
        const session = await auth();
        const user = await prisma.user.findFirst({
            where:{
                email:session?.user?.email
            }
        })
        return user
    } catch (error) {
        console.log('[Get current user error]', error)
    }
}