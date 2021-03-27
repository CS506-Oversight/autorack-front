import React, {useEffect} from 'react';
import {SelectForm} from '../elements/ingredient/SelectForm';
import {FormIngredient} from '../elements/ingredient/FormIngredient';
import {Button, Grid, Paper} from '@material-ui/core';
import {FormMenuAndIngredients} from '../elements/ingredient/FormMenuAndIngredients';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {FormShowMenu} from '../elements/ingredient/FormShowMenu';
import {FormShowIngredient} from '../elements/ingredient/FormShowIngredient';
import {FormEditIngredientPreload} from '../elements/ingredient/FormEditIngredientPreload';
import {FormConfirmationMenu} from '../elements/ingredient/FormConfirmationMenu';
import {FormConfirmationIngredient} from '../elements/ingredient/FormConfirmationIngredient';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import {IconButton} from '@material-ui/core';
// Styling
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    table: {
      minWidth: 50,
    },
    tableRow: {
      height: 50,
    },
  }),
);

// Premade arrays to simulate database data
const MenuList: Array<MenuItem> =[
  {name: 'Chicken', description: 'chicken', price: 5},
  {name: 'Rice', description: 'Rice', price: 3},
  {name: 'Steak', description: 'steak', price: 4},
  {name: 'Fries', description: 'Fries', price: 5},
];

const IngredientList: Array<Ingredient> = [
  {name: 'Butter', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Ham', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Water', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Noodles', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Tomatoes', inventory: 2, unit: 'Tbsp', price: 5.00},
];

const Measurements: Array<Measurement> = [
  {value: 'tsp', label: 'tsp'},
  {value: 'Tbsp', label: 'Tbsp'},
  {value: 'cup', label: 'cup'},
  {value: 'oz', label: 'oz'},
  {value: 'pinch', label: 'pinch'},
  {value: 'tsp', label: 'tsp'},
];


const butter:MenuIngredient = {
  name: 'Butter',
  measurement: 'Tbsp',
  amount: 5,
  menuItem: 'Chicken',
};

const ham:MenuIngredient = {
  name: 'Ham',
  measurement: 'Tbsp',
  amount: 4,
  menuItem: 'Chicken',
};

const water:MenuIngredient = {
  name: 'Water',
  measurement: 'oz',
  amount: 3,
  menuItem: 'Chicken',
};

const steak:MenuIngredient = {
  name: 'Water',
  measurement: 'oz',
  amount: 3,
  menuItem: 'Steak',
};

const MenuIngredientList: Array<MenuIngredient> = [
  butter,
  ham,
  water,
  steak,
];
// Types need to be put in another file
type FirstChoice = {
  value: string,
  label: string,
  step: number,
}

type Measurement = {
  value: string,
  label: string,
};

type MenuChoice = {
  value: string,
  label: string,
  step: number,
}

type MenuItem = {
  name: string,
  description: string,
  price: number,
}

type Ingredient = {
  name: string,
  inventory: number,
  unit: string,
  price: number,
}
type IngredientChoice = {
  value: string,
  label: string,
}

 type MenuIngredient = {
  name: string,
  measurement: string,
  amount: number,
  menuItem: string,
};

type MenuIngredientForForm = {
  name: string,
  measurement: Measurement,
  amount: number,
  value: string,
  used:boolean,
};

const maxAccordions = 10;

