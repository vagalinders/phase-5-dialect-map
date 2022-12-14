import { Link } from 'react-router-dom';
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import { map } from 'leaflet';
import "./SurveyResponses.css"


function SurveyResponses({ survey, setErrors}){

let {placeName} = useParams()

const [responses, setResponses] = useState([])




useEffect(() => {
    fetch(`/responses`)
    .then(res => {
        if(res.ok){
            res.json().then(responseData => {
                // console.log(responseData)
            setResponses(responseData)
            })
        } 
        else{
            res.json().then(data => setErrors(data.error))
        }
    })
}, [])



// a function to create  a state object for all responses for this place
    function generateTable(){
        return responses.map(response => {


            return response.user.user_locations.map(user_location => {
                function renderType(){
                    if (user_location.location_type === "now"){
                        // console.log(`now place ${user_location.place.location}`)
                        return  (<td>User lives there now</td>)
                    }
                    else if (user_location.location_type === "born"){
                        // console.log(`born place ${user_location.place.location}`)
                        return (<td>user was born there</td>)
                    }
                    else {
                        // console.log(`parents place ${user_location.place.location}`)
                        return (<td>user's parents were born there</td>)
                    }
                }
                if(user_location.place.location === placeName){
                    return (
                    <tr key={user_location.id}>
                    <td>{response.user.username}</td>
                    {renderType()}
                    <td>{response.r1}</td>
                    <td>{response.r2}</td>
                    <td>{response.r3}</td>
                    <td>{response.r4}</td>
                    <td>{response.r5}</td>
                    <td>{response.r6}</td>
                    <td>{response.r7}</td>
                    <td>{response.r8}</td>
                    <td>{response.r9}</td>
                    <td>{response.r10}</td>
                    </tr>
                    )
                }
            })

        })

    }   

    return (

<div>
    <h2>Survey Responses for {placeName}</h2>
    <br/>
    <table>
        <thead>
            <tr>
                <th>User</th>
                <th>Type</th>
                <th>{survey.q1}</th>
                <th>{survey.q2}</th>
                <th>{survey.q3}</th>
                <th>{survey.q4}</th>
                <th>{survey.q5}</th>
                <th>{survey.q6}</th>
                <th>{survey.q7}</th>
                <th>{survey.q8}</th>
                <th>{survey.q9}</th>
                <th>{survey.q10}</th>
            </tr>
        </thead>
            <tbody>
                {generateTable()}
            </tbody>
        </table>
        <p>To add your own data, fill out the survey through the profile page.</p>

    <Link to="/">back to home</Link>
</div>)
    
}

export default SurveyResponses