import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Container, DayContainer } from './style';
import { DateInfoType, DayCode } from '../../dataStructure';

interface Props {
	dateInfo: DateInfoType;
}

const WeekHeader: React.FC<Props> = ({ dateInfo }) => {
	const dayInfo = [...Array(7)].map((v, i) => {
		const tDate = new Date(dateInfo.weeklyStartDate);
		tDate.setDate(tDate.getDate() + i);
		return { day: i, date: tDate.getDate() };
	});

	return (
		<Container>
			{dayInfo.map((el, i) => {
				return (
					<DayContainer key={uuidv4()}>
						<b>{el.date}</b>
						<span>{DayCode[el.day]}</span>
					</DayContainer>
				);
			})}
		</Container>
	);
};

export default WeekHeader;
