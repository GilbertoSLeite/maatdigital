import SearchDataOrigin from "./searchDataOrigin";

export default async function IdentifyingDuplicate(tabela, index) {
    const originComparation = await SearchDataOrigin(tabela); 
    console.log('index: ' + index + ' - originComparation: ' + originComparation)
    return (index === originComparation) ? Boolean(true) : Boolean(false)    
};