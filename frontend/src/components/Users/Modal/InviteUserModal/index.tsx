import React, { useRef } from 'react';
import { inviteUser } from '@apis/team';
import { toast } from 'react-toastify';

import Modal from '@components/common/Modal';
import { Input } from '../style';

interface Props {
	teamId: number;
	handleModalClose: () => void;
}

const InviteUserModal: React.FC<Props> = ({ teamId, handleModalClose }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const handleSubmit = async () => {
		if (!inputRef.current) return;
		if (inputRef.current.value === '') {
			toast.warn('😣 이메일을 입력해주세요!');
			return;
		}
		await inviteUser(teamId, inputRef.current.value);
		handleModalClose();
	};

	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={false}>
			<Input type='text' placeholder='초대할 유저 이메일 입력' ref={inputRef} />
		</Modal>
	);
};

export default InviteUserModal;
