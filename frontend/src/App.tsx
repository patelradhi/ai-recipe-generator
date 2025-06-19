import './App.css';
import AppLayout from './layouts/app-layout';
import Home from './pages/HomePage';
import SaveRecipe from './pages/SaveRecipePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theameprovider';
import ProtectedRoute from './components/ui/protected-route';
import { ToastContainer } from 'react-toastify';
import CuisineSelectorPage from './pages/CuisineSelectorPage';

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{ path: '/', element: <CuisineSelectorPage /> },
			{
				path: '/home',
				element: <Home />,
			},
			{
				path: '/saved-recipes',
				element: (
					<ProtectedRoute>
						<SaveRecipe />
					</ProtectedRoute>
				),
			},
		],
	},
]);

function App() {
	return (
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<RouterProvider router={router}></RouterProvider>
			<ToastContainer position="top-center" autoClose={3000} />
		</ThemeProvider>
	);
}

export default App;
