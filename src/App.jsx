import {Routes,Route} from 'react-router-dom' 
import ProtectedRoute from './components/ProtectedRoute'

import Login from './Pages/LoginPage'
import Edit from './Pages/EditPage'
import NotFound from './Pages/NotFound'
import BlogList from './Pages/BlogList'
import AddBlog from './Pages/AddBlog'
import SignupPage from './Pages/SignupPage'


function App(){ 

  return (
     <div className="appContainer">
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignupPage/>} />
          
          <Route path='/' element={
            <ProtectedRoute>
              <BlogList/>
            </ProtectedRoute>
          }/>

          <Route path='/add' element={
            <ProtectedRoute>
              <AddBlog/>
            </ProtectedRoute>
          }/>



          <Route path='/edit/:id' element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }/>

          <Route path='*' element={<NotFound/>}/>

        </Routes>
     </div>
  )
}

export default App