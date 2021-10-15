import React from "react";
import {Bar, defaults} from "react-chartjs-2";
import logo from "../img/logo1.png";

const styles = {
    blockView: {
        border: '1px solid #ccc',
        padding: '.5rem 1rem',
        borderRadius: '5px',
        margin: '.5rem'
    },

    blockRight: {
        textAlign: 'right'
    },

    blockCenter: {
        textAlign: 'center'
    },

    inputPercent: {
        width: '50px',
    },

    inputCheckbox: {
        marginLeft: '0px',
    }
}

export default function AppStoreDiagram(props) {
    let values = props.data;
    let dataArray = [];
    let labels = [];
    let dataFirst = [];
    let dataSecond = [];
    let dataThird = [];
    let dataFourth = [];
    let dataFive = [];

    if (props.clearLanguages) {
        let otherData = [];

        values.forEach(function (value, key) {
            let persent = value.get("all") / props.allReviewsCount * 100;
            persent = +persent.toFixed(2);

            if (persent >= props.languageClearPercent) {
                dataArray.push({
                    label: key,
                    histogram: value.get("histogram"),
                    all: value.get("all"),
                    percent: persent
                });
            } else {
                let otherItem = {
                    histogram: value.get("histogram"),
                    all: value.get("all"),
                    percent: persent
                }

                otherData.push(otherItem);
            }
        })

        if (otherData.length) {
            let otherHistogramValue = [0, 0, 0, 0, 0];
            let otherAllValue = 0;
            let otherPercentValue = 0;

            for (let i = 0; i < otherData.length; i++) {
                otherHistogramValue = [otherHistogramValue[0] + otherData[i].histogram[0],
                    otherHistogramValue[1] + otherData[i].histogram[1],
                    otherHistogramValue[2] + otherData[i].histogram[2],
                    otherHistogramValue[3] + otherData[i].histogram[3],
                    otherHistogramValue[4] + otherData[i].histogram[4]];
                otherAllValue += otherData[i].all;
                otherPercentValue += otherData[i].percent;
            }

            dataArray.push({
                label: "Other",
                histogram: otherHistogramValue,
                all: otherAllValue,
                percent: +otherPercentValue.toFixed(2)
            });
        }
    } else {
        values.forEach(function (value, key) {
            let persent = value.get("all") / props.allReviewsCount * 100;
            persent = +persent.toFixed(2);

            dataArray.push({
                label: key,
                histogram: value.get("histogram"),
                all: value.get("all"),
                percent: persent
            });
        })
    }

    dataArray.sort(function(a, b) {
        if (a.label === "Other") {
            return 1;
        } else {
            return b.all - a.all;
        }
    });

    dataArray.forEach(function (value) {
        labels.push(value.label);
        dataFirst.push(value.histogram[0]);
        dataSecond.push(value.histogram[1]);
        dataThird.push(value.histogram[2]);
        dataFourth.push(value.histogram[3]);
        dataFive.push(value.histogram[4]);
    });

    defaults.font.size = 16;

    let data = {
        labels: labels,
        datasets: [
            {
                label: '1',
                data: dataFirst,
                backgroundColor: 'rgb(218, 99, 99)',
            },
            {
                label: '2',
                data: dataSecond,
                backgroundColor: 'rgb(249, 193, 156)',
            },
            {
                label: '3',
                data: dataThird,
                backgroundColor: 'rgb(255, 242, 204)',
            },
            {
                label: '4',
                data: dataFourth,
                backgroundColor: 'rgb(217,234,211)',
            },
            {
                label: '5',
                data: dataFive,
                backgroundColor: 'rgb(167, 191, 156)',
            }
        ]
    };

    let options = {
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18
                    }
                }
            }
        }
    };

    return(
        <div>
            <div className="row">
                <div className="col-sm-6">
                    <div style={styles.blockView}>
                        <strong>Total reviews:</strong> {props.allReviewsCount}
                        <br />
                        <br />
                        {
                            dataArray.map(item => {
                                return (
                                    <div key={item.label}>
                                        <strong>{item.label}:</strong> {item.all} ({item.percent}%)
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-sm-1">

                </div>
                <div className="col-sm-5">
                    <div className="form-check" style={styles.blockView}>
                        <div className="row">
                            <div className="col-sm-1 form-check">
                                <input type="checkbox" className="form-check-input"
                                       id="googlePlayClearLanguages"
                                       name="googlePlayClearLanguages"
                                       checked={props.clearLanguages}
                                       onChange={() => props.clearLanguagesFunc("googlePlay")} style={styles.inputCheckbox}/>
                            </div>
                            <div className="col-sm-8">
                                <label className="form-check-label">Убрать языки с количеством процентов менее </label>
                            </div>
                            <div className="col-sm-2">
                                <input
                                    className="form-control"
                                    id="inputGooglePlayClearLanguagesPercent"
                                    name="inputGooglePlayClearLanguagesPercent"
                                    defaultValue={props.languageClearPercent}
                                    onChange={e => props.setClearLanguagesPercent("googlePlay", e.target.value)}
                                    style={styles.inputPercent} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="row">
                <div className="col-sm-12" style={styles.blockRight}>
                    <img src={logo} alt="logo"/>
                </div>
            </div>
            <Bar data={data} options={options} />
        </div>
    )
}