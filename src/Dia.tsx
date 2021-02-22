import * as React from 'react'
import moment from "moment";
import * as grafs from './grafs.json'

interface Props {
    diaActual: any;
}

const Dia = (props: Props) => {
    const {diaActual} = props
    const dia = moment(diaActual.format())

    let parsedItems = [];
    // for (let subject of grafs.subjects) {
    //     for (let task of subject.items) {
    //         if (dia >= moment(task.from) && dia <= moment(task.to)) {
    //             parsedItems.push(task)
    //         }
    //     }
    // }
    parsedItems = grafs.subjects
    let mainStyle
    if (moment().isAfter(dia)) {
        mainStyle = {backgroundColor: 'rgba(255,0,0,0.2)'}
    }
    return (
        <div style={mainStyle}>
            <div className={'w-100'}>{dia.format('D')}</div>
            {parsedItems?.map(subject => (
                subject.items?.filter(item => dia >= moment(item.from) && dia <= moment(item.to))
                    .sort(item => item.required ? 1 : 0)
                    .map(item => {

                        let hasStartedToday = dia.isSame(item.from)
                        let lastDay = dia.isSame(item.to)
                        let style;
                        if (item.required) {
                            style = {
                                height: '25px',
                                overflow: 'none',
                                marginBottom: '5px'
                            }
                        } else {
                            style = {
                                height: '12px',
                                fontSize: '9px',
                                lineHeight: '10px',
                                overflow: 'none',
                                opacity: 0.8
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
                                     className={`${subject.class} w-75 float-end border-solid border-dark border-bottom border-top border-start rounded-start clearfix`}>🔛{item.task}</div>
                            </div>;
                        } else if (lastDay) {
                            return <div className={'w-100'} style={style}>
                                <div style={style}
                                     className={`${subject.class} w-75 float-start border-solid border-dark border-bottom border-top border-end rounded-end clearfix`}>{item.task}⚠
                                </div>
                            </div>;
                            // } else if(!item.required) {
                            //     return <div className={'w-100'} style={style}><div style={style}
                            //                 className={`${subject.class} w-100 border-solid border-bottom border-top clearfix`}/></div>;
                        }
                    })
            ))}
        </div>
    )
}
export default Dia