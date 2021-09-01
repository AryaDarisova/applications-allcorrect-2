import React from "react";
import {Bar} from "react-chartjs-2";

export default function Diagram(props) {
    props.storesAddFilter.map(store => {
        if (store.id === "steam" && props.graph === "steam") {
            if (store.clearLanguages) {
                console.log('Привет из файла diagram - тут надо чистить лишние языки');
            } else {
                let labels = [];
                let positiveData = [];
                let negativeData = [];

                props.values.forEach(function (value, key) {
                    labels.push(key);
                    positiveData.push(value.get("positive"));
                    negativeData.push(value.get("negative"));
                })

                const data = {
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

                const options = {
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
                    <div>
                        {
                            <Bar data={data} options={options} />
                        }
                    </div>
                )
            }
        }
    })
}