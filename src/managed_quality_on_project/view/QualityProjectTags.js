import {Col, FormCheck, FormLabel, Row} from "react-bootstrap";

export default function QualityProjectTags(props) {
    return(
        <div>
            {
                props.tags.map(header =>{
                    return(
                        <div key={header.id}>
                            <Row className="mb-3">
                                <Col sm="12">
                                    <FormLabel><h5>{header.id}</h5></FormLabel>
                                    {
                                        header.data.map(tag => {
                                            return(
                                                <FormCheck type="checkbox" label={tag.id} defaultValue={tag.checked}
                                                           onChange={() => props.filterByTag(header.id, tag.id)} key={tag.id}/>
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
    )
}