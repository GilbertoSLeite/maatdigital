const token = localStorage.getItem('@maatdigital/token');

const SearchEditor = async () => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);

        const requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };

        const response = await fetch('/maatdigital/editores', requestOptions);
        const result = await (response.ok && response.json()); 
        
        return result;
    } catch (error) {
        console.error('Error em SearchEditor: ' + error);
        return false;
    }
}

export default SearchEditor;