export default async function SearchPaises() {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const response = await fetch('/maatdigital/paises', requestOptions);
        return await (response.ok && await response.json()); 
    } catch (error) {
        console.error('Error em SearchAreaConhecimento: ' + error);
    };
};