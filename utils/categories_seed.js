import categories from "./categorie.json";
import { createCategory, getCategoryByName } from "./database";

export const initCategories = async () => {
    if (categories && categories.length) {
        try {
            for (let category of categories) {
                let old = await getCategoryByName(category.name)
                if(!old) {
                    await createCategory(category.name)
                }
                else console.log("category existe deja")
                
            }
        }
        catch (error) {
            console.log(error)
        }
    }

}