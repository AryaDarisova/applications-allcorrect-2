import {FormCheck, Table} from "react-bootstrap";
import React from "react";
import TableRow from "../view/TableRow";

const styles = {
    noEditableCell: {
        backgroundColor: '#f3f3f3',
    },
}

export default function TableInfo(props) {
    console.log("props.columns, props.rows", props.columns, props.rows)

    return (
        <Table responsive bordered>
            <thead>
            <tr>
                <th key="№" className="center">№</th>
                {
                    props.columns.map(column => {
                        return(
                            <th key={column.name} className="center">{column.name}</th>
                        )
                    })
                }
            </tr>
            </thead>
            <tbody>
            {
                props.rows.map((row, rowIndex) => {
                    return(
                        <TableRow key={rowIndex} row={row} rowIndex={rowIndex} columns={props.columns} />
                    )
                })
            }
            </tbody>
        </Table>
    )
}