import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPAste from './components/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
          <Navbar></Navbar>
          <Home></Home>
      </div>
    },

    {
      path:"/pastes",
      element:
      <div>
        <Navbar></Navbar>
        <Paste></Paste>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar></Navbar>
        <ViewPAste></ViewPAste>
      </div>
    }
  ]
)

function App() {
  

  return (
    <>
      <div>
         <RouterProvider router = {router}/>
      </div>
    </>
  )
}

export default App
