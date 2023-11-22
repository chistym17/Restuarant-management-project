import CartPage from "./CartPage";
import SideNav from "./SideNav";

const Dashboard = () => {
    return (
        <div className="flex justify-between my-10">

<div className="w-[20%]">
<SideNav></SideNav>
</div>



<div className="w-[80%] ml-5">

<CartPage></CartPage>




</div>




            
        </div>
    );
};

export default Dashboard;