import React, {useEffect} from 'react';

import {Container, Card, CardHeader, CardContent, Box, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {VictoryBar, VictoryChart, VictoryAxis,
  VictoryStack, VictoryTheme} from 'victory';

import {useAuthSelector} from '../../state/auth/selector';
import {Inventory} from '../../state/inventory/data';
import {inventoryDispatchers} from '../../state/inventory/dispatchers';
import {useInventorySelector} from '../../state/inventory/selector';
import {useDispatch} from '../../state/store';


const useStyles = makeStyles(() => ({
  bg: {
    backgroundColor: '#f8f8ff',
  },
  graphScale: {
    maxHeight: '50%',
  },
  cardScale: {
    maxWidth: '100%',
    maxHeight: '90%',
    marginTop: '8em',
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
  greeting: {
    marginBottom: '0.75em',
  },
}));

type IInventoryGraphProps = {
  inventory: Array<Inventory>,
}

const InventoryBarGraph = ({inventory}: IInventoryGraphProps) => {
  const getNames = () => {
    const names: string[] = [];
    inventory.forEach((ele) => {
      names.push(ele.name);
    });
    return names;
  };

  const colorSwitcher: any = {
    fill: (datum: any) => {
      const percentage = datum.datum._y;
      let color = 'blue';

      if (percentage > 45.0) {
        color = '#32a852';
      } if (percentage <= 45.0 && percentage >= 20.0) {
        color = '#dfe815';
      } if (percentage < 20.0) {
        color = '#e00000';
      }

      return color;
    },
    strokeWidth: 0,
  };

  return (
    <>
      <VictoryChart
        height={250}
        width={500}
        domainPadding={30}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={getNames()}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[100, 80, 60, 40, 20]}
        />
        {inventory &&
        <VictoryStack colorScale="cool">
          <VictoryBar
            animate={{
              onEnter: {
                duration: 500,
                before: () => ({
                  _y: 100,
                }),
              },
            }}
            style={{data: {...colorSwitcher}}}
            data={inventory}
            x="name"
            y="amountInStockPercentage"
          />
          <VictoryBar
            animate={{
              onEnter: {
                duration: 500,
                before: () => ({
                  _y: 100,
                }),
              },
            }}
            style={{data: {fill: '#c9c9c9'}}}
            data={inventory}
            x="name"
            y="amountInProgressPercentage"
          />
        </VictoryStack>
        }
      </VictoryChart>
    </>
  );
};

export const Dashboard = () => {
  const classes = useStyles();
  const {user} = useAuthSelector();
  const {inventory} = useInventorySelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user != null) {
      dispatch(inventoryDispatchers.loadInventory(user.id));
    }
  }, []);

  return (
    <Container className={classes.cardScale}>
      {user?.firstName?
        <Typography variant="h2" className={classes.greeting}>Welcome Back {user.firstName}</Typography> :
        <Typography variant="h2" className={classes.greeting}>Welcome Back User</Typography>
      }
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={4} variant="outlined" className={classes.bg}>
            <Box borderBottom={1} className={classes.cardHeader}>
              <CardHeader
                disableTypography={true}
                title={
                  <Typography variant="h4">
                      Current Usage
                  </Typography>
                }
              />
            </Box>
            <CardContent >
              {inventory.length > 0 && <InventoryBarGraph inventory={inventory}/>}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
        </Grid>

      </Grid>

    </Container>
  );
};
