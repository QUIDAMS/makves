import React from 'react';

export const buildGradient = (max, min, range) => {
    if (max-min === 0) {
      return {
        gradient1: 1,
        gradient2: 1
     }
    }

  return {
    gradient1: 1 - ((range.max - min)/(max-min)),
    gradient2: 1 - ((range.min - min)/(max-min))
  }
}

export const calcAverage = (data) => {
  const sum = data.reduce((accumulator, currentValue) => accumulator + currentValue);
  const avg = sum/data.length;

  return avg;
}

export const calcStddev = (data) => {
  const avg = calcAverage(data);
  const deviationOfEachSquared = data.map(elem => Math.pow(elem - avg, 2));
  const sumDeviationOfEachSquared = deviationOfEachSquared
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  const dispersion = Math.round(sumDeviationOfEachSquared / data.length);
  const stddev = Math.round(Math.sqrt(dispersion));

  return {
    min: avg-stddev, 
    max: avg+stddev
  }
}

