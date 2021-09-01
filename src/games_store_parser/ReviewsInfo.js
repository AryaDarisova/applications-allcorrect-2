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
        width: '50%',
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
                        if (store.id === "googlePlay" && store.infoReady) {
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
                        } else if (store.id === "appStore" && store.infoReady) {
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

                            store.data.map(item => {
                                let value = new Map();

                                if (!values.has(item.language)) {
                                    value.set("name", item.language);
                                    value.set("positive", 0);
                                    value.set("negative", 0);

                                    values.set(item.language, value);
                                } else {
                                    let positive = values.get(item.language).get("positive");
                                    let negative = values.get(item.language).get("negative");

                                    if (item.voted_up) {
                                        positive++;
                                    } else {
                                        negative++;
                                    }

                                    value.set("name", item.language);
                                    value.set("positive", positive);
                                    value.set("negative", negative);

                                    values.set(item.language, value);
                                }

                                return item
                            })

                            let labels = [];
                            let positiveData = [];
                            let negativeData = [];
                            let persents = [];

                            if (storesAddFilter[0].clearLanguages) {
                                let reviewSumm = 0;
                                let clearReviewSumm = 0;

                                values.forEach(function (value, key) {
                                    reviewSumm += value.get("positive");
                                    reviewSumm += value.get("negative");
                                })

                                values.forEach(function (value, key) {
                                    let summ = value.get("positive") + value.get("negative");
                                    let persent = summ / reviewSumm * 100;

                                    if (persent > 0.1) {
                                        clearReviewSumm += value.get("positive");
                                        clearReviewSumm += value.get("negative");

                                        labels.push(key);
                                        positiveData.push(value.get("positive"));
                                        negativeData.push(value.get("negative"));
                                        // persents.push()
                                    }
                                })

                            } else {
                                values.forEach(function (value, key) {
                                    labels.push(key);
                                    positiveData.push(value.get("positive"));
                                    negativeData.push(value.get("negative"));
                                    // persents.push()
                                })
                            }

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
                                    {

                                    }
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-check" style={styles.blockView}>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input"
                                                           id="steamClearLanguages"
                                                           name="steamClearLanguages"
                                                           checked={storesAddFilter[0].clearLanguages}
                                                           onChange={() => steamClearLanguages()}/>
                                                    <label className="form-check-label"
                                                           htmlFor="steamClearLanguages">Убрать языки с &lt;0.1% отзывов от общего количества</label>
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