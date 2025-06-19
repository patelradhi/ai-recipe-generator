import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import SyncUser from '@/components/ui/SyncUser';

function AppLayout() {
	return (
		<div className="h-screen flex flex-col over-flow-hidden">
			<Header />
			<div className="flex-1 flex flex-col overflow-y-auto">
				<SyncUser />
				<div className="flex-1 overflow-hidden">
					<Outlet />
				</div>
			</div>
			<footer className="p-3 text-center bg-gradient-to-r from-[#232946] to-[#393e46] border-t border-[#eabf70] text-white text-sm">
				Made with <span className="text-red-400">❤️</span> by{' '}
				<span className="font-semibold">Radhika Patel</span>
			</footer>
		</div>
	);
}

export default AppLayout;
