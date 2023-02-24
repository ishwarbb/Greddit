import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStatbyId, getSubGredditInfobyID, getUserInfo } from "./misc";
import MSGInstanceBar from "./MSGInstanceBar";
// import Chart from 'react-google-chart';
import Plot from 'react-plotly.js';


const Stats = () => {
    let { id } = useParams();
    const [usrData, setUsrData] = useState(null);
    const [people, setPeople] = useState([]);
    const [bannedpeople, setBannedPeople] = useState([]);
    const [subgreddits, setSubgreddits] = useState([]);
    const [statid, setStatID] = useState(null);
    const [stat, setStat] = useState([]);


    useEffect(() => {
        let promiseB = async () => {
            const a = await getUserInfo();
            console.log(a);
            setUsrData(a);
            const b = await getSubGredditInfobyID({ id: id });
            console.log(b);
            console.log(b.people);
            setSubgreddits(b);
            if (b.people !== undefined) setPeople(b.people);
            if (b.bannedpeople !== undefined) setBannedPeople(b.banned);
            if (b.statid !== undefined) {
                setStatID(b.statid);
                console.log("statid = ", b.statid);
            }
            const c = await getStatbyId({ id: b.statid });
            console.log("stat =", c);
            setStat(c);
        };

        promiseB();
    }, []);


    return (
        <div>
            <MSGInstanceBar />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
                style={{ minHeight: '100vh', marginTop: '100px' }}
            >
                <Typography variant="h4" textAlign="center">
                    {/* Stats */}
                </Typography>

                <Typography variant="h5" textAlign="center">
                Growth of the sub greddiit in terms of members over time
                </Typography>
                <table>
                        <tr>
                            <>
                                {(
                                    <td>
                                        <strong>Time :</strong>
                                        No of Users
                                    </td>
                                )}
                            </>
                        </tr>
                    {stat.sgvmD ? stat.sgvmD.map((entry, i) => (
                        <tr>
                            <>
                                {(
                                    <td>
                                        <strong>{stat.sgvmD[i]} :</strong>
                                        {stat.sgvmV[i]}
                                    </td>
                                )}
                            </>
                        </tr>
                    )) : (<></>)}
                </table>

                {stat.sgvmD ? (
                <Plot
                    data={[
                    {
                        x: stat.sgvmD.map(x => x/100000),
                        y: stat.sgvmV ,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'purple'},
                    },
                    // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={{
                        width: '8vw', 
                        height: 500, 
                        title: 'Growth of the sub greddiit in terms of members over time',
                        xaxis: {title: 'Time'},
                        yaxis: {title: 'Users'}
                    }}
                />
                ) : (<></>) }   

                <Typography variant="h5" textAlign="center">
                    Number of daily posts vs date
                </Typography>
                <table>
                        <tr>
                            <>
                                {(
                                    <td>
                                        <strong>Date :</strong>
                                        Daily posts
                                    </td>
                                )}
                            </>
                        </tr>
                    {stat.dpvdD ? stat.dpvdD.map((entry, i) => (
                        <tr>
                            <>
                                {(
                                    <td>
                                        <strong>{stat.dpvdD[i]} :</strong>
                                        {stat.dpvdV[i]}
                                    </td>
                                )}
                            </>
                        </tr>
                    )) : (<></>)}
                </table>

                {stat.dpvdD ? (
                <Plot
                    data={[
                    {
                        x: stat.dpvdD.map(x => x/100000),
                        y: stat.dpvdV ,
                        type: 'line',
                        mode: 'lines+markers',
                        marker: {color: 'purple'},
                    },
                    // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={{
                        width: '8vw', 
                        height: 500, 
                        title: 'Number of daily posts vs date',
                        xaxis: {title: 'Date'},
                        yaxis: {title: 'Daily Posts'}
                    }}
                />
                ) : (<></>) }   

                <Typography variant="h5" textAlign="center">
                    Number of daily visitors vs date
                </Typography>
                <table>
                        <tr>
                            <>
                                {(
                                    <td>
                                        <strong>Date :</strong>
                                        Daily visitors
                                    </td>
                                )}
                            </>
                        </tr>
                    {stat.dvvdD ? stat.dvvdD.map((entry, i) => (
                        <tr>
                            <>
                                {(
                                    <td>
                                        <strong>{stat.dvvdD[i]} :</strong>
                                        {stat.dvvdV[i]}
                                    </td>
                                )}
                            </>
                        </tr>
                    )) : (<></>)}
                </table>

                {stat.dvvdD ? (
                <Plot
                    data={[
                    {
                        x: stat.dvvdD.map(x => x/100000),
                        y: stat.dvvdV ,
                        type: 'line',
                        mode: 'lines+markers',
                        marker: {color: 'purple'},
                    },
                    // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={{
                        width: '8vw', 
                        height: 500, 
                        title: 'Number of daily visitors vs date',
                        xaxis: {title: 'Date'},
                        yaxis: {title: 'Visitors'}
                    }}
                />
                ) : (<></>) }   

                <Typography variant="h5" textAlign="center">
                    Reported Posts : {stat ? stat.rp : ""}
                </Typography>


                <Typography variant="h5" textAlign="center">
                    Posts Actually Deleted : {stat ? stat.dp : ""}
                </Typography>


                <Plot
                    data={[
                    {
                        x: ["Reported Posts","Posts Actually Deleted "],
                        y: [stat ? stat.rp : 0, stat ? stat.dp : 0],
                        type: 'bar',
                        mode: 'lines+markers',
                        marker: {color: 'purple'},
                    },
                    // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={ {width: '8vw', height: 500, title: 'A Fancy Plot'} }
                />
            </Grid>
        </div>
    );
}


export default Stats;


// // import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// // import faker from 'faker';
// import { faker } from '@faker-js/faker';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' ,
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// export default function Stats() {
//   return <Line options={options} data={data} />;
// }


