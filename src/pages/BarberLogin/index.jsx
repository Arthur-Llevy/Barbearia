import { Menu } from '../../components/Menu';
import { Footer } from '../../components/Footer';
import { Container } from '../../GlobalStyles';
import { BarberLoginContainer } from './BarberLoginStyles';
import { firebaseVariables } from '../../services/FirebaseConfig';
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useState, useRef } from 'react';
import axios from 'axios';

export const BarberLogin = () => {

	const APIURL = import.meta.env.VITE_API_URL;
	document.title = 'GSB | Login';

	let [passwordVisible, setPasswordVisible] = useState(false);
	let textInputPassword = useRef();
	let textInputEmail = useRef();
	let container = useRef();

	const handleLogin = async () => {
		axios.post(`${APIURL}/loginBarbeiro`, {
			email: textInputEmail.current.value,
			password: textInputPassword.current.value
		}, {
			'Content-Type': 'application/json',	
		})		
		.then(response => {
			if('token' in response.data){
				localStorage.setItem('token', response.data.token);            
				window.location.href = '/barbeiro';
			}else {
				alert(response.data.message);
			};
		})
		.catch(() => {
			alert('Ocorreu um erro ao fazer login.');
		});
	};

	const changePasswordVisibility = () => {
		if(passwordVisible){
			textInputPassword.current.setAttribute('type', 'password');
			setPasswordVisible(false);
		}else {
			textInputPassword.current.setAttribute('type', 'text');
			setPasswordVisible(true);
		};
	};

	const loginWithGoogle = async () => {		
		signInWithPopup(firebaseVariables.auth, firebaseVariables.provider)
		      .then((result) => {	
		      	axios.post(`${APIURL}/googleLogin/barbeiro`, {
		      		email: result._tokenResponse.email
		      	}, {
		      		'Content-Type': 'application/json'
		      	})	 		      	
				.then(response => {						
					if(response.data.token){
						localStorage.setItem('token', response.data.token);		
						window.location.href = '/barbeiro';
					}else {
						alert(response.data.message);
					};
				})
				.catch((response) => alert('Ocorreu um erro ao tentar entrar com uma conta do Google. Tente novamente mais tarde.'))     				
		}).catch(() => {
		    alert('Falha ao fazer login com uma conta Google. Tente novamente mais tarde.');
		}); 	
	};

	return(
		<>
			<Container>
				<Menu />
				<BarberLoginContainer ref={container}>
					<h2>Barbeiro - Login</h2>
					<button className="loginWithGoogleButton" onClick={loginWithGoogle}>
						<FcGoogle />
						Entrar com o google
					</button>
					<p className="or">Ou</p>
					<label htmlFor="input-email">E-mail</label>
					<input id="input-email" ref={textInputEmail} type="text" />
					<label htmlFor='input-password' >Senha</label>
					<div className="inputPass">
						<input id="input-password" ref={textInputPassword} type="password" />	
						{!passwordVisible && <AiOutlineEye
							className='img'
							onClick={ changePasswordVisibility}/>}
						{passwordVisible && <AiOutlineEyeInvisible 
							className='img'
							onClick={ changePasswordVisibility}/>}								
					</div>
					<button className="loginButton" onClick={handleLogin}>Entrar</button>
				</BarberLoginContainer>			
				<Footer />
			</Container>
		</>
	);
}
