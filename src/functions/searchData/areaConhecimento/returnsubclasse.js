let token = localStorage.getItem('@maatdigital/token');

export default async function SearchSubClasse() {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const response = await fetch('/maatdigital/subclasses_conhecimento', requestOptions);
        return await (response.ok && response.json()); 
    } catch (error) {
        console.error('Error em SearchSubClasse: ' + error);
    };
};