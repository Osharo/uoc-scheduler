import * as schedule from "../database.json";
import moment from "moment";
import React from "react";
import {Subject} from "../interfaces/Schedule";

interface Props {
    subjects: Array<Subject>
    currentTime: moment.Moment
}

const InProgressComponent = (props: Props) => {
    const {subjects, currentTime} = props
    return (
        <>
            <ul className={'list-unstyled'}>{
                subjects.map(subject => {
                    return <li className={`p-0 m-0`}>{subject.name}
                        <ul className={'list-group'}>
                            {subject && subject.items ? subject.items.filter(item => currentTime.isSameOrAfter(item.from) && currentTime.isSameOrBefore(item.to))
                                    .sort(item => currentTime.diff(item.to, "days"))
                                    .map(item => (
                                        <li className={`${subject.class} list-group-item d-flex align-items-center justify-content-between p-1`}>
                                            <span>{item.task}</span><small>{currentTime.to(item.to)}</small>
                                        </li>
                                    ))
                                : null}
                        </ul>
                    </li>
                })
            }</ul>
        </>
    )
}
export default InProgressComponent