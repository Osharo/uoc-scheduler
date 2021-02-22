import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import moment from "moment";
import 'moment/locale/es';
import * as schedule from './database.json'
import ScheduleComponent from "./components/ScheduleComponent";
import InProgressComponent from "./components/InProgressComponent";

moment.locale('cat')

function App() {
    return (
        <div className="container-fluid">
            <div className={"row"}>
                <div className={"col-md-3"}>
                    <div className={'sticky-xl-top sticky-lg-top pb-4'} style={{top: 0}}>
                        <div>
                            <h1 className={'text-center'}>Spring semester</h1>
                            <InProgressComponent subjects={schedule.subjects}/>
                        </div>
                        <div className={'d-none d-md-block'}>
                            <div className={'fs-4 text-center'}>Subjects</div>
                            <ul className={'list-group'}>{schedule.subjects.map(subject => (
                                <li className={`${subject.class} list-group-item`}>{subject.name}</li>
                            ))}</ul>
                        </div>
                    </div>
                </div>
                <div className={"col-md-9"}>
                    <ScheduleComponent subjects={schedule.subjects}/>
                </div>
            </div>
        </div>
    );
}

export default App;
