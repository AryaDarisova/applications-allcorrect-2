import React from "react";
import {Bar} from "react-chartjs-2";
import AppStoreDiagram from "./AppStoreDiagram";

const styles = {
    blockCenter: {
        textAlign: 'center'
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
                        if (store.id === "googlePlay" && store.infoReady && store.data.length) {
                            return(
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
                        } else if (store.id === "appStore" && store.infoReady && store.data.length) {
                            return (
                                <div key={store.id}>
                                    {
                                        store.data.map(dataItem => {
                                            // console.log("dataItem.name", dataItem.name);

                                            return (
                                                <div key={dataItem.id} style={styles.columnBlock}>
                                                    <AppStoreDiagram data={dataItem} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )

                            /*let data = [];

                            for (let i = 0; i < store.data.length; i += 3) {
                                let item = {
                                    0: store.data[i],
                                    1: (i + 1) < store.data.length ? store.data[i + 1] : false,
                                    2: (i + 2) < store.data.length ? store.data[i + 2] : false
                                }

                                data.push(item);
                            }

                            return (
                                <div key={store.id}>
                                    <AppStoreDiagram data={store.data} />
                                </div>
                            )*/
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

                                    if (persent > 0.10) {
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
                                        percent: otherPercentValue
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

                            dataArray.sort((a, b) => b.all - a.all);

                            let labels = [];
                            let positiveData = [];
                            let negativeData = [];

                            dataArray.forEach(function (value) {
                                labels.push(value.label);
                                positiveData.push(value.positive);
                                negativeData.push(value.negative);
                            });

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
                                ],
                            };

                            let options = {
                                responsive: true,
                                scales: {
                                    x: {
                                        stacked: true,
                                    },
                                    y: {
                                        stacked: true
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
                                        <div className="col-sm-3">

                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-check" style={styles.blockView}>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input"
                                                           id="steamClearLanguages"
                                                           name="steamClearLanguages"
                                                           checked={storesAddFilter[0].clearLanguages}
                                                           onChange={() => steamClearLanguages()}/>
                                                    <label className="form-check-label"
                                                           htmlFor="steamClearLanguages">Убрать языки с &lt;<strong>0.1%</strong> отзывов от общего количества</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <Bar data={data} options={options} />
                                </div>
                            )
                        }
                    }
                })
            }
        </div>
    )
}