import React, {useState} from 'react';
// {usestate}

import {Container, Card, CardHeader, CardContent, CardActions, Button, Box, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {VictoryBar, VictoryChart, VictoryAxis,
  VictoryStack, VictoryTooltip, VictoryTheme, VictoryLabel, VictoryPie} from 'victory';

import {useAuthSelector} from '../../state/auth/selector';
// import {Ingredient} from '../../state/ingredient/data';


const useStyles = makeStyles(() => ({
  bg: {
    backgroundColor: '#acebfd',
  },
  graphScale: {
    maxHeight: '50%',
  },
  cardScale: {
    maxWidth: '100%',
    maxHeight: '90%',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButtons: {
    justifyContent: 'space-around',
  },
  totalFlex: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  totalLabels: {
    paddingLeft: '3em',
  },
}));

type IngedientList = {
  ingredient: string,
  usage: number,
};

const MonthlyChart = () => {
  const April = [
    {ingredient: 'lettuce', usage: 460},
    {ingredient: 'pepper', usage: 800},
    {ingredient: 'salt', usage: 900},
  ];
  const monthIngredientSort = (array: IngedientList[]) => {
    const ingridentNames: Array<string> = [];
    array.forEach((item) => {
      ingridentNames.push(item.ingredient);
    });
    console.log(ingridentNames);
    console.log(April.length);
    return ingridentNames;
  };
  return (
    <VictoryChart
      height={250}
      width={500}
      domainPadding={30}
      theme={VictoryTheme.material}
      animate={{duration: 500}}
    >
      <VictoryLabel x={45} y={24} text="This month's usage"/>
      <VictoryAxis
        tickValues={monthIngredientSort(April)}
        tickFormat={monthIngredientSort(April)}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => (x)}
      />
      <VictoryStack colorScale="cool">
        <VictoryBar
          data={April}
          x="ingredient"
          y="usage"
        />
      </VictoryStack>


    </VictoryChart>
  );
};


const WeeklyChart = () => {
  const dataHotdog = [
    {date: '4/11', usage: 200},
    {date: '4/12', usage: 70},
    {date: '4/13', usage: 50},
    {date: '4/14', usage: 150},
    {date: '4/15', usage: 60},
    {date: '4/16', usage: 30},
    {date: '4/17', usage: 10},
  ];
  const dataSalad = [
    {date: '4/11', usage: 50},
    {date: '4/12', usage: 70},
    {date: '4/13', usage: 50},
    {date: '4/14', usage: 10},
    {date: '4/15', usage: 20},
    {date: '4/16', usage: 30},
    {date: '4/17', usage: 10},
  ];
  const dataFries = [
    {date: '4/11', usage: 100},
    {date: '4/12', usage: 150},
    {date: '4/13', usage: 50},
    {date: '4/14', usage: 200},
    {date: '4/15', usage: 80},
    {date: '4/16', usage: 90},
    {date: '4/17', usage: 30},
  ];
  return (
    <VictoryChart
      height={250}
      width={500}
      domainPadding={30}
      theme={VictoryTheme.material}
      animate={{duration: 500}}>
      <VictoryLabel x={45} y={24} text="This weeks usage"/>

      <VictoryAxis
        tickValues={[1, 2, 3, 4, 5, 6, 7]}
        tickFormat={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => (x/10)}
      />
      <VictoryStack colorScale="cool">
        <VictoryBar
          data={dataHotdog}
          x="date"
          y="usage"
        />
        <VictoryBar
          data={dataSalad}
          x="date"
          y="usage"
        />
        <VictoryBar
          data={dataFries}
          x="date"
          y="usage"
        />
      </VictoryStack>
    </VictoryChart>
  );
};

const TotalPurchases = () => {
  const classes = useStyles();
  const total = [
    {x: '1', y: 50, label: 'salt'},
    {x: '2', y: 80, label: 'pepper'},
    {x: '3', y: 90, label: 'almonds'},
  ];
  return (
    <Card elevation={3} variant="outlined" className={classes.totalFlex}>
      <CardHeader
        disableTypography={true}
        className={classes.totalLabels}
        title={
          <Typography variant="h4">
              Total Purchases: $500,000
          </Typography>
        }
        subheader={
          <Typography variant="h6">
              For April
          </Typography>
        }
      />
      <CardContent >
        <VictoryPie
          theme={VictoryTheme.material}
          colorScale="cool"
          animate={{duration: 500}}
          width={200} height={200}
          innerRadius={65}
          labelComponent={<VictoryTooltip/>}
          data={total}
        />
      </CardContent>
    </Card>
  );
};
export const Dashboard = () => {
  const classes = useStyles();
  const {user} = useAuthSelector();

  const [timeFrame, setTimeFrame] = useState(false);

  const isWeekOrMonth = (boolean: any) => {
    setTimeFrame(!boolean);
  };


  return (
    <Container className={classes.cardScale}>
      {user?.firstName?
        <Typography variant="h2">Welcome Back User </Typography> :
        <Typography variant="h2">Welcome Back User</Typography>
      }

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={3} variant="outlined" className={classes.bg}>
            <Box borderBottom={1} className={classes.cardHeader}>
              <CardHeader

                disableTypography={true}
                title={
                  <Typography variant="h4">
                      Current Usage
                  </Typography>
                }
                subheader={
                  <Typography variant="h5">
                      $10,000
                  </Typography>
                }
              />
            </Box>
            <CardContent >
              <div className={classes.dateButtons}>
                <Button
                  variant="contained"
                  size="medium"
                  disabled={!timeFrame}
                  onClick={() => {
                    isWeekOrMonth(timeFrame);
                  } }
                >
                    Week
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  disabled={timeFrame}
                  onClick={() => {
                    isWeekOrMonth(timeFrame);
                  }}
                >
                  Month
                </Button>
              </div>
              {timeFrame ?
                <MonthlyChart/> : <WeeklyChart/>
              }
            </CardContent>
            <CardActions>
              <Button>More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <TotalPurchases/>
        </Grid>

      </Grid>

    </Container>
  );
};
