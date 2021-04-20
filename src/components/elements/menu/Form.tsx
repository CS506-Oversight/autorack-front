import React from 'react';

import Grid from '@material-ui/core/Grid';

import {Ingredient} from '../../../state/ingredient/data';
import {ingredientDispatchers} from '../../../state/ingredient/dispatchers';
import {useIngredientSelector} from '../../../state/ingredient/selector';
import {Menu} from '../../../state/menu/data';
import {ItemManagement} from '../../pages/base/management/ItemManagement';
import {ManagementFormState} from '../../pages/base/management/type';
import {IngredientList} from '../ingredient/List';
import UIInput from '../ui/Input';


type MenuFormProps<T extends Menu> = {
  menu: T,
  setMenu: (newMenu: T) => void,
}

export const MenuForm = <T extends Menu>(
  {menu, setMenu}: MenuFormProps<T>,
) => {
  const ingredientState = useIngredientSelector();

  const [managementState, setManagementState] = React.useState<ManagementFormState<Ingredient>>({
    options: ingredientState.ingredients,
    onForm: menu.ingredients,
  });

  const updateManagementState = (newIngredients: ManagementFormState<Ingredient>) => {
    setManagementState({
      ...managementState,
      onForm: newIngredients.onForm,
    });
    setMenu({
      ...menu,
      ingredients: newIngredients.onForm,
    });
  };

  return (
    <Grid container item spacing={3}>
      <Grid item xs={12} md={6}>
        <UIInput
          name="name"
          value={menu.name}
          onValueChanged={(val) => setMenu({...menu, name: val})}
          label="Menu Name"
        />
        <UIInput
          name="description"
          value={menu.description}
          onValueChanged={(val) => setMenu({...menu, description: val})}
          label="Menu Description"
        />
        <UIInput
          name="price"
          value={menu.price}
          onValueChanged={(val) => setMenu({...menu, price: val})}
          label="Price"
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ItemManagement
          initialOptions={ingredientState.ingredients}
          initialState={ingredientState}
          loadDispatcher={ingredientDispatchers.loadIngredient}
          getInitialStateItems={(state) => state.ingredients}
          selectLabel="Select Ingredient"
          renderItemList={(managementState, setItemByIndex, onDelete) => (
            <IngredientList
              ingredients={managementState.onForm}
              setIngredients={setItemByIndex}
              onDelete={onDelete}
            />
          )}
          useManagementState={[managementState, updateManagementState]}
        />
      </Grid>
    </Grid>
  );
};
