import { Menu } from '../../components/Menu';  
import { Footer } from '../../components/Footer';
import { Container } from '../../GlobalStyles';
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Notifications } from '../../components/Notifications/';
import { NoNotifications } from './BarberNotificationsStyles';

export const BarberNotifications = () => {

	const APIURL = import.meta.env.VITE_API_URL;
	document.title = 'GSB | Notificações';
	let [notifications, setNotifications] = useState([]);
	
	useEffect(() => {
	  axios.get(`${APIURL}/barbeiro/notificacoes`, {	    
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
	      		time: ` (${moment(item.createdAt).format('DD/MM')} às ${moment(item.createdAt).hour()}:${moment(item.createdAt).minute()})`,
	      		id: item.id
	      	}
	      });
	      setNotifications(notificationNames);	      
	     }
	    })
  		.catch(() => alert('Falha ao carregar as notificações. Tente novamente mais tarde.'));
	}, [APIURL]);		

	return(
		<>
			<Container>
				<Menu menuType="barberMenu" />
				{notifications.length === 0 ? 
					<NoNotifications className="no-notification">
						Você não possui notificações.
					</NoNotifications>
					:
					<Notifications
						notificationsTo = 'barber'
						notifications={notifications}
					/>				
				}
				<Footer />
			</Container>
		</>
	);
}