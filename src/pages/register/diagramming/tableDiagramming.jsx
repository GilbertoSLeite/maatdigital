import MaterialTable from "material-table"
import React from "react"
import DialogCadastro from "../../../components/dialog/dialogCadastro/dialogCadastro"
import SearchPaises from "../../../functions/searchData/countries/returnCountries"
import SearchDiagramming from "../../../functions/searchData/diagramming/searchDiagramming"
import SearchGraduationDiagramming from "../../../functions/searchData/diagramming/searchGraduationDiagramming"
import ScreenUpdateDiagramming from "./screenUpdateDiagramming"

const TableDiagramming = () => {
    const [arrayDiagramming, setArrayDiagramming] = React.useState([])
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
    const [arrayGraduacaoDiagramming, setArrayGraduacaoDiagramming] = React.useState([])
    const [abrirDialog, setAbrirDialog] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayDiagramming(await SearchDiagramming()) || setLoading(false))();
    }, [])

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayPais(await SearchPaises()) || setLoading(false))();
    }, [])

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayGraduacaoDiagramming(await SearchGraduationDiagramming()) || setLoading(false))();
    }, [])

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload()

    function RetornarNomePais(identificador) {
        const nomePais = arrayPais.find(paises => paises.id === identificador)
        return (nomePais && nomePais.nome)
    }

    function RetornarGraduacao(idCover) {
        const graduacaoDiagramming = arrayGraduacaoDiagramming.filter(graduacao => graduacao.diagramador_id === idCover)
        return (graduacaoDiagramming && graduacaoDiagramming.map(x => x.graduacoes_id))
    }

    const AtualizarDiagramming = (dadosDiagramming) => setAbrirDialog(true) || setUpIdentificaror(dadosDiagramming.id) || setUpDataCadastro(dadosDiagramming.data_cadastro) || setUpFName(dadosDiagramming.primeiro_nome_pessoa) || setUpMName(dadosDiagramming.segundo_nome_pessoa) || setUpLName(dadosDiagramming.ultimo_nome_pessoa) || setUpPais(dadosDiagramming.pais_diagramador_id) || setUpGraduacao(RetornarGraduacao(dadosDiagramming.id)) || setUpCPF(dadosDiagramming.numero_cpf) || setUpSexo(dadosDiagramming.sexo_pessoas) || setUpRaca(dadosDiagramming.raca_pessoas) || setUpStatus(dadosDiagramming.status)

    return (
        <React.Fragment>
            <MaterialTable
                title='Tabela do Diagramador'
                isLoading={loading}
                localization={{
                    toolbar: {
                        exportTitle: 'Exportar Dados',
                        showColumnsTitle: 'Mostrar as Colunas',
                        addRemoveColumns: 'Adicionar ou Remover Colunas',
                        searchTooltip: 'Digite o Nome do Diagramador',
                        searchPlaceholder: 'Digite o Nome do Diagramador',
                    },
                    pagination: {
                        labelRowsSelect: 'Dados',
                        labelDisplayedRows: '{from}-{to} de {count}',
                        firstAriaLabel: 'In??cio',
                        firstTooltip: 'In??cio',
                        previousAriaLabel: 'P??gina Anterior',
                        previousTooltip: 'P??gina Anterior',
                        nextAriaLabel: 'Pr??xima P??gina',
                        nextTooltip: 'Pr??xima P??gina',
                        lastAriaLabel: 'Fim',
                        lastTooltip: 'Fim',
                    },
                    body: {
                        emptyDataSourceMessage: 'Nenhuma informa????o encontrada.',
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
                        title: 'Diagramador do Livro',
                        field: 'primeiro_nome_pessoa',
                        // eslint-disable-next-line react/display-name
                        render: rowData => <div>{rowData.primeiro_nome_pessoa + ' ' + rowData.segundo_nome_pessoa + ' ' + rowData.ultimo_nome_pessoa}</div>,
                        tooltip: 'Nome do Diagramador.',
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
                        render: rowData => <div>{RetornarNomePais(rowData.pais_diagramador_id)}</div>,
                        field: 'pais_diagramador_id',
                        tooltip: 'Informa????o referente ao Pa??s de Nacionalidade do Diagramador',
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
                data={arrayDiagramming}
                actions={[
                    {
                        iconProps: {
                            color: 'action'
                        },
                        icon: 'edit',
                        tooltip: 'Editar Diagramador do Livro',
                        onClick: (event, rowData) => AtualizarDiagramming(rowData)
                    }
                ]}
            />
            {abrirDialog ?
                <DialogCadastro
                    openDialog={abrirDialog}
                    closeDialog={handleFecharDialog}
                    titleDialog='Atualizar Diagramador'
                    telaDialog={
                        <ScreenUpdateDiagramming
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

export default TableDiagramming;