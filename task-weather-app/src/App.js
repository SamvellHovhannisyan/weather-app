import {useState, useEffect} from "react";
import axios from "axios";
import {myLocation} from "./constants";
import {Form} from "./components/Form";
import {useFormik} from "formik";
import {Loading} from "./components/Loading";
import {MyLocation} from "./components/MyLocation";
import {FoundCities} from "./components/FoundCities";

function App() {
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState('')
    const [data, setData] = useState([])
    const [inputCity, setInputCity] = useState('')
    const [foundCities, setFoundCities] = useState([])


    useEffect(() => {
        axios.get(myLocation).then(res => {
            setLocation(res.data.country)
        })
    }, [])


    useEffect(() => {
        setLoading(true)
        if (location){
            axios.get(`http://api.weatherapi.com/v1/current.json?key=f42f043acc5d4419b47222700221010&q=${location}`)
                .then(res => {
                    setData(res.data)
                    setLoading(false)
                })
        }
    }, [location])


    const getCities = async () => {
        const promises = Promise.all([
            axios.get(`http://api.weatherapi.com/v1/current.json?key=f42f043acc5d4419b47222700221010&q=London`),
            axios.get(`http://api.weatherapi.com/v1/current.json?key=f42f043acc5d4419b47222700221010&q=New York`),
            axios.get(`http://api.weatherapi.com/v1/current.json?key=f42f043acc5d4419b47222700221010&q=Moscow`)
        ])
        const res = await promises
        setFoundCities(res.map(item => item.data));
    };

    useEffect(() => {
        getCities();
    }, []);


    const searchCity = () => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=f42f043acc5d4419b47222700221010&q=${formik.values.inputCity}`)
            .then(res => {
                if (foundCities.some(city => city.location.name === res.data.location.name)
                    || data.location.name === res.data.location.name) {
                    alert(`${res.data.location.name} is exist`)
                } else {
                    setFoundCities([...foundCities, res.data])
                }
                setInputCity('')
            })


    }

    const formik = useFormik({
        initialValues: {
            inputCity: inputCity
        },
        onSubmit: values => searchCity(),
    })



    return (
        <div className="App container">
            <h1 className="text-center text-white m-5">Weather app</h1>
            <Form formik={formik}/>
            {loading && <Loading/>}
            <MyLocation data={data}/>
            <FoundCities foundCities={foundCities}
                         setFoundCities={setFoundCities}
                         />
        </div>
    );
}

export default App;
