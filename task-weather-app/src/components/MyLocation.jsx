import {Card} from "react-bootstrap";

export function MyLocation(props){
    return(
        <div className='d-flex justify-content-center'>
            {
                props.data.location &&
                    <Card border="secondary" style={{width: '18rem', marginTop: '45px'}}>
                        <Card.Body>
                                <div>
                                    <h4>{props.data.location.country}</h4>
                                    <h1>{props.data.location.name}</h1>
                                </div>
                                <div>
                                    <h3>{props.data.current.temp_c} °C</h3>
                                    <h5>{props.data.current.condition.text}</h5>
                                </div>
                        </Card.Body>
                    </Card>

            }
        </div>
    )
}