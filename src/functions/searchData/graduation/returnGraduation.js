let token = localStorage.getItem('@maatdigital/token');

export default async function SearchGraduation() {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const response = await fetch('/maatdigital/graduacao', requestOptions);
        const result = (response.ok && await response.json());       
        return await result
    } catch (error) {
        console.error('Error em SearchGraduation: ' + error);
    };
};