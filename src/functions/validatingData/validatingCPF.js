const ValidatingCPF = (value) => {
    if(value === "00000000000"){
        return false
    }else{
        let soma = 0;
        let resto = 0;
        let i =0;
        for (i=1; i<=9; i++){
            soma = soma + parseInt(value.substring(i-1, i)) * (11 - i);
            resto = (soma * 10) % 11;
        }
        if ((resto === 10) || (resto === 11)){
            resto = 0; 
        } 
        if (resto !== parseInt(value.substring(9, 10))){
            return false;
        }
        soma = 0;
        for (i = 1; i <= 10; i++) {
            soma = soma + parseInt(value.substring(i-1, i)) * (12 - i);
            resto = (soma * 10) % 11;
        }
        if ((resto === 10) || (resto === 11)){
            resto = 0; 
        } 
        if (resto !== parseInt(value.substring(10, 11))){
            return false;
        }
        return true
    }    
}

export default ValidatingCPF;