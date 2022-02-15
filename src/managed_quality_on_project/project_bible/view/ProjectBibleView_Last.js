import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import TableInfo from "../view/TableInfo";
import queryString from 'query-string';

export default function ProjectBibleTemplateHeader(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [rows, setRows] = useState([{
        headers: []
    }])
    const [rowCount, setRowCount] = useState(0)
    const queryStringParams = queryString.parse(window.location.search)
    const clientName = queryStringParams.client_name
    const projectName = queryStringParams.project_name
    const projectCode = queryStringParams.project_code

    const [projectBibleInfo, setProjectBibleInfo] = useState([{
        clientName: clientName,
        projectName: projectName,
        projectCode: projectCode,
        columns: [],
        rowCount: 0
    }])
    const [newProjectBible, setNewProjectBible] = useState(false)

    useEffect(async () => {
        await fetch("/project_bible_template/projectBibleInfo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "clientName": clientName,
                "projectName": projectName,
                "projectCode": projectCode
            }),
        })
            .then(res => res.json())
            .then(
                async (result) => {
                    if (result.length) {
                        setRowCount(result[0].row_count)

                        result[0].columns.map(value => {
                            setRows(rows.map(info => {
                                info.headers.push({
                                    "name": value.name,
                                    "type": value.type,
                                    "editable": value.editable,
                                    "template": value.template,
                                    "data": []
                                });

                                return info
                            }))

                            return value
                        })

                        fillDataForHeaders()
                    } else {
                        await fetch("/project_bible_template/projectBibleTemplate", {
                            method: 'GET',
                        })
                            .then(res => res.json())
                            .then(
                                async (result) => {
                                    result.map(value => {
                                        setNewProjectBible(true)
                                        setProjectBibleInfoColumns(value)

                                        setRows(rows.map(info => {
                                            info.headers.push({
                                                "name": value.name,
                                                "type": value.type,
                                                "editable": value.editable,
                                                "template": value.template,
                                                "data": []
                                            });

                                            return info
                                        }))

                                        return value
                                    })

                                    fillDataForHeaders()
                                },
                                (error) => {
                                    setIsLoaded(true);
                                    setError(error);
                                }
                            )
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    function fillDataForHeaders() {
        setRows(rows.map(value => {
            value.headers.map(async header => {
                if (header.template) {
                    let queryLink = '/project_bible_template/'

                    if (header.type === "input") {
                        queryLink += 'projectBibleTemplateTextByName'
                    } else if (header.type === "checkbox") {
                        queryLink += 'projectBibleTemplateBoolByName'
                    }

                    await fetch(queryLink, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "columnName": header.name
                        })
                    })
                        .then(res => res.json())
                        .then(
                            (result) => {
                                if (rowCount) {
                                    if (rowCount !== result.length) {
                                        setIsLoaded(true);
                                        setError({
                                            message: "Не совпадают количество строк для разных столбцов или количество строк, сохраненных для данного отчета с количеством строк в шаблоне"
                                        });
                                    } else {
                                        setProjectBibleInfoRowCount(rowCount)
                                        MapDataForHeader(result, header.name)
                                    }
                                } else {
                                    setRowCount(result.length)
                                    setProjectBibleInfoRowCount(rowCount)
                                    MapDataForHeader(result, header.name)
                                }
                            },
                            (error) => {
                                setIsLoaded(true);
                                setError(error);
                            }
                        )
                }

                return header
            })

            return value
        }))

        if (!error) {
            setIsLoaded(true);
        }
    }

    function setProjectBibleInfoColumns(value) {
        setProjectBibleInfo(projectBibleInfo.map(info => {
            info.columns.push({
                "name": value.name,
                "type": value.type,
                "editable": value.editable,
                "template": value.template
            })

            return info
        }))
    }

    function setProjectBibleInfoRowCount(count) {
        setProjectBibleInfo(projectBibleInfo.map(info => {
            info.rowCount = count

            return info
        }))
    }

    function MapDataForHeader(result, headerName) {
        result.map((resultValue, index) => {
            let dataItem = {
                "code": resultValue.code,
                "value": resultValue.value
            };

            setDataForHeader(headerName, dataItem, index === rowCount - 1)

            return resultValue
        })
    }

    function setDataForHeader(headerName, value, lastElement) {
        setRows(rows.map(info => {
            info.headers.map(header => {
                if (header.name === headerName) {
                    header.data.push(value)
                }

                if (lastElement) {
                    header.dataAllGet = true
                }

                return header;
            })

            return info;
        }))
    }

    function checkRows() {
        let check = true

        if (rows.length) {
            rows.map(info => {
                info.headers.map(value => {
                    if (value.template && (!value.data.length || value.data.length !== rowCount)) {
                        check = false
                    }

                    return value
                })

                return info
            })
        }

        return check
    }

    function InsertRowIntoProjectBibleInfo() {
        if (newProjectBible) {
            projectBibleInfo.map(async info => {
                await fetch("/project_bible_template/projectBibleInfoInsert", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        clientName: info.clientName,
                        projectName: info.projectName,
                        projectCode: info.projectCode,
                        columns: info.columns,
                        rowCount: info.rowCount
                    })
                })
                    .then(res => res.json())
                    .then(
                        (result) => {

                        },
                        (error) => {
                            // alert("Ошибка при попытке записать в базу данных информацию о новом отчете, попробуйте перезагрузить страницу, чтобы запустить процесс вновь")
                        }
                    )

                return info
            })
        }
    }

    if (error) {
        return (
            <div className="row">
                <div className="col-sm-12 center">
                    <br />
                    <h3>Ошибка: {error.message}</h3>
                </div>
            </div>
        )
    } else if (!isLoaded) {
        return (
            <div className="row">
                <div className="col-sm-12 center">
                    <br />
                    <h3>Загрузка...</h3>
                </div>
            </div>
        )
    } else if (checkRows()) {
        // InsertRowIntoProjectBibleInfo()

        return(
            <div className="managedQualityOnProjectBlockView">
                <div className="row">
                    <div className="col-sm-4">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicClientName">
                                <Form.Label>Имя клиента</Form.Label>
                                <Form.Control type="clientName" disabled
                                              placeholder={queryStringParams.client_name} />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="col-sm-4">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicProjectName">
                                <Form.Label>Имя проекта</Form.Label>
                                <Form.Control type="projectName" disabled
                                              placeholder={queryStringParams.project_name} />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="col-sm-4">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicProjectCode">
                                <Form.Label>Код проекта</Form.Label>
                                <Form.Control type="projectCode" disabled
                                              placeholder={queryStringParams.project_code} />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-12">
                        {<TableInfo rows={rows[0].headers} rowCount={rowCount} clientName={clientName}
                                    projectName={projectName} projectCode={projectCode} />}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row">
                <div className="col-sm-12 center">
                    <br />
                    <h3>Все еще загрузка...</h3>
                </div>
            </div>
        )
    }
}