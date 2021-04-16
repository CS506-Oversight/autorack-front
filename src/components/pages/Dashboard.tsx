import React from 'react';
// {usestate}

import {Container, Card, CardHeader, CardContent, CardActions, Button, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryLabel} from 'victory';

import {useAuthSelector} from '../../state/auth/selector';


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
}));


export const Dashboard = () => {
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
  const classes = useStyles();
  const {user} = useAuthSelector();
  return (
    <Container className={classes.cardScale}>
      {user?.firstName?
        <Typography variant="h2">Welcome Back User </Typography> :
        <Typography variant="h2">Welcome Back User</Typography>
      }

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
            <Button variant="contained" size="medium">Week</Button>
            <Button variant="contained" size="medium">Month</Button>
          </div>
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

        </CardContent>
        <CardActions>
          <Button>More</Button>
        </CardActions>
      </Card>
    </Container>
  );
};
