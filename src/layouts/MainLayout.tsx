import { Outlet } from "react-router";


const MainLayout = () => {

  return (
    <div className="flex h-screen">
      <h1>Hello world</h1>
      <Outlet/>
    </div>
  );
};

export default MainLayout;
