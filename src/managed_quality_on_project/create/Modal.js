import "../css/modal.css"
import "../css/managedQualityProject.css"
import {Col, FormCheck, FormLabel, Row} from "react-bootstrap";
import {useState} from "react";
import parse from 'html-react-parser';

export default function Modal({active, setActive, modalInfo}) {
    const [selectedTags, setSelectedTags] = useState([{
        data: []
    }]);
    const [selectedTagsText, setSelectedTagsText] = useState("");

    function setRowTags(header, tag) {
        let text = "";
        let dataItem = {
            "header": header,
            "tag": tag
        };

        setSelectedTags(selectedTags.map(value => {
            value.data.push(dataItem);

            return value
        }))

        selectedTags[0].data.map(value => {
            text += value.tag + "<br />";
        })

        setSelectedTagsText(text);
    }

    return(
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)} >
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}
                 style={{width: modalInfo[0].width, height: modalInfo[0].height}} >
                <div className="row">
                    <div className="col-sm-12">
                        <h4>Здесь вы можете выбрать теги</h4>
                    </div>
                </div>
                <hr />
                <br />
                <div className="row">
                    <div className="col-sm-6">
                        {
                            modalInfo[0].data.map(header => {
                                return(
                                    <div key={header.id}>
                                        <Row className="mb-3">
                                            <Col sm="12">
                                                <FormLabel><h5>{header.id}</h5></FormLabel>
                                                {
                                                    header.data.map(tag => {
                                                        return(
                                                            <FormCheck type="checkbox" label={tag.id}
                                                                       onChange={() => setRowTags(header.id, tag.id)}
                                                                       defaultValue={tag.checked} key={tag.id}/>
                                                        )
                                                    })
                                                }
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="col-sm-6">
                        <div className="blockView">
                            <h5>Выбранные теги:</h5>
                            <br/>
                            {parse(selectedTagsText)}
                            <br/>
                            <div className="center">
                                <button className="btn btn-primary">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
