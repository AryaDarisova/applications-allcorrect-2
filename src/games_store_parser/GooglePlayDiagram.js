import React from "react";
import {Pie} from "react-chartjs-2";

const styles = {
    blockView: {
        border: '1px solid #ccc',
        padding: '.5rem 1rem',
        borderRadius: '5px',
        margin: '.5rem'
    }
}

export default function GooglePlayDiagram(props) {
    let data = {
        labels: props.data.histogram,
        datasets: [
            {
                data: props.data.histogram,
                // backgroundColor: ["#E74C3C", "#f18b0e", "#F1C40E", "#CAEA3D", "#2ECC71"],
                backgroundColor: ["#da6363", "#f9c19c", "#fff2cc", "#d9ead3", "#a7bf9c"],
            }
        ],
    };

    let options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: props.data.name + ", Review Avg. " + props.data.all
            }
        }
    }

    return (
        <div style={styles.columnBlock}>
            <div style={styles.blockView}>
                <Pie data={data} options={options} />
            </div>
        </div>
    )
}