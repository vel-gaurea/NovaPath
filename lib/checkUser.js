import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";

export const checkUser = async () => {
    const user = await currentUser();


    if (!user) {
        return null
    }


    try {
        const loggedInUSer = await db.user.findUnique({
            where: {
                clerkUserId: user.id
            },
        })

        if(loggedInUSer){
            return loggedInUSer;
        }

        const name = `${user.firstName} ${user.lastName}`;

        const newUSer = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            },
        });

        return newUSer;

    } catch (error) {
        console.log(error.message);
        
    }
}