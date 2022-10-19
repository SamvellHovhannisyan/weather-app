export function Form(props){
    return(
        <div className='d-flex justify-content-center'>
            <form  onSubmit={props.formik.handleSubmit}>
                <input className='form-control'
                       placeholder='Enter country/city'
                       onChange={props.formik.handleChange}
                       value={props.formik.values.inputCity}
                       name='inputCity' type="text"/>
            </form>
            <button onClick={props.formik.handleSubmit} className='btn btn-dark mx-3' type="submit">Search</button>
        </div>
    )
}