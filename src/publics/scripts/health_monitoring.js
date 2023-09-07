// DISPLAY FETCHED DATA AS CHARTS, GRAPHS AND STATISTICS
const displayData = (data) => {
    if (data.length == 0) {
        document.getElementById('main').innerHTML = 
        `<div class="d-flex flex-column align-items-center justify-content-center empty-wrap">
            <img src="./images/emptylist_yellow.svg" alt="Oops! List is empty" width="300px">
            <h1>Oops!</h1>
            <h2>Nothing to see here</h2>
            <h5>Add a new record to see the content for you</h5>
            <br>
            <a href="/healthrecord"><button class="add-btn">Add a new health record</button></a>
        </div>`
        return;
    }
    // labels for charts
    const labels = data.map((record) => {
        const date = record.submit_date.split('-');
        return (date[2] + '/' + date[1] + '/' + date[0])
    });
    const latest_date = labels[0];
    labels.reverse();

    // height
    const height = data[0].height_value;
    const weight = data[0].weight_value;
    const sugar = data[0].blood_sugar;
    const bpm = data[0].heart_rate;
    const systolic = data[0].heart_pressure_systolic;
    const diastolic = data[0].heart_pressure_diastolic;

    document.querySelectorAll('#fromDate').forEach((item) => {
        item.innerHTML = `as of ${latest_date}`;
    })

    // weight
    const weights = data.map((record) => { return (record.weight_value) });
    weights.reverse();

    // blood sugar
    const sugars = data.map((record) => { return (record.blood_sugar) });
    sugars.reverse();

    // heart rate
    const bpms = data.map((record) => { return (record.heart_rate) });
    bpms.reverse();

    // systolic
    const systolics = data.map((record) => { return (record.heart_pressure_systolic) });
    systolics.reverse();

    // diastolic
    const diastolics = data.map((record) => { return (record.heart_pressure_diastolic) });
    diastolics.reverse();

    // ADD DATA TO UI
    document.getElementById('statHeight').innerHTML = height;
    document.getElementById('statWeight').innerHTML = weight;
    document.getElementById('statSugar').innerHTML = sugar;
    document.getElementById('statBPM').innerHTML = bpm;
    document.getElementById('statSystolic').innerHTML = systolic;
    document.getElementById('statDiastolic').innerHTML = '/' + diastolic + ' mmHg';

    //CHARTS AND STATS
    function avg(arr) {
        return (arr.reduce((x, y) => x + y) / arr.length).toFixed(2);
    }

    //Weight
    const wChart = document.getElementById('weightChart');
    new Chart(wChart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Weight',
                data: weights,
                borderWidth: 1,
                backgroundColor: (context) => {
                    const bgColor = [
                        'rgba(208, 251, 255, 1.0)',
                        'rgba(221, 242, 244, 0.0)'
                    ]

                    if (!context.chart.chartArea) {
                        return;
                    }
                    const { ctx, data, chartArea: { top, bottom } } = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, bgColor[0])
                    gradientBg.addColorStop(1, bgColor[1])
                    return gradientBg;
                },
                borderColor: ['rgba(71, 143, 150, 1.0)'],
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    display: false,
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    display: false,
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            tension: 0.4
        }
    });

    const d_wChart = document.getElementById('detailedWeightChart');
    new Chart(d_wChart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Weight',
                data: weights,
                borderWidth: 1,
                backgroundColor: (context) => {
                    const bgColor = [
                        'rgba(208, 251, 255, 1.0)',
                        'rgba(221, 242, 244, 0.0)'
                    ]

                    if (!context.chart.chartArea) {
                        return;
                    }
                    const { ctx, data, chartArea: { top, bottom } } = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, bgColor[0])
                    gradientBg.addColorStop(1, bgColor[1])
                    return gradientBg;
                },
                borderColor: ['rgba(71, 143, 150, 1.0)'],
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            tension: 0.3
        }
    });

    document.getElementById('highWei').innerHTML = `<strong>Highest weight:</strong> ` + Math.max(...weights) + ` kg`;
    document.getElementById('lowWei').innerHTML = `<strong>Lowest weight:</strong> ` + Math.min(...weights) + ` kg`;
    document.getElementById('avgWei').innerHTML = `<strong>Average weight:</strong> ` + avg(weights) + ` kg`;

    // Sugar
    const sChart = document.getElementById('sugarChart');
    new Chart(sChart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Blood sugar',
                data: sugars,
                borderWidth: 1,
                backgroundColor: (context) => {
                    const bgColor = [
                        'rgba(248, 236, 237, 1.0)',
                        'rgba(202, 107, 110, 0.0)'
                    ]

                    if (!context.chart.chartArea) {
                        return;
                    }
                    const { ctx, data, chartArea: { top, bottom } } = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, bgColor[0])
                    gradientBg.addColorStop(1, bgColor[1])
                    return gradientBg;
                },
                borderColor: ['rgba(202, 107, 110, 1.0)'],
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    display: false,
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    display: false,
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            tension: 0.4
        }
    });

    const d_sChart = document.getElementById('detailedSugarChart');
    new Chart(d_sChart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Blood sugar',
                data: sugars,
                borderWidth: 1,
                backgroundColor: (context) => {
                    const bgColor = [
                        'rgba(248, 236, 237, 1.0)',
                        'rgba(202, 107, 110, 0.0)'
                    ]

                    if (!context.chart.chartArea) {
                        return;
                    }
                    const { ctx, data, chartArea: { top, bottom } } = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, bgColor[0])
                    gradientBg.addColorStop(1, bgColor[1])
                    return gradientBg;
                },
                borderColor: ['rgba(202, 107, 110, 1.0)'],
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            tension: 0.3
        }
    });

    document.getElementById('highSug').innerHTML = `<strong>Highest blood sugar:</strong> ` + Math.max(...sugars) + ` mg/dL`;
    document.getElementById('lowSug').innerHTML = `<strong>Lowest blood sugar:</strong> ` + Math.min(...sugars) + ` mg/dL`;
    document.getElementById('avgSug').innerHTML = `<strong>Average blood sugar:</strong> ` + avg(sugars) + ` mg/dL`;

    // blood sugar evaluation
    if (sugar <= 59) {
        document.getElementById('commentSugar').innerHTML = `you're experiencing hypoglycemia`;
    }
    else if (sugar <= 79) {
        document.getElementById('commentSugar').innerHTML = `you're experiencing early hypoglycemia`;
    }
    else if (sugar <= 100) {
        document.getElementById('commentSugar').innerHTML = `your blood sugar is optimal`;
    }
    else if (sugar <= 126) {
        document.getElementById('commentSugar').innerHTML = `you're experiencing early diabetes`;
    }
    else {
        document.getElementById('commentSugar').innerHTML = `you're experiencing diabetes`;
    }
 
    // Heart Rate
    const bChart = document.getElementById('bpmChart');
    new Chart(bChart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Heart rate',
                data: bpms,
                borderWidth: 1,
                backgroundColor: (context) => {
                    const bgColor = [
                        'rgba(248, 236, 237, 1.0)',
                        'rgba(202, 107, 110, 0.0)'
                    ]

                    if (!context.chart.chartArea) {
                        return;
                    }
                    const { ctx, data, chartArea: { top, bottom } } = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, bgColor[0])
                    gradientBg.addColorStop(1, bgColor[1])
                    return gradientBg;
                },
                borderColor: ['rgba(202, 107, 110, 1.0)'],
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    display: false,
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    display: false,
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            tension: 0.4
        }
    });

    const d_bChart = document.getElementById('detailedBPMChart');
    new Chart(d_bChart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Heart rate',
                data: bpms,
                borderWidth: 1,
                backgroundColor: (context) => {
                    const bgColor = [
                        'rgba(248, 236, 237, 1.0)',
                        'rgba(202, 107, 110, 0.0)'
                    ]

                    if (!context.chart.chartArea) {
                        return;
                    }
                    const { ctx, data, chartArea: { top, bottom } } = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, bgColor[0])
                    gradientBg.addColorStop(1, bgColor[1])
                    return gradientBg;
                },
                borderColor: ['rgba(202, 107, 110, 1.0)'],
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            tension: 0.3
        }
    });

    document.getElementById('highBPM').innerHTML = `<strong>Highest heart rate:</strong> ` + Math.max(...bpms) + ` bpm`;
    document.getElementById('lowBPM').innerHTML = `<strong>Lowest blood sugar:</strong> ` + Math.min(...bpms) + ` bpm`;
    document.getElementById('avgBPM').innerHTML = `<strong>Average blood sugar:</strong> ` + avg(bpms) + ` bpm`;

    // heart rate evaluation
    if (bpm <= 54) {
        document.getElementById('commentBPM').innerHTML = `your heart rate is athlete`;
    }
    else if (bpm <= 61) {
        document.getElementById('commentBPM').innerHTML = `your heart rate is excellent`;
    }
    else if (bpm <= 65) {
        document.getElementById('commentBPM').innerHTML = `your heart rate is great`;
    }
    else if (bpm <= 70) {
        document.getElementById('commentBPM').innerHTML = `your heart rate is good`;
    }
    else if (bpm <= 74) {
        document.getElementById('commentBPM').innerHTML = `your heart rate is average`;
    }
    else if (bpm <= 81) {
        document.getElementById('commentBPM').innerHTML = `your heart rate is below average`;
    }
    else {
        document.getElementById('commentBPM').innerHTML = `your heart rate is poor`;
    }

    // Blood pressure
    const pChart = document.getElementById('pressureChart');
    new Chart(pChart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Systolic',
                data: systolics,
                borderWidth: 1,
                backgroundColor: (context) => {
                    const bgColor = [
                        'rgba(208, 251, 255, 1.0)',
                        'rgba(221, 242, 244, 0.0)'
                    ]

                    if (!context.chart.chartArea) {
                        return;
                    }
                    const { ctx, data, chartArea: { top, bottom } } = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, bgColor[0])
                    gradientBg.addColorStop(0.5, bgColor[1])
                    return gradientBg;
                },
                borderColor: ['rgba(71, 143, 150, 1.0)'],
                fill: true
            }, {
                label: 'Diastolic',
                data: diastolics,
                borderWidth: 1,
                backgroundColor: (context) => {
                    const bgColor = [
                        'rgba(248, 236, 237, 1.0)',
                        'rgba(202, 107, 110, 0.0)'
                    ]

                    if (!context.chart.chartArea) {
                        return;
                    }
                    const { ctx, data, chartArea: { top, bottom } } = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, bgColor[0])
                    gradientBg.addColorStop(1, bgColor[1])
                    return gradientBg;
                },
                borderColor: ['rgba(202, 107, 110, 1.0)'],
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    display: false,
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    display: false,
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            tension: 0.4
        }
    });

    const d_pChart = document.getElementById('detailedPressureChart');
    new Chart(d_pChart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Systolic',
                data: systolics,
                borderWidth: 1,
                backgroundColor: (context) => {
                    const bgColor = [
                        'rgba(208, 251, 255, 1.0)',
                        'rgba(221, 242, 244, 0.0)'
                    ]

                    if (!context.chart.chartArea) {
                        return;
                    }
                    const { ctx, data, chartArea: { top, bottom } } = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, bgColor[0])
                    gradientBg.addColorStop(0.5, bgColor[1])
                    return gradientBg;
                },
                borderColor: ['rgba(71, 143, 150, 1.0)'],
                fill: true
            }, {
                label: 'Diastolic',
                data: diastolics,
                borderWidth: 1,
                backgroundColor: (context) => {
                    const bgColor = [
                        'rgba(248, 236, 237, 1.0)',
                        'rgba(202, 107, 110, 0.0)'
                    ]

                    if (!context.chart.chartArea) {
                        return;
                    }
                    const { ctx, data, chartArea: { top, bottom } } = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, bgColor[0])
                    gradientBg.addColorStop(1, bgColor[1])
                    return gradientBg;
                },
                borderColor: ['rgba(202, 107, 110, 1.0)'],
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            tension: 0.3
        }
    });

    document.getElementById('highSys').innerHTML = `<strong>Highest systolic:</strong> ` + Math.max(...systolics) + ` mmHg`;
    document.getElementById('lowSys').innerHTML = `<strong>Lowest systolic:</strong> ` + Math.min(...systolics) + ` mmHg`;
    document.getElementById('avgSys').innerHTML = `<strong>Average systolic:</strong> ` + avg(systolics) + ` mmHg`;
    document.getElementById('highDia').innerHTML = `<strong>Highest diastolic:</strong> ` + Math.max(...diastolics) + ` mmHg`;
    document.getElementById('lowDia').innerHTML = `<strong>Lowest diastolic:</strong> ` + Math.min(...diastolics) + ` mmHg`;
    document.getElementById('avgDia').innerHTML = `<strong>Average diastolic:</strong> ` + avg(diastolics) + ` mmHg`;

    // blood pressure evaluation
    if (systolic < 120 && diastolic < 80) {
        document.getElementById('commentPressure').innerHTML = `your blood pressure is normal`;
    }
    else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
        document.getElementById('commentPressure').innerHTML = `your blood pressure is elevated`;
    }
    else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
        document.getElementById('commentPressure').innerHTML = `you are having stage 1 high blood pressure`;
    }
    else if (systolic >= 140 || diastolic >= 90) {
        document.getElementById('commentPressure').innerHTML = `you are having stage 2 high blood pressure`;
    }
    else if (systolic > 180 && diastolic > 120) {
        document.getElementById('commentPressure').innerHTML = `you are having hypertensive crisis!!!`;
    }
}

fetch('/health-monitor')
.then(res => {
    return res.json();
})
.then(data => {
    displayData(data);
})