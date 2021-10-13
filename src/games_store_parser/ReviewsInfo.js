import React from "react";
import {Bar} from "react-chartjs-2";
import {defaults} from "react-chartjs-2";
import AppStoreDiagram from "./AppStoreDiagram";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {faExchangeAlt} from "@fortawesome/free-solid-svg-icons";
import GooglePlayDiagram from "./GooglePlayDiagram";
import logo from "../img/logo1.png";

const styles = {
    blockCenter: {
        textAlign: 'center'
    },

    blockRight: {
        textAlign: 'right'
    },

    blockView: {
        border: '1px solid #ccc',
        padding: '.5rem 1rem',
        borderRadius: '5px',
        margin: '.5rem'
    },

    columnBlock: {
        width: '33%',
        display: 'inline-block'
    },

    inputPercent: {
        width: '50px',
    },

    inputCheckbox: {
        marginLeft: '0px',
    }
}

export default function ReviewsInfo(props) {
    const [storesAddFilter, setStoresAddFilter] = React.useState([
        {id: 'steam', clearLanguages: true}
    ])

    function steamClearLanguages() {
        setStoresAddFilter(storesAddFilter.map(store => {
            if (store.id === "steam") {
                store.clearLanguages = !store.clearLanguages
                // console.log(store.clearLanguages);
            }

            return store
        }))
    }

    return(
        <div>
            {
                props.gameStores.map(store => {
                    if (store.checked) {
                        if (store.id === "googlePlay" && store.infoReady/* && store.data.length*/) {
                            let values = new Map();
                            let allReviewsCount = 0;

                            store.data.map(item => {
                                let value = new Map();

                                if (!values.has(item.language)) {
                                    value.set("name", item.language);
                                    value.set("1", 0);
                                    value.set("2", 0);
                                    value.set("3", 0);
                                    value.set("4", 0);
                                    value.set("5", 0);
                                    value.set("all", 0);

                                    values.set(item.language, value);
                                } else {
                                    let scoreOne = values.get(item.language).get("1");
                                    let scoreTwo = values.get(item.language).get("2");
                                    let scoreThree = values.get(item.language).get("3");
                                    let scoreFour = values.get(item.language).get("4");
                                    let scoreFive = values.get(item.language).get("5");
                                    let all = values.get(item.language).get("all");

                                    if (item.score === 1) {
                                        scoreOne++;
                                    } else if (item.score === 2) {
                                        scoreTwo++;
                                    } else if (item.score === 3) {
                                        scoreThree++;
                                    } else if (item.score === 4) {
                                        scoreFour++;
                                    } else if (item.score === 5) {
                                        scoreFive++;
                                    }

                                    all++;
                                    allReviewsCount++;

                                    value.set("name", item.language);
                                    value.set("1", scoreOne);
                                    value.set("2", scoreTwo);
                                    value.set("3", scoreThree);
                                    value.set("4", scoreFour);
                                    value.set("5", scoreFive);
                                    value.set("all", all);

                                    values.set(item.language, value);
                                }

                                return item
                            })

                            let dataArray = [];

                            /*if (storesAddFilter[0].clearLanguages) {
                                let otherData = [];

                                values.forEach(function (value, key) {
                                    let persent = value.get("all") / allReviewsCount * 100;
                                    persent = +persent.toFixed(2);

                                    if (persent >= store.languageClearPercent) {
                                        dataArray.push({
                                            label: key,
                                            positive: value.get("positive"),
                                            negative: value.get("negative"),
                                            all: value.get("all"),
                                            percent: persent
                                        });
                                    } else {
                                        let otherItem = {
                                            positive: value.get("positive"),
                                            negative: value.get("negative"),
                                            all: value.get("all"),
                                            percent: persent
                                        }

                                        otherData.push(otherItem);
                                    }
                                })

                                if (otherData.length) {
                                    let otherPositiveValue = 0;
                                    let otherNegativeValue = 0;
                                    let otherAllValue = 0;
                                    let otherPercentValue = 0;

                                    for (let i = 0; i < otherData.length; i++) {
                                        otherPositiveValue += otherData[i].positive;
                                        otherNegativeValue += otherData[i].negative;
                                        otherAllValue += otherData[i].all;
                                        otherPercentValue += otherData[i].percent;
                                    }

                                    dataArray.push({
                                        label: "Other",
                                        positive: otherPositiveValue,
                                        negative: otherNegativeValue,
                                        all: otherAllValue,
                                        percent: +otherPercentValue.toFixed(2)
                                    });
                                }
                            } else {*/
                                values.forEach(function (value, key) {
                                    let persent = value.get("all") / allReviewsCount * 100;
                                    persent = +persent.toFixed(2);

                                    dataArray.push({
                                        label: key,
                                        score: [value.get("1"), value.get("2"), value.get("3"), value.get("4"), value.get("5")],
                                        all: value.get("all"),
                                        percent: persent
                                    });
                                })
                            /*}*/

                            dataArray.sort((a, b) => b.all - a.all);

                            console.log("dataArray", dataArray);

                            return (
                                <div key={store.id}>
                                    {
                                        dataArray.map(dataItem => {
                                            return (
                                                <div key={dataItem.label} style={styles.columnBlock}>
                                                    <GooglePlayDiagram data={dataItem} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )

                        } else if (store.id === "appStore" && store.infoReady && store.data.length) {
                            console.log("store.data", store.data);
                            store.data.sort((a, b) => b.ratings - a.ratings);

                            return (
                                <div key={store.id}>
                                    {
                                        store.data.map(dataItem => {
                                            return (
                                                <div key={dataItem.id} style={styles.columnBlock}>
                                                    <AppStoreDiagram data={dataItem} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        } else if (store.id === "steam" && store.infoReady) {
                            let values = new Map();
                            let allReviewsCount = 0;

                            store.data.map(item => {
                                let value = new Map();

                                if (!values.has(item.language)) {
                                    value.set("name", item.language);
                                    value.set("positive", 0);
                                    value.set("negative", 0);
                                    value.set("all", 0);

                                    values.set(item.language, value);
                                } else {
                                    let positive = values.get(item.language).get("positive");
                                    let negative = values.get(item.language).get("negative");
                                    let all = values.get(item.language).get("all");

                                    if (item.voted_up) {
                                        positive++;
                                    } else {
                                        negative++;
                                    }

                                    all++;
                                    allReviewsCount++;

                                    value.set("name", item.language);
                                    value.set("positive", positive);
                                    value.set("negative", negative);
                                    value.set("all", all);

                                    values.set(item.language, value);
                                }

                                return item
                            })

                            let dataArray = [];

                            if (storesAddFilter[0].clearLanguages) {
                                let otherData = [];

                                values.forEach(function (value, key) {
                                    let persent = value.get("all") / allReviewsCount * 100;
                                    persent = +persent.toFixed(2);

                                    if (persent >= store.languageClearPercent) {
                                        dataArray.push({
                                            label: key,
                                            positive: value.get("positive"),
                                            negative: value.get("negative"),
                                            all: value.get("all"),
                                            percent: persent
                                        });
                                    } else {
                                        let otherItem = {
                                            positive: value.get("positive"),
                                            negative: value.get("negative"),
                                            all: value.get("all"),
                                            percent: persent
                                        }

                                        otherData.push(otherItem);
                                    }
                                })

                                if (otherData.length) {
                                    let otherPositiveValue = 0;
                                    let otherNegativeValue = 0;
                                    let otherAllValue = 0;
                                    let otherPercentValue = 0;

                                    for (let i = 0; i < otherData.length; i++) {
                                        otherPositiveValue += otherData[i].positive;
                                        otherNegativeValue += otherData[i].negative;
                                        otherAllValue += otherData[i].all;
                                        otherPercentValue += otherData[i].percent;
                                    }

                                    dataArray.push({
                                        label: "Other",
                                        positive: otherPositiveValue,
                                        negative: otherNegativeValue,
                                        all: otherAllValue,
                                        percent: +otherPercentValue.toFixed(2)
                                    });
                                }
                            } else {
                                values.forEach(function (value, key) {
                                    let persent = value.get("all") / allReviewsCount * 100;
                                    persent = +persent.toFixed(2);

                                    dataArray.push({
                                        label: key,
                                        positive: value.get("positive"),
                                        negative: value.get("negative"),
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

                            let labels = [];
                            let positiveData = [];
                            let negativeData = [];

                            dataArray.forEach(function (value) {
                                labels.push(value.label);
                                positiveData.push(value.positive);
                                negativeData.push(value.negative);
                            });

                            defaults.font.size = 16;

                            let data = {
                                labels: labels,
                                datasets: [
                                    {
                                        label: 'Negative',
                                        data: negativeData,
                                        backgroundColor: 'rgb(255, 99, 132)',
                                    },
                                    {
                                        label: 'Positive',
                                        data: positiveData,
                                        backgroundColor: 'rgb(54, 162, 235)',
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
                                <div key={store.id}>
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div style={styles.blockView}>
                                                <strong>Total reviews:</strong> {allReviewsCount}
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
                                                                   id="steamClearLanguages"
                                                                   name="steamClearLanguages"
                                                                   checked={storesAddFilter[0].clearLanguages}
                                                                   onChange={() => steamClearLanguages()} style={styles.inputCheckbox}/>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <label className="form-check-label">Убрать языки с количеством процентов менее </label>
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <input
                                                                className="form-control"
                                                                id="inputSteamClearLanguagesPercent"
                                                                name="inputSteamClearLanguagesPercent"
                                                                defaultValue={store.languageClearPercent}
                                                                onChange={e => props.setSteamLanguageClearPercent(e.target.value)}
                                                                style={styles.inputPercent}/>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-12" style={styles.blockRight}>
                                            <img src={logo} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12" style={styles.blockCenter}>
                                            <h4>{store.appName}</h4>
                                        </div>
                                    </div>
                                    <Bar data={data} options={options} />
                                </div>
                            )
                        } else if (store.id === "googlePlay" && store.infoOnGet) {
                            return (
                                <div key={store.id}>
                                    <div className="row">
                                        <div className="col-sm-4">

                                        </div>
                                        <div className="col-sm-4" style={styles.blockView}>
                                            <div style={styles.blockCenter}>
                                                Загрузка данных <FontAwesomeIcon icon={faSpinner} spin/>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">

                                        </div>
                                    </div>
                                </div>
                            )
                        } else if (store.id === "steam" && store.infoOnGet) {
                            return (
                                <div key={store.id}>
                                    <div className="row">
                                        <div className="col-sm-4">

                                        </div>
                                        <div className="col-sm-4" style={styles.blockView}>
                                            <div style={styles.blockCenter}>
                                                Загрузка данных <FontAwesomeIcon icon={faSpinner} spin/>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">

                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                })
            }
        </div>
    )
}