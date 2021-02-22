import moment from "moment";
import Dia from "./Dia";
import React from "react";
import {Subject} from "./interfaces/Schedule";

interface Props {
    subjects: Array<Subject>
}

const Calendar = (props: Props) => {
    const {subjects} = props
    let weeksLength = 16;
    let semesterStartDate = '2021-02-22';
    return (
        <>
            <div className={"row"}>
                <div className={'col fs-3'}/>
                {[...Array(7)].map((_, dia) => <div
                    className={'col border-bottom border-dark fs-4'}>{moment(semesterStartDate).day(dia + 1).format('dddd')}</div>)}
            </div>
            {[...Array(weeksLength)].map((_, semana) => {
                let startMonth = moment(semesterStartDate).day((semana + 1) * 7 - 7).format('MMMM')
                let endMonth = moment(semesterStartDate).day((semana + 1) * 7).format('MMMM')
                return (
                    <div className={"row"}>
                        <div className={'col fs-5 d-flex align-items-center'}>
                            <div>{semana}</div>
                            {startMonth !== endMonth ? (
                                <div
                                    className={'d-flex align-items-center flex-column border-start border-solid border-dark ms-3'}>
                                    <div>{startMonth}</div>
                                    <div>{endMonth}</div>
                                </div>
                            ) : null}
                        </div>
                        {[...Array(7)].map((_, dia) => {
                            return (
                                <div className={'col border-bottom border-dark p-0 m-0'}>
                                    <Dia diaActual={moment(semesterStartDate).day(semana * 7 + dia + 1)}
                                         subjects={subjects}/>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </>
    )
}
export default Calendar