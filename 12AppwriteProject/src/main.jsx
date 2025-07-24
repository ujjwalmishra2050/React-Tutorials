import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { AddPost, AllPosts, Auth, EditPost, Login, SignUp } from './Components/indes.js'
import {Home} from './pages/Home.jsx'
import Post from './pages/Post.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    children :[
      {
        path :"/",
        element:<Home/>
      },
      {
        path:"/login",
        element :(
        <Auth authentication ={false}>
         <Login/>
        </Auth>
        )
      },
      {
      path:"/signup",
      element:(
        <Auth authentication = {false}>
        <SignUp/>
        </Auth>
      )
      },
      {
      path:"/all-posts",
      element:(
        <Auth authentication>
        <AllPosts />
        </Auth>
      )
      },
      {
        path:"/add-post",
        element:(
          <Auth authentication>
           <AddPost/>
          </Auth>
        )
      },{
        path:"/edit post : slug",
        element:(
          <Auth authentication>
           <EditPost/>
          </Auth>
        )
      },
      {
        path:"/post-slug",
        element:<Post/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store} >
      <RouterProvider router={router}/>
    <App />
    </Provider>
  </StrictMode>,
)
