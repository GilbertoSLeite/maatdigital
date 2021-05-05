export default async function SearchEditor() {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const response = await fetch('/maatdigital/editores', requestOptions);
        const result = (response.ok ? await response.json() : []);        
        return await result
    } catch (error) {
        console.error('Error em SearchEditor: ' + error);
    };
};