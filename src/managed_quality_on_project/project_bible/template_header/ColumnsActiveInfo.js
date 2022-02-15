import {FormControl, FormSelect, FormCheck, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronUp, faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ColumnsActiveInfo(props) {
    return (
        <tr>
            <td>
                <FormControl placeholder="Название" aria-label="Username"
                             aria-describedby="basic-addon1" defaultValue={props.column.name}
                             onBlur={(e) =>
                                 props.updateColumnTemplate("name", props.column.code, e.target.value)}/>
            </td>
            <td>
                <FormSelect defaultValue={props.column.type} onChange={(e) =>
                    props.updateColumnTemplate("type", props.column.code, e.target.value)}>
                    <option value="input">Поле ввода</option>
                    <option value="checkbox">Чек-бокс</option>
                    <option value="tags_list">Список тегов</option>
                </FormSelect>
            </td>
            <td className="center align-middle">
                <FormCheck aria-label="option 1" defaultChecked={props.column.editable}
                           onInput={(e) =>
                               props.updateColumnTemplate("editable", props.column.code, e.target.checked)} />
            </td>
            <td className="center align-middle">
                <FormCheck aria-label="option 1" defaultChecked={props.column.template}
                           onInput={(e) =>
                               props.updateColumnTemplate("template", props.column.code, e.target.checked)}/>
            </td>
            <td className="center">
                <Button size="sm" variant="primary" onClick={(e) =>
                    props.moveUpColumn("main", props.column.code, props.column.num)}><FontAwesomeIcon icon={faChevronUp} /></Button>
                &nbsp;
                <Button size="sm" variant="primary" onClick={(e) =>
                    props.moveDownColumn("main", props.column.code, props.column.num)}><FontAwesomeIcon icon={faChevronDown} /></Button>
                &nbsp;
                <Button size="sm" variant="success" onClick={(e) =>
                    props.addColumn("main", /*props.column.code,*/ props.column.num)}><FontAwesomeIcon icon={faPlus} /></Button>
                &nbsp;
                <Button size="sm" variant="danger" onClick={(e) =>
                    props.deleteColumn("main", props.column.code, props.column.num)}><FontAwesomeIcon icon={faTimes} /></Button>
            </td>
        </tr>
    )
}


