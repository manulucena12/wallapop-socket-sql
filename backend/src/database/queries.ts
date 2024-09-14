import { client } from "."

export const queries = async () => {
    try {
        await client.query(`
                
        `)
    } catch (error) {
        console.log(error)
    }
}