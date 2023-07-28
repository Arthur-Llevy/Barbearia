import { Menu } from '../../components/Menu';
import { Footer } from '../../components/Footer';
import { Container } from '../../GlobalStyles';
import { ClientLoginContainer } from './ClientLoginStyles';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useState, useRef } from 'react';
import { firebaseVariables } from '../../services/FirebaseConfig';
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

export const ClientLogin = () => {

	const APIURL = import.meta.env.VITE_API_URL;
	document.title = 'GSB | Login';

	let [passwordVisible, setPasswordVisible] = useState(false);	
	let textInputPassword = useRef();
	let textInputEmail = useRef();

	const login = async () => {			
		axios.post(`${APIURL}/login/cliente`, {
			email: textInputEmail.current.value,
			password: textInputPassword.current.value
		}, {
			'Content-Type': 'application/json'
		})
		.then(response => { 
			if(response.data.token){
				localStorage.setItem('token', response.data.token);		
				 window.location.href = '/cliente';				
			}else {
				alert(response.data.message);
			};
		})
		.catch(() => alert('Falha ao fazer login, tente novamente mais tarde.'));		
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
	    	axios.post(`${APIURL}/googleLogin/cliente`, {
	    		email: result._tokenResponse.email
	    	}, {
	    		'Content-Type': 'application/json'
	    	})	
	    	.then(response => {
				if(response.data.token){
					localStorage.setItem('token', response.data.token);		
					window.location.href = '/cliente';
				}else {
					alert(response.data.message);
				}
			})
			.catch(() => alert('Erro interno no servidor. Tente novamente mais tarde.'))
		})
		.catch(() => {
		    alert('Falha ao fazer login com uma conta Google. Tente novamente mais tarde.');
		}); 				
	};

	const forgotPassword = async () => {
		if(textInputEmail.current.value !== ''){
			axios.post(`${APIURL}/cliente/esqueceuSenha`, {
				email: textInputEmail.current.value
			}, {
				'Content-Type': 'application/json'
			})
			.then(response => response.json())
			.then(response => alert(response.data.message))
			.catch(() => alert('Falha no servidor. Tente novamente mais tarde.'))		
		}else {
			alert('Preencha o email para poder recuperar sua senha.')
		};
	};

	return(
		<>
			<Menu />
			<Container>
				<ClientLoginContainer>
					<h2>Cliente - Login</h2>
					<button className="loginWithGoogleButton" onClick={loginWithGoogle}>
						<FcGoogle />
						Entrar com o google
					</button>
					<p className="or">Ou</p>
					<label>E-mail</label>
					<input ref={textInputEmail} type="text" />
					<label>Senha</label>
					<div className="inputPass">
						<input ref={textInputPassword} type="password" />	
						{!passwordVisible && <AiOutlineEye
							className='img'
							onClick={ changePasswordVisibility}/>}
						{passwordVisible && <AiOutlineEyeInvisible 
							className='img'
							onClick={ changePasswordVisibility}/>}								
					</div>
					<p className="forgotPasswordParagraph" onClick={forgotPassword}>Esqueceu a senha?</p>
					<button onClick={login}>Entrar</button>					
				</ClientLoginContainer>
			</Container>
			<Footer />
		</>
	);
};