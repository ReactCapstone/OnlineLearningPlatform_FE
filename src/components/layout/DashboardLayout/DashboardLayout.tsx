import {ReactNode} from 'react';    
import Sidebar from '../Sidebar/sidebar';
import Header from '../Header/Header';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

interface Props {
    children: ReactNode;
}

const DashboardLayout = ({children}: Props) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
        <div className="w-64 shrink-0">
            <Sidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <Header />
            <Breadcrumb />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    </div>
  )
}

export default DashboardLayout;