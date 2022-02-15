import {Table, Form} from "react-bootstrap";

export default function ProjectBible({active, setActive}) {
    return(
        <div>
            <Table responsive bordered>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Stage</th>
                    <th>Project Info type</th>
                    <th>Description</th>
                    <th>Basic kick-off question</th>
                    <th>Special kick-off question</th>
                    <th>Info</th>
                    <th>Tag</th>
                    <th>Kick-off</th>
                    <th>Internal Use</th>
                    <th>SG</th>
                    <th>Client's Approval</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td onDoubleClick={() => setActive(true)}></td>
                    <td className="center">
                        <Form.Check type="checkbox" />
                    </td>
                    <td className="center">
                        <Form.Check type="checkbox" />
                    </td>
                    <td className="center">
                        <Form.Check type="checkbox" />
                    </td>
                    <td className="center">
                        <Form.Check type="checkbox" />
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td onDoubleClick={() => setActive(true)}></td>
                    <td className="center">
                        <Form.Check type="checkbox" />
                    </td>
                    <td className="center">
                        <Form.Check type="checkbox" />
                    </td>
                    <td className="center">
                        <Form.Check type="checkbox" />
                    </td>
                    <td className="center">
                        <Form.Check type="checkbox" />
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td contentEditable="true"></td>
                    <td onDoubleClick={() => setActive(true)}></td>
                    <td className="center">
                        <Form.Check type="checkbox" />
                    </td>
                    <td className="center">
                        <Form.Check type="checkbox" />
                    </td>
                    <td className="center">
                        <Form.Check type="checkbox" />
                    </td>
                    <td className="center">
                        <Form.Check type="checkbox" />
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
}