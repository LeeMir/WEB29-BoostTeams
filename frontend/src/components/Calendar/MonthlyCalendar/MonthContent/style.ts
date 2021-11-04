import styled from 'styled-components';
import { ColorCode, Font } from '../../../../utils/constants';

export const ContentContainer = styled.div`
	height: 100%;
`;

export const DayNum = styled.div`
	margin: 0.5rem;
`;

export const DayWrapper = styled.div`
	height: 100%;
	border-right: 1px solid ${ColorCode.LINE2};
	border-bottom: 1px solid ${ColorCode.LINE2};
	&.sunday {
		color: ${ColorCode.RED};
	}
	&:hover {
		background-color: ${ColorCode.BACKGROUND1};
	}
`;

export const Schedule = styled.div`
	font-size: ${Font.SMALL};
	border-radius: 8px;
	border: 1px solid ${ColorCode.LINE1};
	background-color: ${(props) => props.color || ColorCode.ORANGE};
	padding: 0.5rem;
	margin: 0.3rem 0;
`;

export const WeekContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	width: 100%;
	height: 14%;
`;
