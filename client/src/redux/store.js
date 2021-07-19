// The store is what holds the all application's state data and state updates.
// The store handles state update by passing the current state and action through a single reducer


import {createStore, applyMiddleware} from 'redux'

import thunk from 'redux-thunk'

import singleRootReducer from './reducers/index'
import {composeWithDevTools} from 'redux-devtools-extension'
import { Provider } from 'react-redux'

const store= createStore(
    singleRootReducer,
    composeWithDevTools(applyMiddleware(thunk))

)

const DataProvider=({children})=>{
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
export default DataProvider