import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
			<Navbar />
			<main className=' '>{children}</main>
			<Footer/>
		</div>
	);
};
export default Layout;
