import * as schedule from "../database.json";
import moment from "moment";
import React from "react";
import {Subject} from "../interfaces/Schedule";

interface Props {
    subjects: Array<Subject>
}

const InProgressComponent = (props: Props) => {
    const {subjects} = props
    return (
        <>
            <div className={'fs-4 text-center'}>In progress</div>
            <ul className={'list-group'}>{
                subjects.map(subject => {
                    return <li className={`list-group-item`}>{subject.name}
                        <ul className={'list-group'}>
                            {subject && subject.items ? subject.items.filter(item => moment().isBetween(item.from, item.to))
                                    .sort(item => moment().unix() - moment(item.to).unix())
                                    .map(item => (
                                        <li className={`${subject.class} list-group-item d-flex flex-column`}>
                                            <span>{item.task}</span><small>Remains {moment().diff(item.to, "days")} days</small>
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