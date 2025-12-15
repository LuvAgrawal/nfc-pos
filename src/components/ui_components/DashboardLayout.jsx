import { FiArrowLeft } from "react-icons/fi"
import { Link, Outlet } from "react-router-dom"

const DashboardLayout = () => {
    const path = window.location.pathname
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="header">
                <div className="flex items-center gap-3">
                    {path != "/" &&
                        <button className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Link to={"/"}>
                                <FiArrowLeft className="size-5 font-bold text-gray-700" />
                            </Link>
                        </button>}
                    <h1 className="text-gray-900 font-medium text-2xl">
                        {path === '/' && "Search Customer"}
                        {path === '/recharge' && "Recharge Card"}
                    </h1>
                </div>
            </header>

            <main className="main">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout