import "../../globals.css";
import Sidebar from "./components/SideBar";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
                <div className="app-layout">
                    <div>
                        <Sidebar />
                    </div>
                    <div className="content-area">
                        {children}
                    </div>
                </div>
    );
}