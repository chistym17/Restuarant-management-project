import { useState } from "react";
import AxiosBase from "../AxiosConfig";

const GetMenu = () => {
const [menu,setmenu]=useState([])
AxiosBase.get('/menu').then(res=>setmenu(res.data))
    return menu;
       
};

export default GetMenu;