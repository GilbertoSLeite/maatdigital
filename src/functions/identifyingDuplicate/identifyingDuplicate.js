import SearchDataOrigin from "./searchDataOrigin";

export default async function IdentifyingDuplicate(tabela, index) {
    const originComparation = await SearchDataOrigin(tabela); 
    return (index === originComparation) ? Boolean(true) : Boolean(false)    
}