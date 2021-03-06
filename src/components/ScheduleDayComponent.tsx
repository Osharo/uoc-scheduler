import * as React from 'react'
import moment from "moment";
import {Subject} from "../interfaces/Schedule";
import {useEffect, useRef} from "react";


interface Props {
    diaActual: any;
    subjects: Array<Subject>
}

const ScheduleDayComponent = (props: Props) => {
    const {diaActual, subjects} = props
    const dia = moment(diaActual.format())
    let isToday = false;
    const todayRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        let ref = todayRef.current;
        if (isToday && ref) ref.scrollIntoView({block: 'center'})
    }, [])

    let mainStyle = {
        minHeight: '75px',
        height: '100%'
    }
    if (moment().subtract(1, "day").isAfter(dia)) {
        mainStyle = Object.assign({backgroundColor: 'rgba(231,255,148,0.5)'}, mainStyle);
    } else if (moment().startOf('day').isSame(dia.startOf('day'))) {
        mainStyle = Object.assign({backgroundColor: 'rgb(184,255,188)'}, mainStyle);
        isToday = true;
    }
    return (
        <div style={mainStyle} className={'border-end border-dotted'} ref={todayRef}>
            <div className={'w-100 text-start text-bold d-flex'}>{dia.format('D')}</div>
            {subjects?.map(subject => (
                subject.items?.filter(item => dia >= moment(item.from) && dia <= moment(item.to))
                    .map(item => {

                        let hasStartedToday = dia.isSame(item.from)
                        let lastDay = dia.isSame(item.to)
                        let style;

                        if (item.required) {
                            style = {
                                height: '25px',
                                overflow: 'none',
                                marginBottom: '2px',
                                order: 1
                            }
                        } else {
                            style = {
                                minHeight: '12px',
                                fontSize: '9px',
                                lineHeight: '10px',
                                overflow: 'none',
                                opacity: 0.8,
                                marginBottom: '1px',
                                order: 0
                            }
                        }

                        if (hasStartedToday && lastDay) {
                            return <div className={'w-100'} style={style}>
                                <div style={style}
                                     className={`${subject.class} w-75 border border-solid border-dark clearfix rounded`}>{item.task}</div>
                            </div>;
                        } else if (hasStartedToday) {
                            return <div className={'w-100'} style={style}>
                                <div style={style}
                                     className={`${subject.class} w-75 float-end border-solid border-dark border-bottom border-top border-start rounded-start clearfix`}>{item.task}</div>
                            </div>;
                        } else if (lastDay) {
                            return <div className={'w-100'} style={style}>
                                <div style={style}
                                     className={`${subject.class} w-75 float-start text-end border-solid border-dark border-bottom border-top border-end rounded-end clearfix`}>{item.task}
                                </div>
                            </div>;
                        } else if (!item.required) {
                            // return <div className={'w-100'} style={style}>
                            //     <div style={style}
                            //          className={`${subject.class} w-100 border-solid border-dark border-bottom border-top clearfix `}/>
                            // </div>;
                        }
                    })
            ))}
        </div>
    )
}
export default ScheduleDayComponent