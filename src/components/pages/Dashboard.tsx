import React, {useEffect} from 'react';

import {Container, Card, CardHeader, CardContent, Box, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {VictoryBar, VictoryChart, VictoryAxis,
  VictoryStack, VictoryTheme} from 'victory';

import {useAuthSelector} from '../../state/auth/selector';
import {inventoryDispatchers} from '../../state/inventory/dispatchers';
// import {InventoryDispatcherName} from '../../state/inventory/name' ;
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

const InventoryBarGraph = () => {
  const {inventory} = useInventorySelector();
  console.log(inventory);

  const getNames = () => {
    const names: string[] = [];
    inventory.forEach((ele) => {
      names.push(ele.name);
    });
    console.log(names);
    return names;
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
        <VictoryStack colorScale="cool">
          <VictoryBar
            data={inventory}
            x="name"
            y="amountInStockPercentage"
          />
          <VictoryBar
            data={inventory}
            x="name"
            y="amountInProgressPercentage"
          />
        </VictoryStack>
      </VictoryChart>
    </>
  );
};

// const TotalPurchases = () => {
//   const classes = useStyles();
//   const total = [
//     {x: '1', y: 50, label: 'salt'},
//     {x: '2', y: 80, label: 'pepper'},
//     {x: '3', y: 90, label: 'almonds'},
//   ];
//   return (
//     <Card elevation={3} variant="outlined" className={classes.totalFlex}>
//       <CardHeader
//         disableTypography={true}
//         className={classes.totalLabels}
//         title={
//           <Typography variant="h4">
//               Total Purchases: $500,000
//           </Typography>
//         }
//         subheader={
//           <Typography variant="h6">
//               For April
//           </Typography>
//         }
//       />
//       <CardContent >
//         <VictoryPie
//           theme={VictoryTheme.material}
//           colorScale="cool"
//           animate={{duration: 500}}
//           width={200} height={200}
//           innerRadius={65}
//           labelComponent={<VictoryTooltip/>}
//           data={total}
//         />
//       </CardContent>
//     </Card>
//   );
// };
export const Dashboard = () => {
  const classes = useStyles();
  const {user} = useAuthSelector();
  const dispatch = useDispatch();

  const {inventory} = useInventorySelector();
  console.log(inventory);

  useEffect(() => {
    if (user != null) {
      dispatch(inventoryDispatchers.loadInventory(user.id));
    }
  }, []);

  return (
    <Container className={classes.cardScale}>
      {user?.firstName?
        <Typography variant="h2">Welcome Back {user.firstName}</Typography> :
        <Typography variant="h2">Welcome Back User</Typography>
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
              <InventoryBarGraph/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
        </Grid>

      </Grid>

    </Container>
  );
};
