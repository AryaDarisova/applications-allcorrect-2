import {FormControl, FormSelect, FormCheck, Button, Table} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronUp, faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function ManagedQualityOnProjectView(props) {
    return (
        <Table responsive bordered>
            <thead>
            <tr>
            {
                props.data.map(item => {
                    return(
                        <th key={item.name} className="center">{item.name}</th>
                    )
                })
            }
                <th className="center">Действия</th>
            </tr>
            </thead>
        </Table>
        /*<tr>
            <td>
                <FormControl className="inputInTd" placeholder="Название" aria-label="Username"
                             aria-describedby="basic-addon1" defaultValue={props.row.name} />
            </td>
            <td>
                <FormSelect defaultValue={props.row.type}>
                    <option value="input">Поле ввода</option>
                    <option value="checkbox">Чек-бокс</option>
                </FormSelect>
            </td>
            <td className="center align-middle">
                <FormCheck aria-label="option 1" defaultChecked={props.row.editable} />
            </td>
            <td className="center align-middle">
                <FormCheck aria-label="option 1" defaultChecked={props.row.template} />
            </td>
            <td className="center">
                <Button variant="primary"><FontAwesomeIcon icon={faChevronUp} /></Button>
                &nbsp;
                <Button variant="primary"><FontAwesomeIcon icon={faChevronDown} /></Button>
                &nbsp;
                <Button variant="success"><FontAwesomeIcon icon={faPlus} /></Button>
                &nbsp;
                <Button variant="danger"><FontAwesomeIcon icon={faTimes} /></Button>
            </td>
        </tr>*/
    )
}