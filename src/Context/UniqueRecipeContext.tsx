import { createContext } from 'react';
import {  DataType, FavoriteType } from '../types/type';


type UniqueRecipeContextType = {
    onSetRecipeDetail: (recipe: DataType) => void;
    recipeDetail: DataType,
    store: FavoriteType[],
    onSetStore: (store: FavoriteType[]) => void
}


const UniqueRecipeContext = createContext({} as UniqueRecipeContextType);

export default UniqueRecipeContext;