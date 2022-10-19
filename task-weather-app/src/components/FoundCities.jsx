import {Card} from "react-bootstrap";
import uuid from "react-uuid";

export function FoundCities(props){

    const Delete = (name) => {
        props.setFoundCities(props.foundCities.filter((city)=>{
            return name!==city.location.name
        }))
    }


    return(
        <div className='row'>
            {
                props.foundCities.map((foundCity,id) =>

                    <div className='col-md-4' key={id}>
                        <Card border="secondary" style={{width: '18rem', marginTop: '45px', height: '250px'}}>
                            <Card.Body>
                                <div>
                                    <h4>{foundCity.location.country}</h4>
                                    <h1>{foundCity.location.name}</h1>
                                </div>
                                <div>
                                    <h3>{foundCity.current.temp_c} °C</h3>
                                    <h5>{foundCity.current.condition.text}</h5>
                                </div>
                            </Card.Body>
                            <button onClick={()=>{Delete(foundCity.location.name)}}  className='btn btn-danger'>Delete</button>
                        </Card>
                    </div>
                )
            }
        </div>
    )
}