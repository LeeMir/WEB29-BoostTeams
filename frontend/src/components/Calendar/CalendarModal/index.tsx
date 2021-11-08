/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import moment from 'moment';
import { toast } from 'react-toastify';

import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { ModalMode, ModalSchedule } from '../../../stores/calendar';

import ColorPicker from '../../common/ColorPicker';
import DropDown from '../../common/DropDown';
import Modal from '../../common/Modal';

import { FormContainer, TitleContainer, TimeContainer, ButtonContainer } from './style';
import { strToFormatString } from '../../../utils/calendar';
import { createNewSchedule, deleteSchedule, ScheduleReqType } from '../../../apis/schedule';
import { ScheduleType } from '../dataStructure';

interface Props {
	handleModalClose: () => void;
	addSchedule: (newSchedule: ScheduleType) => void;
	deleteScheduleById: (id: number) => void;
	updateScheduleById: (id: number, newSchedule: ScheduleType) => void;
}
interface InputScheduleType {
	title: string;
	date: string;
	startTime: string;
	endTime: string;
	content: string;
}

const CalendarModal: React.FC<Props> = ({ handleModalClose, addSchedule, deleteScheduleById, updateScheduleById }) => {
	const repeatOptions: string[] = ['반복안함', '매일반복', '매주반복', '매월반복'];

	const [modalMode, setModalMode] = useRecoilState(ModalMode);
	const scheduleId = useRecoilValue(ModalSchedule).schedule_id;
	const [modalSchedule, setModalSchedule] = useRecoilState(ModalSchedule);
	const [selectedColor, setSelectedColor] = useState<number>(0);
	const [selectedRepeat, setSelectedRepeat] = useState<number>(0);
	const [inputSchedule, setInputSchedule] = useState<InputScheduleType>();

	const titleRef = useRef<HTMLInputElement>(null);
	const dateRef = useRef<HTMLInputElement>(null);
	const startTimeRef = useRef<HTMLInputElement>(null);
	const endTimeRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLTextAreaElement>(null);

	const getScheduleData = (): ScheduleReqType => {
		return {
			color: selectedColor,
			title: titleRef.current?.value,
			start_date: moment(`${dateRef.current?.value} ${startTimeRef.current?.value}`, 'YYYY-MM-DD hh:mm').toString(),
			end_date: moment(`${dateRef.current?.value} ${endTimeRef.current?.value}`, 'YYYY-MM-DD hh:mm').toString(),
			repeat_id: selectedRepeat,
			content: contentRef.current?.value,
		};
	};

	const validateSchedule = (newScheduleData: ScheduleReqType): boolean => {
		const { title, content, start_date, end_date } = newScheduleData;
		if (!title) {
			toast.warn('😮 제목을 입력해주세요!');
			return false;
		}
		if (!content) {
			toast.warn('😮 설명을 입력해주세요!');
			return false;
		}
		if (new Date(start_date) >= new Date(end_date)) {
			toast.warn('😮 시작과 끝 시간이 올바르지 않습니다!');
			return false;
		}
		return true;
	};

	const checkModalMode = (mode: string): boolean => modalMode.mode === mode;

	const handleSubmit = async () => {
		const newScheduleData = getScheduleData();
		if (checkModalMode('update')) newScheduleData.schedule_id = scheduleId;

		if (validateSchedule(newScheduleData)) {
			const newSchedule = await createNewSchedule(1, newScheduleData);
			if (checkModalMode('create')) addSchedule(newSchedule);
			else updateScheduleById(scheduleId, newSchedule);
			handleModalClose();
		}
	};

	const handleDeleteButtonClick = async (e: any) => {
		e.preventDefault();
		await deleteSchedule(scheduleId);
		deleteScheduleById(scheduleId);
		handleModalClose();
	};

	const changeUpdateMode = async (e: any) => {
		e.preventDefault();
		setModalMode({ mode: 'update' });
	};

	useEffect(() => {
		const { title, color, repeat_id, start_date, end_date, content } = modalSchedule;
		setSelectedColor(color);
		setSelectedRepeat(repeat_id);
		setInputSchedule({
			title,
			content,
			date: strToFormatString(start_date, 'YYYY-MM-DD'),
			startTime: strToFormatString(start_date, 'HH:mm'),
			endTime: strToFormatString(end_date, 'HH:mm'),
		});
	}, [modalMode, modalSchedule]);

	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={checkModalMode('read')}>
			<FormContainer>
				<TitleContainer>
					<ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
					<input
						ref={titleRef}
						defaultValue={inputSchedule?.title}
						placeholder='제목을 입력해 주세요.'
						readOnly={checkModalMode('read')}
					/>
				</TitleContainer>
				<TimeContainer>
					<input ref={dateRef} type='date' defaultValue={inputSchedule?.date} readOnly={checkModalMode('read')} />
					<input
						ref={startTimeRef}
						type='time'
						defaultValue={inputSchedule?.startTime}
						readOnly={checkModalMode('read')}
					/>
					<span>~</span>
					<input ref={endTimeRef} type='time' defaultValue={inputSchedule?.endTime} readOnly={checkModalMode('read')} />
				</TimeContainer>
				<DropDown
					options={repeatOptions}
					selectedOption={repeatOptions[selectedRepeat]}
					setSelectedOption={setSelectedRepeat}
				/>
				<textarea
					ref={contentRef}
					defaultValue={inputSchedule?.content}
					readOnly={checkModalMode('read')}
					placeholder='설명을 입력해 주세요'
				/>
				{checkModalMode('read') && (
					<>
						<ButtonContainer>
							<FaPencilAlt onClick={changeUpdateMode} />
							<FaTrashAlt onClick={handleDeleteButtonClick} />
						</ButtonContainer>
					</>
				)}
			</FormContainer>
		</Modal>
	);
};

export default CalendarModal;
