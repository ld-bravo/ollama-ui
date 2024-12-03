import SideBar from '../SideBar/SideBar';
import "./AppLayout.scss";

const AppLayout = ({ children }: { children: any }) => {
  return (
    <div className="app-layout">
      <SideBar />
      <div className="content">
        {children}
      </div>
    </div>
  )
}

export default AppLayout;