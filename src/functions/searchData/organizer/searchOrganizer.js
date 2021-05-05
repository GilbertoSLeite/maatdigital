export default async function SearchOrganizer() {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const response = await fetch('/maatdigital/organizadores', requestOptions);
        const result = (response.ok ? await response.json() : []);        
        return await result
    } catch (error) {
        console.error('Error em SearchOrganizer: ' + error);
    };
};