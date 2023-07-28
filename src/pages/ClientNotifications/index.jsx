import { Menu } from '../../components/Menu';
import { Footer } from '../../components/Footer';
import { Container } from '../../GlobalStyles';
import { Notifications } from '../../components/Notifications';
import { BsCheck, BsTrash3Fill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { NoNotifications } from './ClientNotificationsStyles';
import moment from 'moment';
import axios from 'axios';

export const ClientNotifications = () => {

	const APIURL = import.meta.env.VITE_API_URL;
	document.title = 'GSB | Notificações';

	let [notifications, setNotifications] = useState([]);

	const handleDeleteNotification = async (id) => {
		if(window.confirm('Tem certeza que deseja excluir esta notificação?')){
			fetch(`${APIURL}/cliente/excluirNotificacao`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'token': localStorage.getItem('token')
				},
				body: JSON.stringify({id: id})
			})
				.then(response => response.json())
				.then(data => alert(data.message))
				.catch(() => alert('Falha ao excluir a notificação. Tente novamente mais tarde.'))
		}
	};

	useEffect(() => {
		axios.post(`${APIURL}/cliente/notificacoes`, {}, {
			headers: {
				'Content-Type': 'application/json',
	     		'token': localStorage.getItem('token')
			}
		})
		.then(response => {	    	
			if(response.data){	
			    const notificationNames = response.data.map(item => {
		      	return {
		      		name: item.nome,
		      		clientId: item.idCliente,
		      		requestConfirm: item.solicitacaoAceita,
		      		id: item.id,
		      		time: `(${moment(item.createdAt).format('DD/MM')} às ${moment(item.createdAt).hour()}:${moment(item.createdAt).minute()})`
		      	};
		      });
		      setNotifications(notificationNames);	      
	  		}else {
	  			return '' ;
	  		};
	    })
  		.catch(() => alert('Ocorreu um erro ao carregar as notificações, tente novamente mais tarde.'));	 
	}, [APIURL]);

	return(
		<>
			<Container>
				<Menu menuType="clientMenu" />
				{notifications.length === 0 ? 
					<NoNotifications className="no-notification">
						Você não possui notificações.
					</NoNotifications>
					:
					<Notifications
						notificationsTo = 'client'
						notifications={notifications}
					/>				
				}
				<Footer />
			</Container>
		</>
	);
};