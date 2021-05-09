import MaterialTable from "material-table"
import React from "react"
import DialogCadastro from "../../../components/dialog/dialogCadastro/dialogCadastro"
import SearchAuthor from "../../../functions/searchData/author/searchAuthor"
import SearchPaises from "../../../functions/searchData/countries/returnCountries"
import SearchGraduationAuthor from "../../../functions/searchData/graduation/returnGraduationAuthor"
import ScreenUpdateAuthor from "./screenUpdateAuthor"

export default function TableAuthor() {
    const [arrayAuthor, setArrayAuthor] = React.useState([])
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
    const [arrayGraduacaoAuthor, setArrayGraduacaoAuthor] = React.useState([])
    const [abrirDialog, setAbrirDialog] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        const RetornarAuthor = async () => setArrayAuthor(await SearchAuthor())
        RetornarAuthor()
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
        const RetornarGraduacao = async () => setArrayGraduacaoAuthor(await SearchGraduationAuthor())
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
    
    function RetornarGraduacao(idAutor){
        const FilterAutor = (array) => array.autores_id === idAutor ? array : null
        let graduacaoAutor = arrayGraduacaoAuthor.map(x=>x).filter(FilterAutor)
        graduacaoAutor = graduacaoAutor.map(x => x.graduacoes_id)
        return graduacaoAutor
    };
    
    const AtualizarAutor = (dadosAutor) => setAbrirDialog(true) || setUpIdentificaror(dadosAutor.id) || setUpDataCadastro(dadosAutor.data_cadastro) || setUpFName(dadosAutor.primeiro_nome_pessoa) || setUpMName(dadosAutor.segundo_nome_pessoa) || setUpLName(dadosAutor.ultimo_nome_pessoa) || setUpPais(dadosAutor.pais_autor_id) || setUpGraduacao(RetornarGraduacao(dadosAutor.id)) || setUpCPF(dadosAutor.numero_cpf) || setUpSexo(dadosAutor.sexo_pessoas) || setUpRaca(dadosAutor.raca_pessoas) || setUpStatus(dadosAutor.status)
            
    return(
        <React.Fragment>
        <MaterialTable
                title='Tabela do Autor'
                isLoading={loading}
                localization={{
                    toolbar: {
                        exportTitle: 'Exportar Dados',
                        showColumnsTitle: 'Mostrar as Colunas',
                        addRemoveColumns: 'Adicionar ou Remover Colunas',
                        searchTooltip: 'Digite o Nome do Autor',
                        searchPlaceholder: 'Digite o Nome do Autor',
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
                        title: 'Autor do Livro',
                        field: 'primeiro_nome_pessoa',
                        render: rowData => <div>{rowData.primeiro_nome_pessoa + ' ' + rowData.segundo_nome_pessoa + ' ' + rowData.ultimo_nome_pessoa}</div>,
                        tooltip: 'Nome do Autor.',
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
                        render: rowData => <div>{RetornarNomePais(rowData.pais_autor_id)}</div>,
                        field: 'pais_autor_id',
                        tooltip: 'Informação referente ao País de Nacionalidade do Autor',
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
                data={arrayAuthor}   
                actions={[
                    {
                      iconProps: {
                          color: 'action'
                      },
                      icon: 'edit',
                      tooltip: 'Editar Autor do Livro',
                      onClick: (event, rowData) => AtualizarAutor(rowData)
                    }
                ]}  
        />
        {abrirDialog ? 
        <DialogCadastro
            openDialog={abrirDialog}
            closeDialog={handleFecharDialog}
            titleDialog='Atualizar Autor'
            telaDialog={
                <ScreenUpdateAuthor
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