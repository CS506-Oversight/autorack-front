
import React from 'react';

import {makeStyles} from '@material-ui/core';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryLabel} from 'victory';

import {Ingredient, measureData} from '../../../state/ingredient/data';

export type StackedBarGraphProps = {
    title: string,
    xAxis: Array<any>,
    xAxisFormat: Array<string>,
    yAxis: any,
    data: Array<any>,
}
export const BarGraph = (props: StackedBarGraphProps) => {
  return (
    <VictoryChart
      height={250}
      width={500}
      domainPadding={30}
      theme={VictoryTheme.material}
      animate={{duration: 500}}
    >
      <VictoryLabel x={45} y={24} text={props.title}/>
      <VictoryAxis
        tickValues={props.xAxis}
        tickFormat={props.xAxisFormat}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={props.yAxis}
      />

    </VictoryChart>
  );
};