export const Menu = () => {
  const classes = useStyles();

  // Step Data/Functions
  const [progress, setProgress] = React.useState({
    step: 1,
  });

  const nextStep = (step: number) => {
    setProgress({
      step: step,
    });
  };

  // Accordion Data/Functions
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    if (expanded !== false) {
      updateAdjacentArray(+expanded);
      /*      updateAdjacentIngredientArray(+expanded);*/
      updateAdjacentIngredientMap(+expanded);
    }
    handleMenuItem(menuItemAdjacentArray[+panel]);
    handleMenuIngredientList(ingredientListToPageArray[+panel]);
    handleIngredientObjectList(ingredientMapArray[+panel]);
    setExpanded(isExpanded ? panel : false);
  };

  const [itemsToShow, setItemsToShow] = React.useState<number>(1);

  const addItemToShow = async (): Promise<void> => {
    if (itemsToShow <= maxAccordions) {
      if (expanded !== false) {
        updateAdjacentArray(+expanded);
        /*        updateAdjacentIngredientArray(+expanded);*/
        updateAdjacentIngredientMap(+expanded);
      }
      /*      console.log(menuItemAdjacentArray);*/
      handleMenuItem(menuItemAdjacentArray[itemsToShow]);
      handleMenuIngredientList(ingredientListToPageArray[itemsToShow]);
      handleIngredientObjectList(ingredientMapArray[itemsToShow]);
      await setItemsToShow(itemsToShow+1);
    }
  };

  useEffect(() => {
    if (expanded !== false) {
      handleMenuItem(menuItemAdjacentArray[+expanded]);
      handleMenuIngredientList(ingredientListToPageArray[+expanded]);
      handleIngredientObjectList(ingredientMapArray[+expanded]);
    }
  }, [itemsToShow]);

  // MenuArrays for Accordion Data

  const [menuItemAdjacentArray, setMenuItemAdjacentArray] = React.useState<Array<MenuItem>>([]);

  const initializeAdjacentArray = async (): Promise<void> => {
    setItemsToShow(1);
    while (menuItemAdjacentArray.length != 0) {
      menuItemAdjacentArray.pop();
    }
    const tempArray = menuItemAdjacentArray;
    for (let i =0; i <= maxAccordions; i++) {
      const newMenuItem:MenuItem = {
        name: '',
        description: '',
        price: 0,
      };
      tempArray.push(newMenuItem);
    }
    setMenuItemAdjacentArray(tempArray);
  };

  const updateAdjacentArray = (index: number) => {
    const tempArray:Array<MenuItem> = ([]);
    for (const item of menuItemAdjacentArray) {
      tempArray.push(item);
    }
    tempArray[index] = menuItem;
    setMenuItemAdjacentArray(tempArray);
  };

  const deleteFromAdjacentArray = (index: number) => {
    const tempArray:Array<MenuItem> = ([]);
    const newMenuItem:MenuItem = {
      name: '',
      description: '',
      price: 0,
    };
    for (let i=0; i<index; i++) {
      const changeMenuitem:MenuItem = {
        name: menuItemAdjacentArray[i].name,
        description: menuItemAdjacentArray[i].description,
        price: menuItemAdjacentArray[i].price,
      };
      tempArray.push(changeMenuitem);
    }
    for (let i=index; i<menuItemAdjacentArray.length-1; i++) {
      const changeMenuitem:MenuItem = {
        name: menuItemAdjacentArray[i+1].name,
        description: menuItemAdjacentArray[i+1].description,
        price: menuItemAdjacentArray[i+1].price,
      };
      tempArray.push(changeMenuitem);
    }
    tempArray.push(newMenuItem);
    setMenuItemAdjacentArray(tempArray);
    handleMenuItem(menuItemAdjacentArray[index]);
    setItemsToShow(itemsToShow-1);
  };
  // Final Array of Menu Items to go to database/Confirm
  const [menuItemFinalArray, setMenuItemFinalArray] = React.useState<Array<MenuItem>>([]);

  const updateFinalArray = () => {
    /*    while (menuItemFinalArray.length != 0) {
      menuItemFinalArray.pop();
    }*/
    const tempArray:Array<MenuItem> = ([]);
    /*    const tempArray = menuItemFinalArray;*/
    if (menuItemAdjacentArray.length!= 0) {
      for (let i = 0; i< itemsToShow; i++) {
        tempArray.push(menuItemAdjacentArray[i]);
      }
    }
    setMenuItemFinalArray(tempArray);
  };

  // State for first option

  const [selected, setSelected] = React.useState<FirstChoice>({
    value: '',
    label: 'Select Option',
    step: progress.step,
  });


  const handleSelect = (selectedOption: FirstChoice | null) => {
    if (!selectedOption) {
      return;
    }
    setSelected(selectedOption);

    if (selectedOption.value === 'Menu') {
      // set all states to normal
      setInitialized(false);
      initializeAdjacentArray();
      makeIngredientMapToPage();
      const defaultMenuItem : MenuItem = {
        name: '',
        description: '',
        price: 0,
      };
      handleMenuItem(defaultMenuItem);
    } else if (selectedOption.value === 'Ingredient') {
      const defaultIngredientItem : Ingredient = {
        name: '',
        inventory: 0,
        unit: '',
        price: 0,
      };
      handleIngredient(defaultIngredientItem);
    } else if (selectedOption.value === 'Edit Menu Item') {
      const defaultShowMenu : MenuChoice = {
        value: '',
        label: 'Select a Menu Item',
        step: 4,
      };
      handleShowMenuItem(defaultShowMenu);
    } else if (selectedOption.value === 'Edit Ingredient Item') {
      const defaultShowIngredient : IngredientChoice = {
        value: '',
        label: 'Select an Ingredient',
      };
      handleShowIngredientItem(defaultShowIngredient);
    }
  };

  const [menuItem, setMenuItem] = React.useState<MenuItem>({
    name: '',
    description: '',
    price: 0,
  });


  const handleMenuItem = (item: MenuItem) => {
    setMenuItem(item);
  };

  // waterfall updates of menu item management
  useEffect(() => {
    if (expanded !== false) {
      updateAdjacentArray(+expanded);
    }

    /*    console.log(menuItem);*/
  }, [menuItem]);

  useEffect(() => {
    updateFinalArray();
    /*    console.log(menuItemAdjacentArray);*/
  }, [menuItemAdjacentArray]);

  useEffect(() => {
    /*    console.log(menuItemFinalArray);*/
  }, [menuItemFinalArray]);


  // Ingredient data/states
  const [ingredientItem, setIngredientItem] = React.useState<Ingredient>({
    name: '',
    inventory: 0,
    unit: '',
    price: 0,
  });

  const handleIngredient = (item: Ingredient) => {
    setIngredientItem(item);
  };

  // Selection of a menu item
  const [showMenuItem, setShowMenuItem] = React.useState<MenuChoice>({
    value: '',
    label: 'Select a Menu Item',
    step: 4,
  });

  const handleShowMenuItem = (menuOption: MenuChoice | null) => {
    if (!menuOption) {
      return;
    }
    setShowMenuItem(menuOption);
    for (const listObj of MenuList) {
      if (menuOption.value === listObj.name) {
        setMenuItem(listObj);
      }
    }
  };

  // selection of an ingredient
  const [showIngredientItem, setShowIngredientItem] = React.useState<IngredientChoice>({
    value: '',
    label: 'Select an Ingredient',
  });

  const handleShowIngredientItem = async (ingredientOption: IngredientChoice | null): Promise<void> => {
    if (!ingredientOption) {
      return;
    }
    await setShowIngredientItem(ingredientOption);

    for (const listThing of IngredientList) {
      if (ingredientOption.value === listThing.name) {
        await setIngredientItem(listThing);
      }
    }
  };


  // Final Menu-Ingredient Array
  const [menuIngredientArray, setMenuIngredientArray] = React.useState<Array<MenuIngredient>>(MenuIngredientList);


  const handleMenuIngredientRelation = (placeArray:Array<MenuIngredient>) => {
    setMenuIngredientArray(placeArray);
  };
  /*  const ingredientObjectList = new Map<string, MenuIngredientForForm>();*/
  const [ingredientObjectList, setIngredientObjectList] = React.useState<Map<string, MenuIngredientForForm>>(
    new Map<string, MenuIngredientForForm>(),
  );

  const handleIngredientObjectList = (item:Map<string, MenuIngredientForForm>) => {
    const tempMap = new Map<string, MenuIngredientForForm>();
    item.forEach((value: MenuIngredientForForm, key: string) => {
      tempMap.set(key, value);
    });
    setIngredientObjectList(tempMap);
  };


  // More complex functions for ingredient mapping
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const makeIngredientMapToPage = () => {
    const tempMap = new Map<string, MenuIngredientForForm>();
    for (const item of IngredientList) {
      let eqMenuItem = false;
      for (const data of menuIngredientArray) {
        if ((data.menuItem === menuItem.name) && (data.name === item.name)) {
          eqMenuItem = true;
          const toArray: MenuIngredientForForm = {
            name: data.name,
            measurement: {value: data.measurement, label: data.measurement},
            amount: data.amount,
            value: data.name,
            used: true,
          };
          tempMap.set(item.name, toArray);
        }
      }
      if (!eqMenuItem) {
        const toArray: MenuIngredientForForm = {
          name: item.name,
          measurement: {value: '', label: 'Select...'},
          amount: 0,
          value: item.name,
          used: false,
        };
        tempMap.set(item.name, toArray);
      }
    }
    return tempMap;
  };

  const [ingredientMapArray, setIngredientMapArray] =
      React.useState<Array<Map<string, MenuIngredientForForm>>>([]);


  const initializeAdjacentIngredientMap = () => {
    while (ingredientMapArray.length != 0) {
      ingredientMapArray.pop();
    }
    const tempArray:Array<Map<string, MenuIngredientForForm>> = [];
    for (let i =0; i <= maxAccordions; i++) {
      const newArrayItem = makeIngredientMapToPage();
      tempArray.push(newArrayItem);
    }
    console.log(tempArray);
    setIngredientMapArray(tempArray);
  };

  const updateAdjacentIngredientMap = (index: number) => {
    console.log(ingredientMapArray);
    const tempArray:Array<Map<string, MenuIngredientForForm>> = ([]);
    for (const item of ingredientMapArray) {
      tempArray.push(item);
      /*      console.log(item);*/
    }
    tempArray[index] = ingredientObjectList;
    setIngredientMapArray(tempArray);
  };

  const [ingredientListToPage, setIngredientListToPage] = React.useState<Array<MenuIngredientForForm>>([]);

  const handleMenuIngredientList = (item:Array<MenuIngredientForForm>) => {
    setIngredientListToPage(item);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const makeIngredientListToPage = () => {
    const tempArray:Array<MenuIngredientForForm> = [];
    /*    while (ingredientListToPage.length != 0) {
      ingredientListToPage.pop();
    }*/

    ingredientObjectList.forEach((value: MenuIngredientForForm) => {
      tempArray.push(value);
    },
    );
    tempArray.sort((a, b) =>
      (a.name>b.name) ? 1: -1);

    setIngredientListToPage(tempArray);
    return tempArray;
    console.log(tempArray);
  };


  // constant data types - need to be turned into states

  const [ingredientListToPageArray, setIngredientListToPageArray] =
      React.useState<Array<Array<MenuIngredientForForm>>>([]);

  const [initialized, setInitialized] = React.useState<boolean>(false);


  const initializeAdjacentIngredientArray = () => {
    setInitialized(true);


    while (ingredientListToPageArray.length != 0) {
      ingredientListToPageArray.pop();
    }
    const tempArray = ingredientListToPageArray;
    for (let i =0; i <= maxAccordions; i++) {
      const newArrayItem = makeIngredientListToPage();
      tempArray.push(newArrayItem);
    }
    setIngredientListToPageArray(tempArray);
  };

  const updateAdjacentIngredientArray = () => {
    const tempArray:Array<Array<MenuIngredientForForm>> = ([]);
    for (const item of ingredientMapArray) {
      const innerArray:Array<MenuIngredientForForm> = [];
      item.forEach((value: MenuIngredientForForm) => {
        innerArray.push(value);
      });
      tempArray.push(innerArray);
    }
    setIngredientListToPageArray(tempArray);
    console.log(tempArray);
  };

  const deleteFromIngredientMap = (index: number) => {
    const tempArray:Array<Map<string, MenuIngredientForForm>> = [];
    const tempMap = new Map<string, MenuIngredientForForm>();
    for (const item of IngredientList) {
      const toArray: MenuIngredientForForm = {
        name: item.name,
        measurement: {value: '', label: 'Select...'},
        amount: 0,
        value: item.name,
        used: false,
      };
      tempMap.set(item.name, toArray);
    }
    for (let i=0; i<index; i++) {
      tempArray[i] = (ingredientMapArray[i]);
    }
    for (let i=index; i<ingredientMapArray.length-1; i++) {
      tempArray[i] = (ingredientMapArray[i+1]);
    }
    tempArray.push(tempMap);
    setIngredientMapArray(tempArray);
  };


  useEffect(() => {
    console.log(menuItem);
  }, [menuItem]);

  useEffect(() => {
    if (!initialized) {
      makeIngredientListToPage();
    }
    console.log(ingredientObjectList);
  }, [ingredientObjectList]);

  useEffect(() => {
    if (!initialized) {
      initializeAdjacentIngredientArray();
      initializeAdjacentIngredientMap();
    }
    console.log(ingredientListToPage);
  }, [ingredientListToPage]);

  useEffect(() => {
    console.log(ingredientListToPageArray);
  }, [ingredientListToPageArray]);
  useEffect(() => {
    updateAdjacentIngredientArray();
    console.log(ingredientMapArray);
  }, [ingredientMapArray]);


  const checkIngredientFill = () => {
    let consoleLine = 'These ingredients need to be completed: \n';
    let isAccepted = true;
    const tempArray :Array<MenuIngredient>= menuIngredientArray;
    /*    while (tempArray.length != 0) {
      tempArray.pop();
    }*/
    ingredientObjectList.forEach((value: MenuIngredientForForm, key: string) => {
      let isInArray = false;
      /*      console.log(key, value);*/
      if (value.used) {
        if ((value.measurement === {value: '', label: 'Select...'}) || (value.amount == 0)) {
          isAccepted = false;
          consoleLine += key;
          consoleLine +='\n';
        } else {
          const menuObj :MenuIngredient = {
            name: value.name,
            measurement: value.measurement.value,
            amount: value.amount,
            menuItem: menuItem.name,
          };
          for (let i = 0; i<tempArray.length; i++) {
            if (tempArray[i].name === menuObj.name && tempArray[i].menuItem===menuObj.menuItem) {
              tempArray[i] = menuObj;
              isInArray = true;
            }
          }
          if (!isInArray) {
            tempArray.push(menuObj);
          }
        }
      }
    });
    if (!isAccepted) {
      alert(consoleLine);
    } else {
      handleMenuIngredientRelation(tempArray);
    }
    /*    console.log(menuIngredientArray);*/
    return isAccepted;
  };


  switch (progress.step) {
  case 1:
    return (
      <Paper elevation={3}>
        <SelectForm
          nextStep={nextStep}
          handleSelect={handleSelect}
          selection = {selected}
        />
      </Paper>
    );
  case 2:

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={10}>
            {menuItemAdjacentArray.map((item:MenuItem, index:number) =>

              (index < itemsToShow) ?
                <Accordion
                  key={index}
                  expanded={expanded === index.toString()}
                  onChange={handleAccordionChange(index.toString())}
                >
                  {/*                  {console.log(index)}*/}

                  <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                    <Typography className={classes.heading}>{index}</Typography>
                    <Typography className={classes.secondaryHeading}>{(item.name === '') ?
                      'New Menu Item' : item.name}</Typography>

                  </AccordionSummary>
                  <AccordionDetails>

                    <FormMenuAndIngredients
                      nextStep={nextStep}
                      forStep={10}
                      backStep={1}
                      newIng={6}
                      handleMenuItem={handleMenuItem}
                      menuItem={item}
                      Measurements={Measurements}
                      IngredientListToPage={ingredientListToPage}
                      IngredientObjectList={ingredientObjectList}
                      handleIngredientObjectList={handleIngredientObjectList}

                    />
                  </AccordionDetails>

                </Accordion> : null,
            )}
          </Grid>
          <Grid item xs={12} sm={2}>
            <Paper elevation={3}>
              <Table className={classes.table} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Added Menu Items</TableCell>

                  </TableRow>
                </TableHead>

                {menuItemFinalArray.map((item:MenuItem, index:number) =>
                  <TableBody key = {index}>
                    <TableRow>
                      <TableCell align="right">{item.name}
                        <IconButton color="primary" onClick={() => {
                          deleteFromAdjacentArray(index);
                          deleteFromIngredientMap(index);
                        }}>
                          <ClearIcon/>
                        </IconButton></TableCell>
                    </TableRow>
                  </TableBody>,
                )}

              </Table>
            </Paper>
          </Grid>
        </Grid>
        <Button
          variant='contained'
          color='primary'
          style={styles.button}
          onClick={function() {
            if (menuItem.name === '') {
              alert('Please fill in name field');
            } else if (menuItem.description === '') {
              alert('Please fill in description field');
            } else if (isNaN(menuItem.price)) {
              alert('The price must be a number');
            } else if (!checkIngredientFill()) {

            } else {
              nextStep(10); // needs to be set
              handleMenuItem(menuItem);
              handleMenuIngredientRelation(menuIngredientArray);
            }
          }}>
          Continue
        </Button>
        <Button
          variant='contained'
          color='primary'
          style={styles.button}
          onClick={function() {
            nextStep(1);
          }}>
          Back
        </Button>
        <Button
          variant='contained'
          color='primary'
          style={styles.button}
          onClick={function() {
            addItemToShow();
          }}>
          Add Another
        </Button>
      </div>

    );
  case 3:
    return (
      <Paper elevation={3}>
        <FormIngredient
          nextStep={nextStep}
          forStep = {13}
          backStep = {1}
          handleIngredient={handleIngredient}
          ingredientItemFromSelect={ingredientItem}
        />
      </Paper>

    );
  case 4:
    return (
      <FormShowMenu
        nextStep={nextStep}
        forStep = {5}
        backStep = {1}
        selectMenu = {showMenuItem}
        handleShowMenuItem={handleShowMenuItem}
      />
    );
  case 5:
    return (
      <FormMenuAndIngredients
        nextStep={nextStep}
        forStep = {11}
        backStep = {4}
        newIng={7}
        handleMenuItem={handleMenuItem}
        menuItem={menuItem}
        Measurements={Measurements}
        IngredientListToPage={ingredientListToPage}
        IngredientObjectList={ingredientObjectList}
        handleIngredientObjectList={handleIngredientObjectList}
      />
    );
  case 6:
    return (
      <Paper elevation={3}>
        <FormIngredient
          nextStep={nextStep}
          forStep = {12}
          backStep = {2}
          handleIngredient={handleIngredient}
          ingredientItemFromSelect={ingredientItem}
        />
      </Paper>

    );
  case 7:
    return (
      <Paper elevation={3}>
        <FormIngredient
          nextStep={nextStep}
          forStep = {14}
          backStep = {5}
          handleIngredient={handleIngredient}
          ingredientItemFromSelect={ingredientItem}
        />
      </Paper>

    );
  case 8:
    return (
      <FormShowIngredient
        nextStep={nextStep}
        forStep = {9}
        backStep = {1}
        selectIngredient= {showIngredientItem}
        handleShowIngredientItem={handleShowIngredientItem}
      />
    );

  case 9:
    return (
      <Paper elevation={3}>
        <FormEditIngredientPreload
          nextStep={nextStep}
          forStep = {15}
          backStep = {8}
          handleIngredient={handleIngredient}
          ingredientItemFromSelect={ingredientItem}
        />
      </Paper>
    );

  case 10:
    return (
      <FormConfirmationMenu
        nextStep={nextStep}
        forStep={1}
        backStep={2}
      />
    );
  case 11:
    return (
      <FormConfirmationMenu
        nextStep={nextStep}
        forStep={1}
        backStep={5}
      />
    );
    // done
  case 12:
    return (
      <FormConfirmationIngredient
        nextStep={nextStep}
        forStep={2}
        backStep = {6}
      />
    );
    // done
  case 13:
    return (
      <FormConfirmationIngredient
        nextStep={nextStep}
        forStep={1}
        backStep = {3}
      />
    );
    // done
  case 14:
    return (
      <FormConfirmationIngredient
        nextStep={nextStep}
        forStep={5}
        backStep = {7}
      />
    );
    // done
  case 15:
    return (
      <FormConfirmationIngredient
        nextStep={nextStep}
        forStep={1}
        backStep = {9}
      />
    );

  default:
    return (
      <div>
      </div>
    );
  }
};

const styles = {
  button: {
    margin: 15,
  },
};
