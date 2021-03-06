import MaterialTable from "material-table"
import React from "react"
import DialogCadastro from "../../../components/dialog/dialogCadastro/dialogCadastro"
import SearchCoordinator from "../../../functions/searchData/coordinator/searchCoordinator"
import SearchGraduationCoordinator from "../../../functions/searchData/coordinator/searchGraduationCoordinator"
import SearchPaises from "../../../functions/searchData/countries/returnCountries"
import ScreenUpdateCoordinator from "./screenUpdateCoordinator"

const TableCoordinator = () => {
    const [arrayCoordinator, setArrayCoordinator] = React.useState([])
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
    const [arrayGraduacaoCoordinator, setArrayGraduacaoCoordinator] = React.useState([])
    const [abrirDialog, setAbrirDialog] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayCoordinator(await SearchCoordinator()) || setLoading(false))();
    }, []);

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayPais(await SearchPaises()) || setLoading(false))();
    }, []);

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayGraduacaoCoordinator(await SearchGraduationCoordinator()) || setLoading(false))();
    }, []);

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload()

    function RetornarNomePais(identificador) {
        const nomePais = arrayPais.find(paises => paises.id === identificador)
        return (nomePais && nomePais.nome)
    }

    function RetornarGraduacao(idCoordenador) {
        const idGraduacaoCoord = arrayGraduacaoCoordinator.filter(graduacao => graduacao.coordenadores_id === idCoordenador)
        return (idGraduacaoCoord && idGraduacaoCoord.map(x => x.graduacoes_id))
    }

    const AtualizarCoordinator = (dadosCoordinator) => {
        setUpIdentificaror(dadosCoordinator.id)
        setUpDataCadastro(dadosCoordinator.data_cadastro)
        setUpFName(dadosCoordinator.primeiro_nome_pessoa)
        setUpMName(dadosCoordinator.segundo_nome_pessoa)
        setUpLName(dadosCoordinator.ultimo_nome_pessoa)
        setUpPais(dadosCoordinator.pais_coordenador_id)
        setUpGraduacao(RetornarGraduacao(dadosCoordinator.id))
        setUpCPF(dadosCoordinator.numero_cpf)
        setUpSexo(dadosCoordinator.sexo_pessoas)
        setUpRaca(dadosCoordinator.raca_pessoas)
        setUpStatus(dadosCoordinator.status)
        setAbrirDialog(true)
    }

    return (
        <React.Fragment>
            <MaterialTable
                title='Tabela do Coordenador'
                isLoading={loading}
                localization={{
                    toolbar: {
                        exportTitle: 'Exportar Dados',
                        showColumnsTitle: 'Mostrar as Colunas',
                        addRemoveColumns: 'Adicionar ou Remover Colunas',
                        searchTooltip: 'Digite o Nome do Coordenador',
                        searchPlaceholder: 'Digite o Nome do Coordenador',
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
                        title: 'Coordenador do Livro',
                        field: 'primeiro_nome_pessoa',
                        // eslint-disable-next-line react/display-name
                        render: rowData => <div>{rowData.primeiro_nome_pessoa + ' ' + rowData.segundo_nome_pessoa + ' ' + rowData.ultimo_nome_pessoa}</div>,
                        tooltip: 'Nome do Coordenador.',
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
                        render: rowData => <div>{RetornarNomePais(rowData.pais_coordenador_id)}</div>,
                        field: 'pais_coordenador_id',
                        tooltip: 'Informa????o referente ao Pa??s de Nacionalidade do Coordenador',
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
                data={arrayCoordinator}
                actions={[
                    {
                        iconProps: {
                            color: 'action'
                        },
                        icon: 'edit',
                        tooltip: 'Editar Autor do Livro',
                        onClick: (event, rowData) => AtualizarCoordinator(rowData)
                    }
                ]}
            />
            {abrirDialog &&
                <DialogCadastro
                    openDialog={abrirDialog}
                    closeDialog={handleFecharDialog}
                    titleDialog='Atualizar Editor'
                    telaDialog={
                        <ScreenUpdateCoordinator
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
                />}
        </React.Fragment>
    )
}

export default TableCoordinator;