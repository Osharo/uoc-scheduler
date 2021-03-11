import moment from "moment";
import ScheduleDayComponent from "./ScheduleDayComponent";
import React from "react";
import {Subject} from "../interfaces/Schedule";

interface Props {
    subjects: Array<Subject>
}

const ScheduleComponent = (props: Props) => {
    const {subjects} = props
    let weeksLength = 16;
    let semesterStartDate = '2021-02-22';
    return (
        <>
            <div className={"row"}>
                {[...Array(7)].map((_, dia) => (
                    <div
                        className={'col border-bottom border-dark fs-4 p-0 m-0'}>
                        <span className={'d-none d-md-block'}>{moment(semesterStartDate).day(dia + 1).format('dddd')}</span>
                        <span className={'d-block d-md-none'}>{moment(semesterStartDate).day(dia + 1).format('ddd')}</span>
                    </div>
                ))}
                <div className={'col fs-3 d-none d-lg-block'}/>
            </div>
            {[...Array(weeksLength)].map((_, semana) => {
                let startMonth = moment(semesterStartDate).day((semana + 1) * 7 - 7).format('MMMM')
                let endMonth = moment(semesterStartDate).day((semana + 1) * 7).format('MMMM')
                return (
                    <div className={"row"}>
                        {[...Array(7)].map((_, dia) => {
                            return (
                                <div className={'col border-bottom border-dark p-0 m-0'}>
                                    <ScheduleDayComponent
                                        diaActual={moment(semesterStartDate).day(semana * 7 + dia + 1)}
                                        subjects={subjects}/>
                                </div>
                            );
                        })}
                        <div className={'col fs-5 d-flex align-items-center d-none d-lg-block'}>
                            <div>{semana + 1}</div>
                            {startMonth !== endMonth ? (
                                <div
                                    className={'d-flex align-items-center flex-column border-start border-solid border-dark ms-3'}>
                                    <div>{startMonth}</div>
                                    <div>{endMonth}</div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                );
            })}
        </>
    )
}
export default ScheduleComponent