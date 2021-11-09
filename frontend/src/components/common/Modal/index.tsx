/* eslint-disable camelcase */
import React from 'react';
import { createPortal } from 'react-dom';
import { ColorCode } from '../../../utils/constants';
import { Background, Container, ButtonContainer } from './style';
import Button from '../Button';

interface Props {
	children: React.ReactNode;
	handleModalClose: () => void;
	handleSubmit: () => void;
	removeSubmitButton: boolean;
}

const Modal: React.FC<Props> = ({ children, handleModalClose, handleSubmit, removeSubmitButton = false }) => {
	const MODAL: Element = document.getElementById('modal')!;
	return createPortal(
		<>
			<Background onClick={handleModalClose} />
			<Container>
				{children}
				<ButtonContainer>
					{!removeSubmitButton && (
						<Button
							text='저장'
							handler={handleSubmit}
							backgroundColor={ColorCode.PRIMARY1}
							fontColor={ColorCode.WHITE}
						/>
					)}
					<Button
						text='닫기'
						handler={handleModalClose}
						backgroundColor={ColorCode.WHITE}
						fontColor={ColorCode.BLACK}
					/>
				</ButtonContainer>
			</Container>
		</>,
		MODAL,
	);
};
export default Modal;