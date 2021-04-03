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
import {FormEditMenuItemPreload} from '../elements/ingredient/FormEditMenuItemPreload';
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
const MenuListTemp: Array<MenuItem> =[
  {name: 'Chicken', description: 'chicken', price: 5},
  {name: 'Rice', description: 'Rice', price: 3},
  {name: 'Steak', description: 'steak', price: 4},
  {name: 'Fries', description: 'Fries', price: 5},
];

const IngredientListTemp: Array<Ingredient> = [
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
      updateAdjacentIngredientArray(+expanded);
    }
    handleMenuItem(menuItemAdjacentArray[+panel]);
    handleMenuIngredientList(ingredientListToPageArray[+panel]);
    setExpanded(isExpanded ? panel : false);
  };

  const [itemsToShow, setItemsToShow] = React.useState<number>(1);

  const addItemToShow = async (): Promise<void> => {
    if (itemsToShow <= maxAccordions) {
      if (expanded !== false) {
        updateAdjacentArray(+expanded);
        updateAdjacentIngredientArray(+expanded);
      }
      handleMenuItem(menuItemAdjacentArray[itemsToShow]);
      handleMenuIngredientList(ingredientListToPageArray[itemsToShow]);
      await setItemsToShow(itemsToShow+1);
    }
  };

  useEffect(() => {
    if (expanded !== false) {
      handleMenuItem(menuItemAdjacentArray[+expanded]);
      handleMenuIngredientList(ingredientListToPageArray[+expanded]);
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
    setExpanded(false);
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

  const [MenuList, setMenuList] = React.useState<Array<MenuItem>>(
    MenuListTemp.sort((a, b) => (a.name > b.name) ? 1: -1));

  const updateMenuList = (placeArray:Array<MenuItem>) => {
    const tempFinalArray = [];
    for (const item of MenuList) {
      tempFinalArray.push(item);
    }
    for (const item of placeArray) {
      let inArray = false;
      for (let i = 0; i< tempFinalArray.length; i++) {
        if (item.name === tempFinalArray[i].name) {
          tempFinalArray[i] = item;
          inArray= true;
        }
      }
      if (!inArray) {
        tempFinalArray.push(item);
      }
    }
    tempFinalArray.sort((a, b) => (a.name > b.name) ? 1: -1);

    setMenuList(tempFinalArray);
  };

  // Final Array of Menu Items to go to database/Confirm
  const [menuItemFinalArray, setMenuItemFinalArray] = React.useState<Array<MenuItem>>([]);

  const updateFinalArray = () => {
    const tempArray:Array<MenuItem> = ([]);
    if (menuItemAdjacentArray.length!= 0) {
      for (let i = 0; i< itemsToShow; i++) {
        if (menuItemAdjacentArray[i].name !== '') {
          tempArray.push(menuItemAdjacentArray[i]);
        }
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
      makeIngredientListToPage();
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
      initializeAdjacentArray();
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
    if (progress.step == 4 || progress.step==1) {
      handleMenuIngredientList(makeIngredientListToPage());
      updateAdjacentArray(0);
    }
    if (progress.step == 5) {
      updateAdjacentArray(0);
    }
  }, [menuItem]);

  useEffect(() => {
    updateFinalArray();
  }, [menuItemAdjacentArray]);

  useEffect(() => {
    console.log(MenuList);
  }, [MenuList]);


  const [IngredientList, setIngredientList]= React.useState<Array<Ingredient>>(
    IngredientListTemp.sort((a, b) => (a.name > b.name) ? 1: -1));


  const updateIngredientList = (placeIngredient:Ingredient) => {
    const tempFinalArray = [];
    for (const item of IngredientList) {
      tempFinalArray.push(item);
    }
    let inArray = false;
    for (let i = 0; i< tempFinalArray.length; i++) {
      if (placeIngredient.name === tempFinalArray[i].name) {
        tempFinalArray[i] = placeIngredient;
        inArray= true;
      }
    }
    if (!inArray) {
      tempFinalArray.push(placeIngredient);
    }
    tempFinalArray.sort((a, b) => (a.name > b.name) ? 1: -1);
    setIngredientList(tempFinalArray);
  };

  useEffect(() => {
    initializeAdjacentIngredientArray();
    handleMenuIngredientList(makeIngredientListToPage());
    console.log(IngredientList);
  }, [IngredientList]);


  // Ingredient data/states
  const [ingredientItem, setIngredientItem] = React.useState<Ingredient>({
    name: '',
    inventory: 0,
    unit: '',
    price: 0,
  });

  useEffect(() => {
  }, [ingredientItem]);

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
    setInitialized(false);
    /*    initializeAdjacentArray();*/
    setShowMenuItem(menuOption);
    for (const listObj of MenuList) {
      if (menuOption.value === listObj.name) {
        setMenuItem(listObj);
      }
    }
    updateAdjacentArray(0);
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
    // Final Menu Ingredient Array
  const [menuIngredientFinalArray, setMenuIngredientFinalArray] = React.useState<
      Array<MenuIngredient>>(MenuIngredientList.sort((a, b) => (a.name > b.name) ? 1: -1));

  const updateMenuIngredientFinalArray = (placeArray:Array<MenuIngredient>) => {
    const tempFinalArray = [];
    for (const item of menuIngredientFinalArray) {
      tempFinalArray.push(item);
    }
    for (const item of placeArray) {
      let inArray = false;
      for (let i = 0; i< tempFinalArray.length; i++) {
        if (item.name === tempFinalArray[i].name &&
              item.menuItem === tempFinalArray[i].menuItem) {
          tempFinalArray[i] = item;
          inArray= true;
        }
      }
      if (!inArray) {
        tempFinalArray.push(item);
      }
    }
    tempFinalArray.sort((a, b) => (a.name > b.name) ? 1: -1);
    setMenuIngredientFinalArray(tempFinalArray);
  };

  useEffect(() => {
    console.log(menuIngredientFinalArray);
  }, [menuIngredientFinalArray]);


  // Working Menu-Ingredient Array to be sent to DB
  const [menuIngredientArray, setMenuIngredientArray] = React.useState<Array<MenuIngredient>>([]);


  const handleMenuIngredientRelation = (placeArray:Array<MenuIngredient>) => {
    const tempArray:Array<MenuIngredient> = [];

    for (const item of placeArray) {
      tempArray.push(item);
    }
    setMenuIngredientArray(tempArray);
  };


  const [ingredientListToPage, setIngredientListToPage] = React.useState<Array<MenuIngredientForForm>>([]);

  const handleMenuIngredientList = (item:Array<MenuIngredientForForm>) => {
    const tempArray:Array<MenuIngredientForForm> = [];
    for (const arrObj of item) {
      tempArray.push(arrObj);
    }
    setIngredientListToPage(tempArray);
    updateAdjacentIngredientArray(+expanded);
  };


  const makeIngredientListToPage = () => {
    const tempArray:Array<MenuIngredientForForm> = [];
    for (const item of IngredientList) {
      let eqMenuItem = false;
      for (const data of menuIngredientFinalArray) {
        if ((data.menuItem === menuItem.name) && (data.name === item.name)) {
          eqMenuItem = true;
          const toArray: MenuIngredientForForm = {
            name: data.name,
            measurement: {value: data.measurement, label: data.measurement},
            amount: data.amount,
            value: data.name,
            used: true,
          };
          tempArray.push(toArray);
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
        tempArray.push(toArray);
      }
    }
    tempArray.sort((a, b) => (a.name > b.name) ? 1: -1);
    return tempArray;
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

  const updateAdjacentIngredientArray = (index: number) => {
    const tempArray:Array<Array<MenuIngredientForForm>> = ([]);
    for (const item of ingredientListToPageArray) {
      const innerArray:Array<MenuIngredientForForm> = [];
      for (const innerItem of item) {
        innerArray.push(innerItem);
      }
      tempArray.push(innerArray);
    }
    tempArray[index] = ingredientListToPage;
    setIngredientListToPageArray(tempArray);
  };


  const deleteFromIngredientArray = (index: number) => {
    const tempArray:Array<Array<MenuIngredientForForm>> = [];
    const innerArray:Array<MenuIngredientForForm> =[];
    for (const item of IngredientList) {
      const toArray: MenuIngredientForForm = {
        name: item.name,
        measurement: {value: '', label: 'Select...'},
        amount: 0,
        value: item.name,
        used: false,
      };
      innerArray.push(toArray);
    }
    for (let i=0; i<index; i++) {
      tempArray[i] = (ingredientListToPageArray[i]);
    }
    for (let i=index; i<ingredientListToPageArray.length-1; i++) {
      tempArray[i] = (ingredientListToPageArray[i+1]);
    }
    tempArray.push(innerArray);
    setIngredientListToPageArray(tempArray);
  };


  useEffect(() => {
    if (!initialized) {
      initializeAdjacentIngredientArray();
    }
  }, [ingredientListToPage]);

  /*  useEffect(() => {
    console.log(ingredientListToPageArray);
  }, [ingredientListToPageArray]);

  useEffect(() => {
    console.log(menuIngredientArray);
  }, [menuIngredientArray]);

  useEffect(() => {
    /!*    checkIngredientFill();*!/
    /!*    console.log(menuItemAdjacentArray);*!/
  }, [menuItemAdjacentArray]);*/


  const checkIngredientFill = () => {
    let consoleLine = '';
    let isAccepted = true;
    const tempArray: Array<MenuIngredient> = menuIngredientArray;
    while (tempArray.length != 0) {
      tempArray.pop();
    }

    for (let i = 0; i < itemsToShow; i++) {
      const item = ingredientListToPageArray[i];
      consoleLine += 'These ingredients need to be completed: \n';
      for (const value of item) {
        let isInArray = false;

        if (value.used) {
          if ((value.measurement === {value: '', label: 'Select...'}) || (value.amount == 0)) {
            isAccepted = false;
            consoleLine += value.name;
            consoleLine += '\n';
          } else {
            const menuObj: MenuIngredient = {
              name: value.name,
              measurement: value.measurement.value,
              amount: value.amount,
              menuItem: menuItemAdjacentArray[i].name,
            };
            for (let i = 0; i < tempArray.length; i++) {
              if (tempArray[i].name === menuObj.name && tempArray[i].menuItem === menuObj.menuItem) {
                tempArray[i] = menuObj;
                isInArray = true;
              }
            }
            if (!isInArray) {
              tempArray.push(menuObj);
            }
          }
        }
      }
    }
    if (!isAccepted) {
      alert(consoleLine);
    } else {
      updateFinalArray();
      handleMenuIngredientRelation(tempArray);
    }
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

                  <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                    <Typography className={classes.heading}></Typography>
                    <Typography className={classes.heading}>{(item.name === '') ?
                      'New Menu Item' : item.name}</Typography>

                  </AccordionSummary>
                  <AccordionDetails>

                    <FormMenuAndIngredients
                      nextStep={nextStep}
                      newIng={6}
                      handleMenuItem={handleMenuItem}
                      menuItem={item}
                      Measurements={Measurements}
                      IngredientListToPage={ingredientListToPage}
                      handleMenuIngredientList={handleMenuIngredientList}

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
                          deleteFromIngredientArray(index);
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
            } else if (menuItem.description === '' && expanded !== false) {
              alert('Please fill in description field');
            } else if (!checkIngredientFill()) {

            } else {
              updateAdjacentIngredientArray(+expanded);
              nextStep(10); // needs to be set
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
        MenuList={MenuList}
      />
    );
  case 5:
    return (
      <FormEditMenuItemPreload
        nextStep={nextStep}
        forStep = {11}
        backStep = {4}
        newIng={7}
        handleMenuItem={handleMenuItem}
        menuItem={menuItem}
        Measurements={Measurements}
        IngredientListToPage={ingredientListToPage}
        handleMenuIngredientList={handleMenuIngredientList}
        checkIngredientFill={checkIngredientFill}
        updateAdjacentIngredientArray={ updateAdjacentIngredientArray}
        updateAdjacentArray={updateAdjacentArray}


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
        IngredientList={IngredientList}
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
        menuIngredientArray={menuIngredientArray}
        menuItemFinalArray={menuItemFinalArray}
        updateMenuIngredientFinalArray={updateMenuIngredientFinalArray}
        updateMenuList={updateMenuList}

      />
    );
  case 11:
    return (
      <FormConfirmationMenu
        nextStep={nextStep}
        forStep={1}
        backStep={5}
        menuIngredientArray={menuIngredientArray}
        menuItemFinalArray={menuItemFinalArray}
        updateMenuIngredientFinalArray={updateMenuIngredientFinalArray}
        updateMenuList={updateMenuList}

      />
    );
    // done
  case 12:
    return (
      <FormConfirmationIngredient
        nextStep={nextStep}
        forStep={2}
        backStep = {6}
        ingredientItem={ingredientItem}
        handleIngredient={handleIngredient}
        updateIngredientList={updateIngredientList}
      />
    );
    // done
  case 13:
    return (
      <FormConfirmationIngredient
        nextStep={nextStep}
        forStep={1}
        backStep = {3}
        ingredientItem={ingredientItem}
        handleIngredient={handleIngredient}
        updateIngredientList={updateIngredientList}
      />
    );
    // done
  case 14:
    return (
      <FormConfirmationIngredient
        nextStep={nextStep}
        forStep={5}
        backStep = {7}
        ingredientItem={ingredientItem}
        handleIngredient={handleIngredient}
        updateIngredientList={updateIngredientList}
      />
    );
    // done
  case 15:
    return (
      <FormConfirmationIngredient
        nextStep={nextStep}
        forStep={1}
        backStep = {9}
        ingredientItem={ingredientItem}
        handleIngredient={handleIngredient}
        updateIngredientList={updateIngredientList}
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
