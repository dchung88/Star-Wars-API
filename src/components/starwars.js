import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StarWars = props => {
    const[objectData, setObjectData] = useState([]);
    const[data, setData] = useState([]);
    const[obj, setObject] = useState("people");
    const[id, setId] = useState("");

    useEffect(() => {
        axios.get('https://swapi.co/api/')
        .then(response => {
            setObjectData(response.data)
        })
        .catch( err => console.log(err) );

    }, []
    );

    const onSubmitHandler = e => {
        e.preventDefault();
        console.log('https://swapi.co/api/' + obj +'/' + id);
        axios.get('https://swapi.co/api/' + obj +'/' + id)
        .then(response => {
            console.log(response);
            setData(response.data)
        })
        .catch( () => {
            console.log("error");
        }, []
        );
        const route = '/'+ obj +'/' + id
    }

    const keys = Object.keys(objectData);
    const keys2 = Object.keys(data);

    return (
        <>
        <div>
            <h1>Star Wars API</h1>
            <form onSubmit = {onSubmitHandler}>
                <label>Search for:</label>
                <select name= "search" onChange = {e => setObject(e.target.value)}>
                {keys.map((keys, i) =>
                <option name ="objects" key = {i} >{keys}</option>
                )}    
                </select>
                <label>ID:</label><input type= "number" name= "quantity" id="quantity" min="1" onChange = {e => setId(e.target.value)} />
                <input type= "submit" value = "Search" />
            </form>
        </div>
        <div>
            {keys2.map((keys, i) =>
                <p>{keys}: {data[keys]}</p>
            )}
        </div>
        </>

    );

}

export default StarWars;