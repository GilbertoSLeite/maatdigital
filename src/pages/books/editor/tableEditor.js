import MaterialTable from "material-table"
import React from "react"
import DialogCadastro from "../../../componets/dialog/dialogCadastro/dialogCadastro"
import SearchPaises from "../../../functions/searchData/countries/returnCountries"
import SearchEditor from "../../../functions/searchData/editor/searchEditor"
import SearchGraduationEditor from "../../../functions/searchData/editor/searchGraduationEditor"
import ScreenUpdateEditor from "./screenUpdateEditor"

export default function TableEditor() {
    const [arrayEditor, setArrayEditor] = React.useState([])
    const [arrayPais, setArrayPais] = React.useState([])
    const [upIdentificador, setUpIdentificaror] = React.useState('')
    const [upDataCadastro, setUpDataCadastro] = React.useState('')
    const [upFName,setUpFName] = React.useState('')
    const [upMName,setUpMName] = React.useState('')
    const [upLName,setUpLName] = React.useState('')    
    const [upPais,setUpPais] = React.useState('')
    const [upGraduacao,setUpGraduacao] = React.useState([])
    const [upCPF,setUpCPF] = React.useState('')
    const [upSexo,setUpSexo] = React.useState('') 
    const [upRaca,setUpRaca] = React.useState('')  
    const [upStatus,setUpStatus] = React.useState('')
    const [arrayGraduacaoEditor, setArrayGraduacaoEditor] = React.useState([])
    const [abrirDialog, setAbrirDialog] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        const RetornaEditor = async () => setArrayEditor(await SearchEditor())
        RetornaEditor()
        setLoading(false)
    },[])

    React.useEffect(() => {
        setLoading(true)
        const RetornarPais = async () => setArrayPais(await SearchPaises())
        RetornarPais()
        setLoading(false)
    },[])

    React.useEffect(() => {
        setLoading(true)
        const RetornarGraduacao = async () => setArrayGraduacaoEditor(await SearchGraduationEditor())
        RetornarGraduacao()
        setLoading(false)
    },[])

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload()
    
    function RetornarNomePais(identificado){
        function FilterCountrie(array) {
            if(array.id === identificado){
                return array
            };
        }
        let nomePais = arrayPais.map(x => x).filter(FilterCountrie);
        nomePais = nomePais.map(x => x.nome)
        return nomePais
    };
    
    function RetornarGraduacao(idEditor){
        const FilterEditor = (array) => array.editor_id === idEditor ? array : null
        let graduacaoEditor = arrayGraduacaoEditor.map(x=>x).filter(FilterEditor)
        graduacaoEditor = graduacaoEditor.map(x => x.graduacoes_id)
        return graduacaoEditor
    };
    
    const AtualizarEditor = (dadosEditor) => setAbrirDialog(true) || setUpIdentificaror(dadosEditor.id) || setUpDataCadastro(dadosEditor.data_cadastro) || setUpFName(dadosEditor.primeiro_nome_pessoa) || setUpMName(dadosEditor.segundo_nome_pessoa) || setUpLName(dadosEditor.ultimo_nome_pessoa) || setUpPais(dadosEditor.pais_editor_id) || setUpGraduacao(RetornarGraduacao(dadosEditor.id)) || setUpCPF(dadosEditor.numero_cpf) || setUpSexo(dadosEditor.sexo_pessoas) || setUpRaca(dadosEditor.raca_pessoas) || setUpStatus(dadosEditor.status)
            
    return(
        <React.Fragment>
        <MaterialTable
                title='Tabela do Editor'
                isLoading={loading}
                localization={{
                    toolbar: {
                        exportTitle: 'Exportar Dados',
                        showColumnsTitle: 'Mostrar as Colunas',
                        addRemoveColumns: 'Adicionar ou Remover Colunas',
                        searchTooltip: 'Digite o Nome do Editor',
                        searchPlaceholder: 'Digite o Nome do Editor',
                    },
                    pagination: {
                        labelRowsSelect: 'Dados',
                        labelDisplayedRows: '{from}-{to} de {count}',
                        firstAriaLabel: 'Início',
                        firstTooltip: 'Início',
                        previousAriaLabel: 'Página Anterior',
                        previousTooltip: 'Página Anterior',
                        nextAriaLabel: 'Próxima Página',
                        nextTooltip: 'Próxima Página',
                        lastAriaLabel: 'Fim',
                        lastTooltip: 'Fim',
                    },
                    body: {
                        emptyDataSourceMessage: 'Nenhuma informação encontrada.',
                    },
                    header:{
                        actions: 'Editar'
                    }
                }}
                columns={[
                    {
                        title: 'Identificador',
                        field: 'id',
                        tooltip: 'Identificador do registro',
                        align: 'center',
                        editable: 'never',
                        filtering: true,
                        grouping: true,
                        searchable: false,
                        headerStyle: {
                            fontWeight: 'bold'
                        },
                        cellStyle: {
                            fontWeight: 'bold',
                            color: '#2e5493',
                        }
                    },
                    {
                        title: 'Editor do Livro',
                        field: 'primeiro_nome_pessoa',
                        render: rowData => <div>{rowData.primeiro_nome_pessoa + ' ' + rowData.segundo_nome_pessoa + ' ' + rowData.ultimo_nome_pessoa}</div>,
                        tooltip: 'Nome do Editor.',
                        align: 'center',
                        filtering: true,
                        grouping: true,
                        searchable: true,
    	                editable: 'onUpdate',
                        headerStyle: {
                            fontWeight: 'bold'
                        },
                        cellStyle: {
                            fontWeight: 'bold',
                            color: '#2e5493',
                        }
                    }, 
                    {
                        title: 'Nacionalidade',
                        render: rowData => <div>{RetornarNomePais(rowData.pais_editor_id)}</div>,
                        field: 'pais_editor_id',
                        tooltip: 'Informação referente ao País de Nacionalidade do Editor',
                        align: 'center',
                        filtering: true,
                        grouping: true,
                        searchable: false,
                        headerStyle: {
                            fontWeight: 'bold'
                        },
                        cellStyle: {
                            fontWeight: 'bold',
                            color: '#2e5493',
                        }
                    },                           
                ]}
                options={{
                    paging: true,
                    pageSize: 5,
                    pageSizeOptions: [5, 25, 50, 100],
                    searchAutoFocus: true,
                    showFirstLastPageButtons: true,
                    draggable: true,
                    exportButton: true,
                    columnsButton: true,
                }}
                data={arrayEditor}   
                actions={[
                    {
                      iconProps: {
                          color: 'action'
                      },
                      icon: 'edit',
                      tooltip: 'Editar Autor do Livro',
                      onClick: (event, rowData) => AtualizarEditor(rowData)
                    }
                ]}  
        />
        {abrirDialog ? 
        <DialogCadastro
            openDialog={abrirDialog}
            closeDialog={handleFecharDialog}
            titleDialog='Atualizar Editor'
            telaDialog={
                <ScreenUpdateEditor
                    identificadorIn={upIdentificador}
                    dataCadastroIn={upDataCadastro} 
                    fNomeIn={upFName}
                    mNomeIn={upMName}
                    lNomeIn={upLName}
                    paisIn={upPais}
                    graduacaoIn={upGraduacao}
                    cpfIn={upCPF} 
                    sexoIn={upSexo}
                    racaIn={upRaca}
                    statusIn={upStatus}                
                />
            }
        /> :
        null}
        </React.Fragment>
    )
}