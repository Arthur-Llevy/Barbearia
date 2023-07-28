import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage/';
import { BarberLogin } from '../pages/BarberLogin/';
import { BarberNotifications } from '../pages/BarberNotifications/';
import { ClientLogin } from '../pages/ClientLogin/';
import { RegisterClient } from '../pages/RegisterClient/';
import { BarberScreen } from '../pages/BarberScreen/';
import { AddCutToClient } from '../pages/AddCutToClient/'
import { FindClient } from '../pages/FindClient';
import { ClientScreen } from '../pages/ClientScreen/';
import { ClientNotifications } from '../pages/ClientNotifications/';
import { ForgotPassword } from '../pages/ForgotPassword/';

export const Rts = () => {
	const token = localStorage.getItem('token');		

	return(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="loginBarbeiro" element={<BarberLogin />} />
				<Route path="loginCliente" element={<ClientLogin />} />
				<Route path="cadastrarCliente" element={<RegisterClient />} />
				<Route path="barbeiro" element={token !== null ? <BarberScreen /> : <Navigate to="/loginBarbeiro" /> } />
				<Route path="adicionarCorte" element={<AddCutToClient />} />
				<Route path="procurarCliente" element={<FindClient />} />
				<Route path="cliente" element={token !== null ? <ClientScreen /> : <Navigate to="/loginCliente" />}/>
				<Route path="/barbeiro/notificacoes" element={token !== null ? <BarberNotifications /> : <Navigate to="/loginBarbeiro" />} />
				<Route path="/cliente/notificacoes" element={token !== null ? <ClientNotifications /> : <Navigate to="/loginCliente" />} />
				<Route path="/cliente/esqueceuSenha" element={<ForgotPassword />} />
			</Routes>
		</BrowserRouter>
	);	
};
