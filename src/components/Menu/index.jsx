import logoMenu from '../../images/logo_menu_icon.svg';
import { ContainerMenu, PopUp } from './MenuStyles';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBell } from 'react-icons/bs';
import { RxExit } from 'react-icons/rx';

export const Menu = ({ menuType }) => {

	let popUp = useRef();
	const navigater = useNavigate();

	const navigate = (url) => {
		navigater(url)
	};
	
	const logout = () => {
		localStorage.removeItem('token');
		window.location.href = '/';
	};

	if(menuType === undefined){
		return(
			<>			
				<ContainerMenu>
					<img src={logoMenu} alt="Ícone do menu"/>
					<h1>Barbearia</h1>				
					<img src={logoMenu} alt="Ícone do menu"/>								
				</ContainerMenu>
			</>
		);
	}else if(menuType === 'barberMenu'){
		return(
			<>
				<ContainerMenu>
					<img src={logoMenu} alt="Ícone do menu"/>
					<h1>Barbearia</h1>		
					<div className="iconsMenu">						
						<BsBell							
							onClick={() => navigate('/barbeiro/notificacoes')}
						/>
						<RxExit 							
							onClick={logout}
						/>
					</div>
				</ContainerMenu>
			</>
		);
	}else if(menuType === 'clientMenu'){
		return(
			<>
				<ContainerMenu>
					<img src={logoMenu} alt="Ícone do menu"/>
					<h1>Barbearia</h1>		
					<div className="iconsMenu">						
						<BsBell							
							onClick={() => navigate('/cliente/notificacoes')}
						/>
						<RxExit 							
							onClick={logout}
						/>
					</div>
				</ContainerMenu>
			</>
		);
	};
};
