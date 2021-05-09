export default function DataStatus(data){
    let message = '';
    const qtdErros = data.full_erro.errors.length;
    return{
        getFullError(){
            return data.full_erro
        },
        getError(){
            return data.full_erro.errors
        },
        getErrorMessage(){
            for(let index = 0; index < qtdErros; index++){
                message += data.full_erro.errors[index].path + ' => ' + data.full_erro.errors[index].type.replace('notNull Violation', 'Não pode ser nulo! ')
            }
            return message
        },
        getStatus(){
            return data.status
        }
    }
}