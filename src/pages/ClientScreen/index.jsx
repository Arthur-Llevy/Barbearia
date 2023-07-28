import { Menu } from '../../components/Menu';
import { Footer } from '../../components/Footer';
import { Container } from '../../GlobalStyles.js';
import { ClientScreenContainer } from './ClientScreenStyles';
import { FaStar } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const ClientScreen = () => {	
	
	document.title = 'GSB | Dashboard';
	const APIURL = import.meta.env.VITE_API_URL;
		
	let [amountCuts, setAmountCuts] = useState('');
	let textDatasClient = useRef();
	let stars = [];
	let restOfstars = [];
	
	useEffect(() => {
		axios.post(`${APIURL}/dadosCliente`, {}, {
			headers: {
				'Content-Type': 'application/json',
				'token': localStorage.getItem('token')
			}
		})
		.then(response => {
			if(response.data.cuts >= 6){
				textDatasClient.current.innerHTML = `${response.data.name}, você já possui ${response.data.cuts} cortes, informe ao barbeiro para ganhar o próximo corte de graça.`;	
				setAmountCuts(response.data.cuts);
			}else {
				textDatasClient.current.innerHTML = `${response.data.name}, você possui ${response.data.cuts} cortes, complete 6 para ganhar 1 corte de graça.`;	
				setAmountCuts(response.data.cuts);
			};

		})
		.catch(() => {
			alert('Erro ao procurar dados do cliente.');
			window.location.href = '/loginCliente';
		});		
	}, [APIURL]);

	const addCut = async () => {		
		if(window.confirm('Tem certeza que deseja solicitar um corte?')){
			axios.post(`${APIURL}/cliente/solicitarCorte`, {}, {
				headers: {
					'Content-Type': 'application/json',
					'token': localStorage.getItem('token')
				}
			})
			.then(response => {
				alert(response.data.message);
			})
			.catch(() => alert('Falha ao solicitar corte ao barbeiro. Tente novamente mais tarde.'))				
		};
	};

	const renderStars = () => {  
		for (let i = 0; i < amountCuts; i++) {	  	
			if(stars.length > 6){
				break
			}else {
		  		stars.push(<FaStar className="star-icon" key={i} color="yellow" />);
			};
		};

		return stars;
	};

	const completeStars = () => {			
			for(let i = 0; i < 6 - stars.length; i++){
				restOfstars.push(<FaStar className="star-icon" key={i} color="gray" />);
			}		
		return restOfstars;
	};

	return(
		<>
			<Container>		
				<Menu menuType="clientMenu" />
				<ClientScreenContainer>
					<h2>Cliente</h2>
					<h3 ref={textDatasClient}>Carregando...</h3>
					<div className="stars">			
					{
					  amountCuts !== '' ? (
					    <>
					      {renderStars()}
					      {completeStars()}
					    </>
					  ) : null
					}							
					</div>
					<button onClick={addCut} >Solicitar Corte</button>				
					<Footer className="star-icon" />
				</ClientScreenContainer>
			</Container>
		</>
	);	

};

