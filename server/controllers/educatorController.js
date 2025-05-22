import  { clerkClient } from '@clerk/express'

export const updateRoleEducator = async () => {
    try {

        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata:{
                role: 'educator',
            }
        })
    } catch(error) {

    }
}