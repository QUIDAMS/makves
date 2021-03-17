import React, { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { buildGradient, calcAverage, calcStddev} from "./utils.js";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const maxPv = Math.max(...data.map(i => i.pv));
const minPv = Math.min(...data.map(i => i.pv));
const maxUv = Math.max(...data.map(i => i.uv));
const minUv = Math.min(...data.map(i => i.uv));

export default class App extends PureComponent {
  render() {
    const stddevPv = calcStddev(data.map(item => item.pv));
    const stddevUv = calcStddev(data.map(item => item.uv));
    return (
      <>
        <LineChart     //график
          width={800}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1"> 
              <stop offset={`${buildGradient(maxPv, minPv, stddevPv).gradient1}`} stopColor="red" /> 
              <stop offset={`${buildGradient(maxPv, minPv, stddevPv).gradient1}`} stopColor="green" />
              <stop offset={`${buildGradient(maxPv, minPv, stddevPv).gradient2}`} stopColor="green" />
              <stop offset={`${buildGradient(maxPv, minPv, stddevPv).gradient2}`} stopColor="red" />
            </linearGradient> 
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1"> 
              <stop offset={`${buildGradient(maxUv, minUv, stddevUv).gradient1}`} stopColor="red" /> 
              <stop offset={`${buildGradient(maxUv, minUv, stddevUv).gradient1}`} stopColor="blue" />
              <stop offset={`${buildGradient(maxUv, minUv, stddevUv).gradient2}`} stopColor="blue" />
              <stop offset={`${buildGradient(maxUv, minUv, stddevUv).gradient2}`} stopColor="red" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickCount={12} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="url(#colorPv)" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="url(#colorUv)" />
        </LineChart>
      </>
    );
  }
}
