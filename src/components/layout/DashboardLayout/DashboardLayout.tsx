import {ReactNode} from 'react';    
import Sidebar from '../Sidebar/sidebar';
import Header from '../Header/Header';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

interface Props {
    children: ReactNode;
}

const DashboardLayout = ({children}: Props) => {
  return (
    <div className="flex bg-gray-100">
        <Sidebar />
        <div className="flex-1">
            <Header />
            <Breadcrumb />
            <main className="p-8">
                {children}
            </main>
        </div>
    </div>
  )
}

export default DashboardLayout;