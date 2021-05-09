export default async function SearchAuthor() {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const response = await fetch('/maatdigital/autores', requestOptions);
        const result = (response.ok && await response.json());       
        return await result
    } catch (error) {
        console.error('Error em SearchAuthor: ' + error);
    };
};