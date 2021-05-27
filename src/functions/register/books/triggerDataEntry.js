import InsertEditorBooks from "./insertEditorBooks";
import InsertOrganizerBooks from "./insertOrganizerBooks";
    var situacao;
    const boolInsert = {
        "true": true,
        "false": false
    };
export default async function TriggerDataEntry(data, idLivro){
    for (const value of data.organizadorLivro) {   
        situacao = (await InsertOrganizerBooks(value.id, idLivro))        
    };
    for (const value of data.editorBooks) {   
        situacao = (await InsertEditorBooks(value.id, idLivro))        
    };
    return  boolInsert[situacao]
};