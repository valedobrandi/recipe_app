import { createContext } from 'react';
import { FavoriteType } from '../types/type';

type LocalStoreType = {
    favoriteRecipesStore: FavoriteType[];
    doneRecipesStore: FavoriteType[];
    UserStore: {email: string};
    setUserStore: (store: {email: string}) => void
    setfavoriteRecipesStore: (store: FavoriteType[]) => void;
    setDoneRecipesStore: (store: FavoriteType[]) => void;
    userClear: () => void;
}


const LocalStoreContext = createContext({} as LocalStoreType);

export default LocalStoreContext;