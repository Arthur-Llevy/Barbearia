import { Menu } from '../../components/Menu';
import { Footer } from '../../components/Footer';
import { Container } from '../../GlobalStyles';
import { FindClientContainer } from './FindClientStyles'
import { useState } from 'react';
import axios from 'axios';

export const FindClient = () => {	

	const APIURL = import.meta.env.VITE_API_URL;
	document.title = 'GSB | Procurar cliente';
	let [id, setId] = useState('');

	const handleFindClient = async () => {
		axios.post(`${APIURL}/barbeiro/procurarCliente`, {
			id: id
		}, {
			headers: {
				'Content-Type': 'application/json',
				'token': localStorage.getItem('token')
			}
		})
		.then(response => {
			alert(`Nome: ${response.data.name}, Id: ${response.data.id} e N° de cortes: ${response.data.cuts}`);
		})
		.catch(() => alert('Cliente não encontrado. Tente outro Id.'))		
	};

	return(
		<>
			<Container>
				<Menu menuType="barberMenu" />
				<FindClientContainer>
					<h2>Procurar cliente</h2>
					<label>Id do cliente</label>
					<input onInput={e => setId(e.target.value)} type="text" />				
					<button onClick={handleFindClient}>Procucar cliente</button>
				</FindClientContainer>			
				<Footer />
			</Container>
		</>
	);
};
