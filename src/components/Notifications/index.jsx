import { NotificationContainer, Notification } from './NotificationsStyles';
import { BsCheck, BsTrash3Fill } from 'react-icons/bs';
import axios from 'axios';

export const Notifications = ({ notificationsTo, notifications }) => {

	const APIURL = import.meta.env.VITE_API_URL;
	
	const handleConfirmCut = async (clientId, id) => {
		if(window.confirm('Tem certeza que deseja confirmar o corte do cliente?')){
			axios.patch(`${APIURL}/barbeiro/confirmarSolicitacao`, {
				clientId: clientId,
				id: id
			}, {
			headers: {
				'Content-Type': 'application/json',
				'token': localStorage.getItem('token')
			}
			})
			.then(response => alert(response.data.message))
			.catch(() => alert('Falha ao confirmar o corte. Tente novamente mais tarde.'))
		};
	};

	const handleDeleteNotification = async (whoDelete, id) => {
		if(whoDelete === 'barber'){
			if(window.confirm('Tem certeza que deseja excluir esta notificação?')){
				fetch(`${APIURL}/barbeiro/excluirNotificacao`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'token': localStorage.getItem('token')
					},
					body: JSON.stringify({ id })
				})
				.then(response => response.json())
				.then(data => alert(data.message))
			 	.catch(() => alert('Falha ao excluir a notificação. Tente novamente mais tarde.'))			
			 };
		}else if(whoDelete === 'client'){
			if(window.confirm('Tem certeza que deseja excluir esta notificação?')){
				fetch(`${APIURL}/cliente/excluirNotificacao`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'token': localStorage.getItem('token')
					},
					body: JSON.stringify({ id })
				})
				.then(response => response.json())
				.then(data => alert(data.message))
			 	.catch(() => alert('Falha ao excluir a notificação. Tente novamente mais tarde.'))		
			 };
		}
	};

	return(
		<>
			<NotificationContainer>				
				{notifications.map((item, index) =>
						(
						<Notification key={index}>
						{notificationsTo === 'barber' ?
							 <p onClick={() => handleConfirmCut(item.clientId, item.id)}>Solicitação de corte do cliente {item.name} {item.time}</p>
							: 
							<p>Solicitação de corte do cliente {item.name} {item.time}</p>
						}							
							{item.requestConfirm ? <BsCheck className="checked"/> : <BsCheck className="notChecked"/>}
							{notificationsTo === 'barber' ?
								<BsTrash3Fill onClick={() => handleDeleteNotification('barber',item.id)} className="trash-icon"/>
								:
								<BsTrash3Fill onClick={() => handleDeleteNotification('client', item.id)} className="trash-icon"/>
							}
						</Notification>
						)
					)
				}
			</NotificationContainer>
		</>
	)
}