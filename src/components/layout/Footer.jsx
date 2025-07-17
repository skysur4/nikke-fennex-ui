import React from 'react';

import { Box, IconButton, Typography } from '@mui/material';

import rapi from "@assets/imgs/rapi.png";

// footer copyright setting
function Footer() {
	const gotoGit = () => {
		window.open('https://github.com/skysur4/nikke-fennex-ui', '_blank');
	}

	const gotoReact = () => {
		window.open('https://legacy.reactjs.org', '_blank');
	}

	const gotoMui = () => {
		window.open('https://mui.com', '_blank');
	}

	const playGame = () => {
		window.open('https://www.nikke-global.com/', '_blank');
	}

	return (
		<footer>
			<Box>
				<Typography sx={{display: { xs: 'none', sm: 'inline-block' }}}>Powered by

					<IconButton color='inherit' onClick={playGame}>
						{rapi && <img src={rapi} alt="rapi" style={{ width: '1em', height: '1em' }} />}
					</IconButton>

					<IconButton color='inherit' onClick={gotoGit}>
						<svg aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24" version="1.1" data-view-component="true" className="octicon octicon-mark-github">
							<path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
						</svg>
					</IconButton>

					<IconButton color='inherit' onClick={gotoReact}>
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="-10.5 -9.45 21 18.9" fill="none">
							<circle cx="0" cy="0" r="2" fill="#61dafb"></circle>
							<g stroke="#61dafb" fill="none">
							<ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
							<ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g>
						</svg>
					</IconButton>

					<IconButton color='inherit' onClick={gotoMui}>
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 32" fill="none" >
							<path d="M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839zM31 7.234a1 1 0 001.514.857l3-1.8A1 1 0 0036 5.434V1.766A1 1 0 0034.486.91l-3 1.8a1 1 0 00-.486.857v3.668z" fill="#007FFF"/>
						</svg>
					</IconButton>

				</Typography>
			</Box>
		</footer>
	);
}

export default Footer;