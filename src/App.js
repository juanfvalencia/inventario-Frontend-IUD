import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/ui/Header';

import { InventoryView } from './components/inventories/InventoryView';
import { MarkView } from './components/marks/MarkView';
import { StateView } from './components/states/StateView';
import { TypeView } from './components/type/TypeView';
import { UserView } from './components/users/UserView';
import { InventoryUpdate } from './components/inventories/InventoryUpdate';
import { MarkUpdate } from './components/marks/MarkUpdate';
import { StateUpdate } from './components/states/StateUpdate';
import { TypeUpdate } from './components/type/TypeUpdate';
import { UserUpdate } from './components/users/UserUpdate';

const App = () => {
  return <Router>
          <Header/>
          <Routes>
            <Route path='/' element={ <InventoryView/> }/>
            <Route path='/users' element={ <UserView/> }/>
            <Route path='/marks' element={ <MarkView/> }/>
            <Route path='/states' element={ <StateView/> }/>
            <Route path='/types' element={ <TypeView/> }/>
            <Route path='inventories/update/:inventoryId' element={ <InventoryUpdate/> }/>
            <Route path='mark/update/:markId' element={ <MarkUpdate/> }/>
            <Route path='state/update/:equipmetStateId' element={ <StateUpdate/> }/>
            <Route path='type/update/:equipmentTypeId' element={ <TypeUpdate/> }/>
            <Route path='user/update/:userId' element={ <UserUpdate/> }/> 
            <Route to='/' />
          </Routes>
        </Router>
}

export default App