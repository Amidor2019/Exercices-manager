import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercice = props =>(
    <tr>
        <td>{props.exercice.username}</td>
        <td>{props.exercice.description}</td>
        <td>{props.exercice.duration}</td>
        <td>{props.exercice.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercice._id}>Edit</Link> | <a href="#" onClick = {() => {props.deleteExercice(props.exercice._id)}}>delete</a>
        </td>
    </tr>
)


export default class ExercicesList extends Component{
    constructor(props){
        super(props);

        this.deleteExercice = this.deleteExercice.bind(this);
        this.state = {exercices: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercices/')
        .then(response => {
            this.setState({exercices : response.data})
        })
        .catch((error)=>{
            console.log(error);
        })        
    }

    deleteExercice(id){
        axios.delete('http://localhost:5000/exercices/'+id)
        .then(res => console.log(res.data));

        this.setState({
            exercices: this.state.exercices.filter(el => el._id !== id)
        })
    }
    
    exerciceList(){
        return this.state.exercices.map(currentexercice => {
            return <Exercice exercice = {currentexercice} deleteExercice = {this.deleteExercice} key={currentexercice._id}/>;
        })
    }

    render(){
        return(
            <div>
                <h3> Logged Exercices</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciceList() }
                    </tbody>
                </table>
            </div>
        )
    }
}