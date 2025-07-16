import React from 'react';

import { useTheme} from '@mui/material/styles';

import { Box, Divider, Grid, Typography } from "@mui/material";

// import ListIcon from '@mui/icons-material/List';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
// import Looks3Icon from '@mui/icons-material/Looks3';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { useTranslation } from "react-i18next";

// components
import RedCode from '@components/pages/RedCode';

const PrivacyPageEn = () => {
	const currentTheme = useTheme();

	return(
		<Box className="item" backgroundColor={currentTheme.palette.background.default + '50'} padding={2} borderRadius={2} boxShadow={currentTheme.shadows[1]}>

			{/* --------------------------------------------------------------------------------------------------------------------------- */}

			<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" mt={2}>
				<Box display="flex" alignItems="center">
					<LooksOneIcon/>
					<span>Notes on Signing Up</span>
				</Box>
			</Box>

			<Divider sx={{ my: 1 }} />

			<Box sx={{ height: '100%', width:'100%', padding: 2 }}>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							This service only allows sign-up via KakaoTalk integration, and only collects the KakaoTalk <RedCode>unique ID</RedCode> during registration.<br/>
							Basic information such as name and email included in the KakaoTalk profile may be accessed but is never stored or used.
						</Typography>
					</Box>
				</Box>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							When signing up with KakaoTalk, only the <RedCode>Open Chat ID ◆ ♧</RedCode> field is required; the rest can be left blank. For convenience, you can use the ◆ ♧ attached to the field name when entering your ID.
						</Typography>
					</Box>
				</Box>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							When signing up with KakaoTalk, the <RedCode>Username</RedCode> is automatically filled with the KakaoTalk <RedCode>unique ID</RedCode> as a number. You may edit it, but if it duplicates another user, registration will fail.
						</Typography>
					</Box>
				</Box>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							Email is also not required. Since it is a field that cannot be deleted in Keycloak, it has simply been moved to a lower position.
						</Typography>
					</Box>
				</Box>
			</Box>

			{/* --------------------------------------------------------------------------------------------------------------------------- */}

			<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" mt={2}>
				<Box display="flex" alignItems="center">
					<LooksTwoIcon/>
					<span>Use of Registration Information</span>
				</Box>
			</Box>

			<Divider sx={{ my: 1 }} />

			<Box sx={{ height: '100%', width:'100%', padding: 2 }}>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							The KakaoTalk <RedCode>unique ID</RedCode> is only used when creating Keycloak user information and is not used for actual mock battle score management.
						</Typography>
					</Box>
				</Box>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							Account deletion is available through the profile menu after logging in, but currently it is not properly deleted. Until this is fixed, please notify us via the group chat and we will process it for you.
						</Typography>
					</Box>
				</Box>
			</Box>
			
		</Box>
	);
}

const PrivacyPageKo = () => {
	const currentTheme = useTheme();

	return(
		<Box className="item" backgroundColor={currentTheme.palette.background.default + '50'} padding={2} borderRadius={2} boxShadow={currentTheme.shadows[1]}>

			{/* --------------------------------------------------------------------------------------------------------------------------- */}

			<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" mt={2}>
				<Box display="flex" alignItems="center">
					<LooksOneIcon/>
					<span>회원 가입시 주의할 점</span>
				</Box>
			</Box>

			<Divider sx={{ my: 1 }} />

			<Box sx={{ height: '100%', width:'100%', padding: 2 }}>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							본 서비스는 카카오톡 연동을 통해서만 회원 가입을 제공하며, 회원 가입 시 카카오톡 <RedCode>고유 ID</RedCode>만를 수집합니다.<br/>
							카카오톡 프로필에 포함되는 이름, 이메일 등의 기본적인 정보를 연동받기는 하나 일절 저장하거나 사용하지 않습니다.
						</Typography>
					</Box>
				</Box>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							카카오톡 연동 가입 시, <RedCode>오픈카톡아이디 ◆ ♧</RedCode> 항목을 제외한 나머지는 입력이 불필요합니다. 아이디 입력 시에는 필드명에 붙어있는 ◆ ♧를 사용시면 편합니다.
						</Typography>
					</Box>
				</Box>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							카카오톡 연동 가입 시, <RedCode>사용자 이름</RedCode>은 카카오톡 <RedCode>고유 ID</RedCode>를 사용하여, 숫자로 자동입력 됩니다. 수정해도 무방하지만, 다른 사용자와 중복될 경우 가입에 실패하게 됩니다.
						</Typography>
					</Box>
				</Box>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							이메일 또한 입력이 불필요하며, 키클락 자체에서 삭제 불가능한 필드여서 위치만 아래로 내려놓았습니다.
						</Typography>
					</Box>
				</Box>
			</Box>

			{/* --------------------------------------------------------------------------------------------------------------------------- */}

			<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" mt={2}>
				<Box display="flex" alignItems="center">
					<LooksTwoIcon/>
					<span>가입 정보 활용</span>
				</Box>
			</Box>

			<Divider sx={{ my: 1 }} />

			<Box sx={{ height: '100%', width:'100%', padding: 2 }}>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							카카오톡 <RedCode>고유 ID</RedCode>는 키클락 회원정보 생성 시에만 사용되며, 실제 모의전 점수 관리에는 사용되지 않습니다.
						</Typography>
					</Box>
				</Box>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							회원 탈퇴는 로그인 후, 프로필 메뉴를 통해 기능은 제공되고 있지만, 현재로는 제대로 삭제되지 않고 있으니, 수정 전까진 단톡방을 통해 알려주시면, 처리해 드리도록 하겠습니다.
						</Typography>
					</Box>
				</Box>
			</Box>
			
		</Box>
	);
}

const Privacy = () => {
	const { t, i18n  } = useTranslation();

	return(
		<section id="proxyContractSection">
			<div className="section-header">
				<Typography variant="h4">{t('menu__privacy_protection')}</Typography>
			</div>
			<div className="section-body">

				<Grid container justifyContent="space-between" spacing={2}>
					<Grid item>
						{i18n.language === 'ko' ? <PrivacyPageKo />: <PrivacyPageEn />}
					</Grid>
				</Grid>
			</div>
			<div className="section-footer">
			</div>
		</section>
	)
}

export default Privacy;