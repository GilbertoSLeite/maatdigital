export default async function SearchCoordinator() {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const response = await fetch('/maatdigital/coordenadores', requestOptions);
        return (response.ok && await response.json());  
    } catch (error) {
        console.error('Error em SearchCoordinator: ' + error);
    };
};