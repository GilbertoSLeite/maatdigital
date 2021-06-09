let token = localStorage.getItem('@maatdigital/token');
export default async function SearchPaises() {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const response = await fetch('/maatdigital/paises', requestOptions);
        return await (response.ok && response.json()); 
    } catch (error) {
        console.error('Error em SearchAreaConhecimento: ' + error);
    };
};