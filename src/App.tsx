import React, {useEffect, useState} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import moment from "moment";
import 'moment/locale/es';
import * as schedule from './database.json'
import ScheduleComponent from "./components/ScheduleComponent";
import InProgressComponent from "./components/InProgressComponent";

moment.locale('cat')

function App() {
    const [currentTime, setCurrentTime] = useState(moment())

    setInterval(() => {
        const newTime = moment()
        if (currentTime.format('mm') !== newTime.format('mm')) {
            setCurrentTime(newTime)
        }
    })

    return (
        <div className="container-fluid">
            <div className={"row"}>
                <div className={"col-md-3 p-0 m-0"}>
                    <div className={'sticky-xl-top sticky-lg-top pb-1'} style={{top: 0}}>
                        <div className={'p-1'} style={{backgroundColor: '#73EDFF', color: '#000078'}}>
                            <h1 className={'text-center'}>{currentTime.format('dddd, HH:mm')}</h1>
                        </div>
                        <div className={'p-2'}>
                            <InProgressComponent currentTime={currentTime} subjects={schedule.subjects}/>
                        </div>
                        {/*<div className={'d-none d-md-block p-2'}>*/}
                        {/*    <div className={'fs-4 text-center'}>Subjects</div>*/}
                        {/*    <ul className={'list-group'}>{schedule.subjects.map(subject => (*/}
                        {/*        <li className={`${subject.class} list-group-item p-1`}>{subject.name}</li>*/}
                        {/*    ))}</ul>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className={"col-md-9 bg-white"}>
                    <ScheduleComponent subjects={schedule.subjects}/>
                </div>
            </div>
        </div>
    );
}

export default App;
