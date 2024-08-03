import React from "react";
import { Outlet } from "react-router-dom";

function Layout(){


    return(

        <div>
        
        <div style={{ minHeight: "87vh"}}><Outlet /></div>
       

        </div>




    )
}

export default Layout;