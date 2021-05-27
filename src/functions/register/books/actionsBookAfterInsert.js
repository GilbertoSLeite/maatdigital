import TriggerDataEntry from "./triggerDataEntry";

const actionsBookAfterInsert = async (data, action, idLivro) => (action ? (await TriggerDataEntry(data, idLivro)) : action)

export default actionsBookAfterInsert;