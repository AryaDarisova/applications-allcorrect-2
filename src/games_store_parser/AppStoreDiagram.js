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

export default function AppStoreDiagram(props) {
    let data = {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
            {
                // label: "Review Avg. " + props.data.ratings,
                data: props.data.histogram,
                backgroundColor: ["#E74C3C", "#f18b0e", "#F1C40E", "#CAEA3D", "#2ECC71"],
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
                text: props.data.name + " (" + props.data.id + "), Review Avg. " + props.data.ratings
            }
        }
    }

    /*let options = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            }
        }
    };*/

    return (
        <div /*className="col-sm-4"*/style={styles.columnBlock}>
            <div style={styles.blockView}>
                <Pie data={data} options={options} />
            </div>
        </div>
    )
}