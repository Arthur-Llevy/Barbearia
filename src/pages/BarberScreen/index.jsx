import { useEffect, useRef } from 'react';
import { Menu } from '../../components/Menu';
import { Footer } from '../../components/Footer';
import { Container } from '../../GlobalStyles';
import { BarberScreenContainer } from './BarberScreenStyles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const BarberScreen = () => {

	const APIURL = import.meta.env.VITE_API_URL;
	document.title = 'GSB | Dashboard';

	let navigater = useNavigate();
	const navigate = (url) => {
		navigater(url);
	};

	let welcomeText = useRef();

	useEffect(() => {
		fetch(`${APIURL}/dadosBarbeiro`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'token': localStorage.getItem('token')
			}
		})
		.then(response => response.json())
		.then(data => {
			welcomeText.current.innerHTML = `Seja bem-vindo ${data.name}!`
		});

	})

	return(
		<>
			<Container>
				<Menu menuType="barberMenu" />
				<BarberScreenContainer>
					<p ref={welcomeText}>Carregando...</p> 
					<button onClick={() => navigate('/cadastrarCliente')} >Cadastrar Cliente</button>
					<button onClick={() => navigate('/adicionarCorte')}>Adicionar Corte a um cliente</button>
					<button onClick={() => navigate('/procurarCliente')}>Procurar Cliente</button>
				</BarberScreenContainer>
				<Footer />
			</Container>
		</>
	);
};