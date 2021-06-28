import BooleanValidation from "../../booleanValidation/booleanValidation";
import InsertCoordinatorBooks from "./insertCoordinatorBooks";
import InsertCoverBooks from "./insertCoverBooks";
import InsertDiagrammingBooks from "./insertDiagrammingBooks";
import InsertEditorBooks from "./insertEditorBooks";
import InsertOrganizerBooks from "./insertOrganizerBooks";
import InsertRespCoverBooks from "./insertRespCoverBooks";

var situacao;

const TriggerDataEntry = async (data, idLivro) => {
    try {
        for (const organizador of data.organizadorLivro) {   
        situacao = (await InsertOrganizerBooks(organizador.id, idLivro))        
        }
        for (const editor of data.editorLivro) {   
            situacao = (await InsertEditorBooks(editor.id, idLivro))        
        }
        for (const coordenador of data.coordenadorLivro){
            situacao = (await InsertCoordinatorBooks(coordenador.id, idLivro))
        }
        for (const diagramador of data.diagramadorLivro){
            situacao = (await InsertDiagrammingBooks(diagramador.id, idLivro))
        }
        for (const capaLivro of data.capaLivro){
            situacao = (await InsertCoverBooks(idLivro, capaLivro.name,capaLivro.path, capaLivro.size, capaLivro.type))
        }
        for (const respCapa of data.respCapaLivro){
            situacao = (await InsertRespCoverBooks(respCapa.id, idLivro))
        }
        
    return  BooleanValidation[situacao];        
    } catch (error) {
        console.error('Ocorreu um erro em TriggerDataEntry ', error);
        return false
    }    
}

export default TriggerDataEntry;