import './App.css';
import UploadPDF from './components/upload/UploadPage';
import ViewPDF from './components/view/ViewPDF';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { RouterProvider } from 'react-router-dom';
//frontend app.js 
function App() {
  let router = createBrowserRouter([
    {
      path:'',
      element:<Layout/>,
      children:[
          {
            path:'',
            element:<UploadPDF/>
          },
          {
            path:'view',
            element:<ViewPDF/>
          }
          
      ]
    }
]);
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
