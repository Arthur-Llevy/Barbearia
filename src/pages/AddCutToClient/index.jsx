import { Menu } from '../../components/Menu';
import { Footer } from '../../components/Footer';
import { AddCutToClientContainer } from './AddCutToClientStyles';
import { Container } from '../../GlobalStyles';
import { useState, useRef } from 'react';
import axios from 'axios';

export const AddCutToClient = () => {	

	const APIURL = import.meta.env.VITE_API_URL;
	document.title = 'GSB | Adicionar corte';

	let container = useRef();
	let [clientId, setClientId] = useState();	

	const confirm = async () => {
		axios.post(`${APIURL}/barbeiro/procurarCliente`, {
			id: textInputId.current.value
		}, {
			headers: {
				'Content-Type': 'application/json',
		    	'token': localStorage.getItem('token')
		    }
		})
		.then(response => {								
			if(window.confirm(`Tem certeza que deseja adicionar um corte ao cliente ${response.data.name} ?`)){
				handleAddCut()
			};
		})
		.catch(() => alert('Cliente não encontrado.'))
	};

	const handleAddCut = async () => {
		axios.patch(`${APIURL}/barbeiro/adicionarCorte`, {
			id: textInputId.current.value
		}, {
			headers: {
				'Content-Type': 'application/json',
				'token': localStorage.getItem('token')
			}
		})
		.then(response => alert(response.data.message))
		.catch(() => alert('Falha ao adicionar corte ao cliente. Tente novamente mais tarde.'))
	};

	return(
		<>
			<Container>
				<Menu menuType="barberMenu" />
				<AddCutToClientContainer ref={container}>
					<h2>Adicionar Corte</h2>
					<label>Id do cliente</label>
					<input onChange={e => setClientId(e.target.value)} type="text" />		
					<button onClick={confirm}>Adicionar Corte</button>
				</AddCutToClientContainer>			
				<Footer />
			</Container>
		</>
	);
};
