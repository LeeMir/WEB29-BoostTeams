import React, { useState } from 'react';
import { Container, ColorDropDown, ColorCircle } from './style';
import { PrimaryPalette } from '../../../utils/constants';

export interface Props {
	selectedColor: number;
	setSelectedColor: React.Dispatch<React.SetStateAction<number>>;
}

const ColorPicker: React.FC<Props> = ({ selectedColor, setSelectedColor }) => {
	const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

	const handleDropDownOpen = () => {
		setDropDownOpen(!dropDownOpen);
	};

	const handleColorClick = (e: React.MouseEvent<HTMLElement>) =>
		setSelectedColor(Number(e.currentTarget.dataset.color));

	return (
		<Container onClick={handleDropDownOpen}>
			<ColorCircle color={PrimaryPalette[selectedColor]} />
			{dropDownOpen && (
				<ColorDropDown>
					{PrimaryPalette.map((colorCode, i) => (
						<ColorCircle key={colorCode} color={colorCode} data-color={i} onClick={handleColorClick} />
					))}
				</ColorDropDown>
			)}
		</Container>
	);
};

export default ColorPicker;
