import styled from 'styled-components';

export const ClientNotification = styled.div`
	width: 90%;
	background-color: #232323;
	display: grid;
	border-radius: 10px;
	height: auto;
	padding: 15px 5px;
	cursor: pointer;
	grid-template-columns: 80% 10% 10%;
	place-items: center;

	p {
  		color: #eee;
 		font-weight: bold;
 		font-size: 14px;
	}

	.notChecked {
		color: gray;
		width: 30px;
		height: 30px;
	}

	.checked {
		color: #00d200;
		width: 30px;
		height: 30px;
	}

	.trash-icon {
		color: #eee;
		width: 20px;
		height: 20px;
	}

`;

export const ClientNotificationContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	height: auto;
	gap: 20px;
	margin: 20px auto;
	align-items: center;
`;

export const NoNotifications = styled.p`
	color: #eee;
	font-weight: bold;
	margin-top: 14px;
	text-align: center;
	font-size: 20px;
`