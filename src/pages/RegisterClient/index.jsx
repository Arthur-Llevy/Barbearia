import { Menu } from '../../components/Menu';
import { Footer } from '../../components/Footer';
import { Container } from '../../GlobalStyles';
import { RegisterCLientContainer } from './RegisterClientStyles';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useState, useRef } from 'react';
import { firebaseVariables } from '../../services/FirebaseConfig';
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

export const RegisterClient = () => {

	const APIURL = import.meta.env.VITE_API_URL;
    const regexToValidationEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const emailValidation = (email) => {
    	return regexToValidationEmail.test(email);
    };

	const regiterClientWithGoogle = async () => {		
		signInWithPopup(firebaseVariables.auth, firebaseVariables.provider)
		.then((result) => {		 
			axios.post(`${APIURL}/cadastrarClienteGoogle/cliente`, {
				name: result._tokenResponse.fullName,
		 		email: result._tokenResponse.email
			}, {
				'Content-Type': 'application/json' 
			}) 
		    .then(response => {
				alert(response.data.message);	
				axios.post(`${APIURL}/login/cliente`, {
					email: inputEmail.current.value,
					senha: textInputPassword.current.value
				}, {
					'Content-Type': 'application/json'
				})
				.then(response => {
					if(response.data.token){
				  		localStorage.setItem('token', response.data.token);
				  		window.location.href = '/cliente';
					};	
				})
				.catch(() => alert('Falha ao entrar em sua conta. Tente novamente mais tarde.'))							
			}) 	
			.catch(() => alert('Ocorreu um erro ao tentar entrar com uma conta do Google. Tente novamente mais tarde.'))		
		}).catch(() => {
		    alert('Falha ao fazer login com uma conta Google. Tente novamente mais tarde.');
		}); 					
	};

	document.title = 'GSB | Cadastrar cliente';

	let inputName = useRef();
	let inputEmail = useRef();	
	let textInputConfirmPassword = useRef();
	let textInputPassword = useRef();
	let [passwordVisible, setPasswordVisible] = useState(false);
	let [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	let registerCLientContainer = useRef();

	const regiterNewClient = async () => {		
		if(textInputPassword.current.value === textInputConfirmPassword.current.value){
			if(emailValidation(inputEmail.current.value)){
				axios.post(`${APIURL}/cadastrarCliente`, {					
						name: inputName.current.value,
						email: inputEmail.current.value,
						password: textInputPassword.current.value
					}, {
						'Content-Type': 'application/json' 
					})					
					.then(response => { 
						alert(response.data.message);
						axios.post(`${APIURL}/login/cliente`, {								
							email: inputEmail.current.value,
							senha: textInputPassword.current.value							
						}, {
							'Content-Type': 'application/json'
						})
						.then(response => {
					  		if(response.data.token){
								localStorage.setItem('token', response.data.token);
								window.location.href = '/cliente';
							 };	
						})
						.catch(() => alert('Falha ao entrar em sua conta. Tente novamente mais tarde.'))					
					})
					.catch(() => console.log(`Erro ao cadastrar`));			
				}else {
					alert('O e-mail precisa ser válido.')
				};

		}else if(inputName.current.value === '' || inputEmail.current.value === '' || inputEmail.current.value === '' || textInputPassword.current.value === '' || textInputConfirmPassword.current.value === ''){
			alert('Todos os campos precisam ser preenchidos.');

		}else {
			alert('As senhas precisam ser iguais.');			
		}
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

	const changeConfirmPasswordVisibility = () => {
		if(confirmPasswordVisible){
			textInputConfirmPassword.current.setAttribute('type', 'password');
			setConfirmPasswordVisible(false);
		}else {
			textInputConfirmPassword.current.setAttribute('type', 'text');
			setConfirmPasswordVisible(true);
		};
	};

	return(
		<>
			<Menu />
			<Container>
				<RegisterCLientContainer ref={registerCLientContainer}>
					<h2>Cadastrar cliente</h2>
					<label>Nome</label>
					<input ref={inputName} type="text" />
					<label>E-mail</label>
					<input ref={inputEmail} type="text" />
					<label>Senha</label>
					<div className="inputPass">
						<input ref={textInputPassword} type="password" />	
						{!passwordVisible && <AiOutlineEye
							className='img'
							onClick={ changePasswordVisibility}/>}
						{passwordVisible && <AiOutlineEyeInvisible 
							className='img'
							onClick={changePasswordVisibility}/>}								
					</div>
					<label>Confirmar senha</label>
					<div className="inputPass">
						<input ref={textInputConfirmPassword} type="password" />	
						{!confirmPasswordVisible && <AiOutlineEye
							className='img'
							onClick={changeConfirmPasswordVisibility}/>}
						{confirmPasswordVisible && <AiOutlineEyeInvisible 
							className='img'
							onClick={changeConfirmPasswordVisibility}/>}								
					</div>
					<button onClick={regiterNewClient}>Cadastrar</button>
					<p className="or">Ou</p>
					<button onClick={regiterClientWithGoogle}>
						<FcGoogle />
						Entrar com o google
					</button>
				</RegisterCLientContainer>	
			</Container>
			<Footer />										
		</>
	);
};