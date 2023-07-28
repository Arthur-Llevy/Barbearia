import styled from 'styled-components';

export const ContainerMenu = styled.div`
	width: 100%;
	background-color: #171717;
	height: 10vh;
	display: flex;
	justify-content: space-around;
	align-items: center;	
	transition: .2s;

	
	img, svg {
		max-width: 60px;
		width: 7vw;
		height: 7vw;				
	}

	h1 {
		color: #eee
	}

	svg {
		color: #eee;
		max-width: 50px;
		width: 5vw;
		height: 5vw;
		min-width: 25px;
		min-height: 25px;
		cursor: pointer;
	}

	.iconsMenu {
		width: 70px;
		display: flex;
		justify-content: space-between;
	}
`;

export const PopUp = styled.div`
	position: absolute;
	background-color: #212121;
	width: 90%;
	border-radius: 10px;
	height: 80px;
	display: none;
	flex-direction: column;
	gap: 10px;
	justify-content: center;
	align-items: center;
	top: 70px;
	left: 50%;
	transform: translateX(-50%);
	opacity: 0;
	display: none;
	transition: .2s;

	p {
	  color: #eee;
	  text-decoration: underline;
	  cursor: pointer;
	}
`;
