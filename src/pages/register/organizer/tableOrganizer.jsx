import MaterialTable from "material-table"
import React from "react"
import DialogCadastro from "../../../components/dialog/dialogCadastro/dialogCadastro"
import SearchPaises from "../../../functions/searchData/countries/returnCountries"
import SearchGraduationOrganizer from "../../../functions/searchData/organizer/searchGraduationOrganizer"
import SearchOrganizer from "../../../functions/searchData/organizer/searchOrganizer"
import ScreenUpdateOrganizer from "./screenUpdateOrganizer"

const TableOrganizer = () => {
    const [arrayOrganizer, setArrayOrganizer] = React.useState([])
    const [arrayPais, setArrayPais] = React.useState([])
    const [upIdentificador, setUpIdentificaror] = React.useState('')
    const [upDataCadastro, setUpDataCadastro] = React.useState('')
    const [upFName, setUpFName] = React.useState('')
    const [upMName, setUpMName] = React.useState('')
    const [upLName, setUpLName] = React.useState('')
    const [upPais, setUpPais] = React.useState('')
    const [upGraduacao, setUpGraduacao] = React.useState([])
    const [upCPF, setUpCPF] = React.useState('')
    const [upSexo, setUpSexo] = React.useState('')
    const [upRaca, setUpRaca] = React.useState('')
    const [upStatus, setUpStatus] = React.useState('')
    const [arrayGraduacaoOrganizer, setArrayGraduacaoOrganizer] = React.useState([])
    const [abrirDialog, setAbrirDialog] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayOrganizer(await SearchOrganizer()) || setLoading(false))()
    }, [])

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayPais(await SearchPaises()) || setLoading(false))()
    }, [])

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayGraduacaoOrganizer(await SearchGraduationOrganizer()) || setLoading(false))()
    }, [])

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload()

    function RetornarNomePais(identificador) {
        const nomePais = arrayPais.find(paises => paises.id === identificador)
        return (nomePais && nomePais.nome)
    }

    function RetornarGraduacao(idOrganizer) {
        const idGraduacaoOrgnizer = arrayGraduacaoOrganizer.filter(graduacao => graduacao.organizador_id === idOrganizer)
        return (idGraduacaoOrgnizer && idGraduacaoOrgnizer.map(x => x.graduacoes_id))
    }

    const AtualizarOrganize = (dadosOrganizer) => {
        setAbrirDialog(true)
        setUpIdentificaror(dadosOrganizer.id)
        setUpDataCadastro(dadosOrganizer.data_cadastro)
        setUpFName(dadosOrganizer.primeiro_nome_pessoa)
        setUpMName(dadosOrganizer.segundo_nome_pessoa)
        setUpLName(dadosOrganizer.ultimo_nome_pessoa)
        setUpPais(dadosOrganizer.pais_organizador_id)
        setUpGraduacao(RetornarGraduacao(dadosOrganizer.id))
        setUpCPF(dadosOrganizer.numero_cpf)
        setUpSexo(dadosOrganizer.sexo_pessoas)
        setUpRaca(dadosOrganizer.raca_pessoas)
        setUpStatus(dadosOrganizer.status)
    }

    return (
        <React.Fragment>
            <MaterialTable
                title='Tabela do Organizador'
                isLoading={loading}
                localization={{
                    toolbar: {
                        exportTitle: 'Exportar Dados',
                        showColumnsTitle: 'Mostrar as Colunas',
                        addRemoveColumns: 'Adicionar ou Remover Colunas',
                        searchTooltip: 'Digite o Nome do Organizador',
                        searchPlaceholder: 'Digite o Nome do Organizador',
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
                    header: {
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
                        // eslint-disable-next-line react/display-name
                        render: rowData => <div>{rowData.primeiro_nome_pessoa + ' ' + rowData.segundo_nome_pessoa + ' ' + rowData.ultimo_nome_pessoa}</div>,
                        tooltip: 'Nome do Organizador.',
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
                        // eslint-disable-next-line react/display-name
                        render: rowData => <div>{RetornarNomePais(rowData.pais_organizador_id)}</div>,
                        field: 'pais_organizador_id',
                        tooltip: 'Informação referente ao País de Nacionalidade do Organizador',
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
                data={arrayOrganizer}
                actions={[
                    {
                        iconProps: {
                            color: 'action'
                        },
                        icon: 'edit',
                        tooltip: 'Editar Autor do Livro',
                        onClick: (event, rowData) => AtualizarOrganize(rowData)
                    }
                ]}
            />
            {abrirDialog ?
                <DialogCadastro
                    openDialog={abrirDialog}
                    closeDialog={handleFecharDialog}
                    titleDialog='Atualizar Organizador'
                    telaDialog={
                        <ScreenUpdateOrganizer
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

export default TableOrganizer;