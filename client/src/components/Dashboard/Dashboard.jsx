import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import NavBar from "../Shared/Navbar/Navbar";
import Container from "../Shared/Container";

const Dashboard = () => {
    return (



        <div>
            <NavBar></NavBar>


            <Container>

                <div className="flex justify-between mt-5 ">
                    <div className="w-[20%]">
                        <SideNav></SideNav>
                    </div>



                    <div className="w-[80%] ml-5">



                        <Outlet></Outlet>

                    </div>





                </div>


            </Container>






        </div>
    );
};

export default Dashboard;