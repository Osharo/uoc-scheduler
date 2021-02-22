import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import moment from "moment";
import 'moment/locale/es';
import Dia from "./Dia";

moment.locale('cat')
let momentF = '2021-02-22';

function App() {
    return (
        <div className="App">
            <div className={"row"}>
                <div className={'col fs-3'}/>
                {[...Array(7)].map((_, dia) => <div
                    className={'col border-bottom border-dark fs-4'}>{moment(momentF).day(dia + 1).format('dddd')}</div>)}
            </div>
            {[...Array(16)].map((_, semana) => (
                <div className={"row"}>
                    <div
                        className={'col fs-5'}>{semana} / {moment(momentF).day(semana * 7 + 1).format('MMMM')}</div>
                    {[...Array(7)].map((_, dia) => {
                        return (
                            <div className={'col border-bottom border-dark p-0 m-0'}>
                                <Dia diaActual={moment(momentF).day(semana * 7 + dia + 1)}/>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default App;
