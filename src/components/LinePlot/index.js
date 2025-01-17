import EChartsReact from "echarts-for-react"
import {useMemo} from "react"
import Grid from "@material-ui/core/Grid"
import { style } from "../../styles/style"
const useStyles = style

const axisOffset = 35

let ScoreChartTemplate = ({y = [], timestamps, series, startDate, endDate, clusterIndex}) => {
    // console.log("y",y)
    let yAxis 
    if (y && y.length > 0) {
        yAxis = [{
            type: "value",
            scale: true,
            name: y[0].name,
            nameLocation: "middle",
            nameTextStyle: {
                color: '#ffffff'
            },
            nameGap: 25,
            splitLine: {
                lineStyle: {
                    color: '#ffffff',
                    opacity: 0
                }
            },
            axisLine: {
                lineStyle:{
                    opacity: 0.5,
                }
            },
            axisLabel: {
                show: true,
                color: '#ffffff',
            },
            axisPointer: {
                show: true,
                label: {
                    formatter: function (params) {
                        return  params.value.toFixed(2)
                    },
                    backgroundColor: "#242f39",
                    color: '#ffffff',
                    width:30,
                    fontSize: 12,
                }
            },
            minorTick: {
                show: true
            },
        },
        ...(y.slice(1,).map(({ name, color }, index) => ({
            type: "value",
            scale: true,
            name,
            nameLocation: "middle",
            nameTextStyle: {
                color: '#ffffff'
            },
            nameGap: 30,
            position: "right",
            offset: index * axisOffset,
            splitLine: {
                lineStyle: {
                    color: 'white',
                    opacity: 0
                }
            },
            axisLabel: {
                show: true,
                color: '#ffffff',
            },
            axisPointer: {
                label: {
                    formatter: function (params) { 
                        return  params.value.toFixed(2)
                    },
                    backgroundColor: '#242f39',
                    color: '#ffffff',
                    width:30,
                    fontSize: 12,
                    padding: [
                        3,  // up
                        3, // right
                        3,  // down
                        3, // left
                    ]
                },
            },
            minorTick: {
                show: true
            },
        })))
        ]
    } else {
        yAxis = [{
            type: "value",
            scale: true
        }]
    }

    return {
        tooltip: {
            backgroundColor: '#242f39',
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            textStyle:{
                color: '#ffffff',
                fontFamily: 'Roboto' ,
                fontSize: 12
            },
        },
        dataset: y.map(({dataset}) => dataset),
        animationEnabled: true,
        animationDuration: 100,
        grid: {
            left: 15,
            containLabel: true
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                    title: {
                        zoom: 'zoom',
                        back: 'back'
                    },
                    emphasis: {
                        iconStyle:{
                            textPadding : 20
                        }
                    }
                },
                // restore: {},
                // saveAsImage: {}
            }
        },
        title: {
            left: 'center',
        },
        legend: {
            show: true,
            textStyle: {
                color: '#ffffff',
            },
        },
        xAxis: [
            {
                type: 'time',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: true,
                    lineStyle: {
                        color: "#242f39"
                    }
                },
                axisLabel: {
                    color: '#ffffff',
                },
                min: startDate,
                max: endDate,
                data: timestamps,
            },
        ],
        yAxis,
        dataZoom: [{
            type: 'inside',
            xAxisIndex: [0, 1],
            // start: lhs,
            // end: rhs
        }, {
            type: 'slider',
            xAxisIndex: [0, 1],
            // start: lhs,
            // end: rhs
        }],
        series: [
            ...y.map(({name, data}, index) => ({
                name,
                connectNulls: false,
                // data,
                datasetIndex: index,
                // encode,
                type: 'line',
                sampling: 'lttb',
                emphasis: {
                    focus: 'series'
                },
                // color,
                lineStyle: {
                    opacity: 1,
                    width: 1,
                },
                symbol: "none",
                yAxisIndex: index,
            })),
        ],
    }
}

export default function LinePlot({ startDate, endDate, timestamps, series, dataClusterIndex, sensors, style}){
    const classes = useStyles();
    let clusterIndex = useMemo(() => {
        if (dataClusterIndex === undefined) {
          return Object.entries(series)[0][1].map(() => -1)
        }
        return dataClusterIndex
    }, [dataClusterIndex, series])
    // console.log("clusterIndex",dataClusterIndex)

    let sensorCheck = useMemo(() => {
        let sensorCheck = []
        for (let sensor of sensors) {
            // let model = models.find(model => model.id === m.id && m.checked)
            // if (model !== undefined) {
                sensorCheck.push({
                    name: `${sensor}`, 
                    dataset: {
                        id: `${sensor}`,
                        dimensions: [{name: "timestamp", type: "time"}, {name: "value", type: "float"}, {name: "cluster", type: "int"}],
                        source: series[sensor].reduce((target, key, index) => {
                            target[index] = {"timestamp": timestamps[index], "value": key,  "cluster": clusterIndex[index]}
                            return target
                        }, []) 

                    }, 
                    // unit: "%",
                    color: "#242f39"
                })
            // }    
        }
        return sensorCheck
    }, [sensors, series, timestamps, clusterIndex])

    // console.log("sensorCheck",sensorCheck, clusterIndex)

    return(
        <>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.blackBackground}>
            <EChartsReact
                notMerge={true}
                lazyUpdate={false}
                option={
                    ScoreChartTemplate({
                        // timestamp: machine?machine[`${scoreType}s`].map(health => health.timestamp):0,
                        y: [...sensorCheck], 
                        timestamps,
                        clusterIndex,
                        series,
                        startDate, 
                        endDate
                    })
                }
                style={style}
                // onEvents={{
                //     "datazoom": updateViewport
                // }}
            />
        </Grid>
        </>

    )
}