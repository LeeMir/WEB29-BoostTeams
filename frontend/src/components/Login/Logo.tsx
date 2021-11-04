import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoWrapper = styled.div`
	width: 4rem;
	margin-bottom: 1rem;
	img {
		width: 100%;
	}
`;

const Logo: React.FC = () => {
	return (
		<LogoWrapper>
			<Link to='/'>
				<img src='logo.png' alt='logo' />
			</Link>
		</LogoWrapper>
	);
};

export default Logo;
