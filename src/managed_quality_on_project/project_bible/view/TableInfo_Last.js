import {FormCheck, Table} from "react-bootstrap";
import React from "react";

const styles = {
    noEditableCell: {
        backgroundColor: '#f3f3f3',
    },
}

export default function ManagedQualityOnProjectView(props) {
    async function oninputCell(header, row, type, e) {
        await fetch("/project_bible_template/projectBibleOninputPredSave", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "clientName": props.clientName,
                "projectName": props.projectName,
                "projectCode": props.projectCode,
                "header": header,
                "row": row,
                "type": type/*,
                "value": type === "input" ? e.target.innerText : type === "checkbox" ? e.target.checked : ""*/
            })
        })
            .then(res => res.json())
            .then(
                async (result) => {
                    if (result.count) {
                        console.log("count > 0", result.count)

                        await fetch("/project_bible_template/projectBibleOninputUpdateRow", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "clientName": props.clientName,
                                "projectName": props.projectName,
                                "projectCode": props.projectCode,
                                "header": header,
                                "row": row,
                                "type": type,
                                "value": type === "input" ? e.target.innerText : type === "checkbox" ? e.target.checked : ""
                            })
                        })
                            .then(res => res.json())
                            .then(
                                async (result) => {

                                },
                                (error) => {
                                    alert("Ошибка при сохранении значения ячейки")
                                }
                            )
                    } else {
                        console.log("count = 0", result.count)

                        await fetch("/project_bible_template/projectBibleOninputInsertRow", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "clientName": props.clientName,
                                "projectName": props.projectName,
                                "projectCode": props.projectCode,
                                "header": header,
                                "row": row,
                                "type": type,
                                "value": type === "input" ? e.target.innerText : type === "checkbox" ? e.target.checked : ""
                            })
                        })
                            .then(res => res.json())
                            .then(
                                async (result) => {

                                },
                                (error) => {
                                    alert("Ошибка при сохранении значения ячейки")
                                }
                            )
                    }
                },
                (error) => {
                    alert("Ошибка при сохранении значения ячейки")
                }
            )
    }

    function fillTableBody() {
        let tableData = []

        console.log("props.rows", props.rows)

        Array(props.rowCount).fill().map((x, i) => {
            let rowCode = ""

            props.rows.map(header => {
                if (header.template) {
                    if (rowCode && !rowCode === header.data[i].code) {
                        //todo тут ошибка (кажется сообщение про ошибку)
                    } else {
                        rowCode = header.data[i].code
                    }
                }

                return header
            })

            tableData.push(
                <tr key={i}>
                    <td className="center">{i + 1}</td>
                    {
                        props.rows.map(header => {
                            if (header.type === "input") {
                                let contentEditable = header.editable
                                let cellValue = header.template ? header.data[i].value : null

                                if (contentEditable) {
                                    // let changedValue = getProjectInfoCellValue("input", header.name, rowCode)
                                    /*let changedValue = getProjectInfoCellValue("input", header.name, rowCode)
                                        .then((result) => {

                                        })

                                    console.log("promise result", changedValue)*/

                                    /*let changedValue = getProjectInfoCellValue("input", header.name, rowCode)
                                        .then((result) => {
                                            console.log("promise result", result)

                                            if (result.exist) {
                                                cellValue = result.value
                                                console.log("getProjectInfoCellValue", result, result.exist, result.value, cellValue);
                                            }

                                            return result;
                                        })*/

                                    return (
                                        <td key={(i + 1) + "-" + header.name} contentEditable={contentEditable}
                                            onInput={(e) => oninputCell(header.name, rowCode, "input", e)}>{cellValue}</td>
                                    )
                                } else {
                                    return (
                                        <td key={(i + 1) + "-" + header.name} contentEditable={contentEditable}
                                            style={styles.noEditableCell}>{cellValue}</td>
                                    )
                                }
                            } else if (header.type === "checkbox") {
                                let cellValue = header.template && header.data[i] ? header.data[i].value : false

                                if (header.editable) {
                                    // let changedValue = getProjectInfoCellValue("input", header.name, rowCode)
                                    /*let changedValue = getProjectInfoCellValue("input", header.name, rowCode)
                                        .then((result) => {

                                        })

                                    console.log("promise result", changedValue)*/

                                    /*let changedValue = getProjectInfoCellValue("input", header.name, rowCode)
                                        .then((result) => {
                                            console.log("promise result", result)

                                            if (result.exist) {
                                                cellValue = result.value
                                                console.log("getProjectInfoCellValue", result, result.exist, result.value, cellValue);
                                            }

                                            return result;
                                        })*/

                                    return (
                                        <td key={(i + 1) + "-" + header.name} contentEditable={false}
                                            className="center align-middle">
                                            <FormCheck defaultChecked={cellValue}
                                                       onInput={(e) => oninputCell(header.name, rowCode, "checkbox", e)}/>
                                        </td>
                                    )
                                } else {
                                    return (
                                        <td key={(i + 1) + "-" + header.name} contentEditable={false}
                                            style={styles.noEditableCell} className="center align-middle">
                                            <FormCheck checked={cellValue} readOnly/>
                                        </td>
                                    )
                                }
                            }
                        })
                    }
                </tr>
            )}
        )

        return tableData
    }

    async function getProjectInfoCellValue(type, headerName, rowCode) {
        await fetch("/project_bible_template/projectBibleGetFilledCells", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "clientName": props.clientName,
                "projectName": props.projectName,
                "projectCode": props.projectCode,
                "headerName": headerName,
                "rowCode": rowCode,
                "type": type
            })
        })
            .then(res => res.json())
            .then(
                async (result) => {
                    console.log("filledCell", result)

                    /*if (type === "input") {
                        return ({exist: true, value: "test"})
                    } else if (type === "checkbox") {
                        return ({exist: true, value: false})
                    }*/

                    return result
                },
                (error) => {
                    alert("Не удалось загрузить значение одной из ячеек, октройте страницу заново в новом окне")
                }
            )
    }

    return (
        <Table responsive bordered>
            <thead>
            <tr>
                <th key="№" className="center">№</th>
                {
                    props.rows.map(header => {
                        return(
                            <th key={header.name} className="center">{header.name}</th>
                        )
                    })
                }
            </tr>
            </thead>
            <tbody>
            { fillTableBody() }
            </tbody>
        </Table>
    )
}