import MaterialTable from "material-table"
import React from "react"
import DialogCadastro from "../../../components/dialog/dialogCadastro/dialogCadastro"
import SearchPaises from "../../../functions/searchData/countries/returnCountries"
import SearchCover from "../../../functions/searchData/cover/searchCover"
import SearchGraduationCover from "../../../functions/searchData/cover/searchGraduationCover"
import ScreenUpdateCover from "./screenUpdateCover"

export default function TableCover() {
    const [arrayCover, setArrayCover] = React.useState([])
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
    const [arrayGraduacaoCover, setArrayGraduacaoCover] = React.useState([])
    const [abrirDialog, setAbrirDialog] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        const RetornaCover = async () => setArrayCover(await SearchCover())
        RetornaCover()
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
        const RetornarGraduacao = async () => setArrayGraduacaoCover(await SearchGraduationCover())
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
    
    function RetornarGraduacao(idCover){
        const FilterCover = (array) => array.capas_id === idCover ? array : null
        let graduacaoCover = arrayGraduacaoCover.map(x=>x).filter(FilterCover)
        graduacaoCover = graduacaoCover.map(x => x.graduacoes_id)
        return graduacaoCover
    };
    
    const AtualizarCover = (dadosCover) => setAbrirDialog(true) || setUpIdentificaror(dadosCover.id) || setUpDataCadastro(dadosCover.data_cadastro) || setUpFName(dadosCover.primeiro_nome_pessoa) || setUpMName(dadosCover.segundo_nome_pessoa) || setUpLName(dadosCover.ultimo_nome_pessoa) || setUpPais(dadosCover.pais_capa_id) || setUpGraduacao(RetornarGraduacao(dadosCover.id)) || setUpCPF(dadosCover.numero_cpf) || setUpSexo(dadosCover.sexo_pessoas) || setUpRaca(dadosCover.raca_pessoas) || setUpStatus(dadosCover.status)
            
    return(
        <React.Fragment>
        <MaterialTable
                title='Tabela do Responsável pela Capa'
                isLoading={loading}
                localization={{
                    toolbar: {
                        exportTitle: 'Exportar Dados',
                        showColumnsTitle: 'Mostrar as Colunas',
                        addRemoveColumns: 'Adicionar ou Remover Colunas',
                        searchTooltip: 'Digite o Nome do Responsável pela Capa',
                        searchPlaceholder: 'Digite o Nome do Responsável pela Capa',
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
                        title: 'Resp. da Capa do Livro',
                        field: 'primeiro_nome_pessoa',
                        render: rowData => <div>{rowData.primeiro_nome_pessoa + ' ' + rowData.segundo_nome_pessoa + ' ' + rowData.ultimo_nome_pessoa}</div>,
                        tooltip: 'Nome do Responsável pela Capa.',
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
                        render: rowData => <div>{RetornarNomePais(rowData.pais_capa_id)}</div>,
                        field: 'pais_capa_id',
                        tooltip: 'Informação referente ao País de Nacionalidade do Responsável pela Capa',
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
                data={arrayCover}   
                actions={[
                    {
                      iconProps: {
                          color: 'action'
                      },
                      icon: 'edit',
                      tooltip: 'Editar Resp. pela Capa do Livro',
                      onClick: (event, rowData) => AtualizarCover(rowData)
                    }
                ]}  
        />
        {abrirDialog ? 
        <DialogCadastro
            openDialog={abrirDialog}
            closeDialog={handleFecharDialog}
            titleDialog='Atualizar Editor'
            telaDialog={
                <ScreenUpdateCover
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