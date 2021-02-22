import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import moment from "moment";
import 'moment/locale/es';
import * as schedule from './database.json'
import Calendar from "./Calendar";

moment.locale('cat')

function App() {
    return (
        <div className="container-fluid">
            <div className={"row"}>
                <div className={"col-2"}>
                    <h5 className={'mt-3'}>Subjects</h5>
                    <ul className={'list-group'}>{schedule.subjects.map(subject => (
                        <li className={`${subject.class} list-group-item`}>{subject.name}</li>
                    ))}</ul>
                </div>
                <div className={"col-10"}>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <Calendar subjects={schedule.subjects}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
