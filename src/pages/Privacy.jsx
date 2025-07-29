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
					<span>Kakao Integration</span>
				</Box>
			</Box>

			<Divider sx={{ my: 1 }} />

			<Box sx={{ height: '100%', width:'100%', padding: 2 }}>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							This service only provides membership registration through KakaoTalk integration, and only uses the KakaoTalk <RedCode>unique ID</RedCode> for registration.<br/>
							This is to prevent random people from joining and causing trouble, and to avoid the hassle of manually approving each member.<br/>
							Although <RedCode>name</RedCode> and <RedCode>email</RedCode> included in the KakaoTalk profile are also integrated, they are not stored or used.
						</Typography>
					</Box>
				</Box>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							When registering via KakaoTalk integration, it is convenient to copy ◆ ♧ from the instructions provided when entering your ID.
						</Typography>
					</Box>
				</Box>
			</Box>

			{/* --------------------------------------------------------------------------------------------------------------------------- */}

			<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" mt={2}>
				<Box display="flex" alignItems="center">
					<LooksTwoIcon/>
					<span>Use of Integrated Information</span>
				</Box>
			</Box>

			<Divider sx={{ my: 1 }} />

			<Box sx={{ height: '100%', width:'100%', padding: 2 }}>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							The KakaoTalk <RedCode>unique ID</RedCode> is only used when creating Keycloak member information and is not used elsewhere in the app.
						</Typography>
					</Box>
				</Box>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							Member withdrawal is available through the profile menu after logging in, but the procedure is complicated.<br/>
							At your profile, unlink Kakao integration (<RedCode>UNLINK</RedCode>), then notify us via group chat, so we will delete your account.
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
					<span>카카오 연동</span>
				</Box>
			</Box>

			<Divider sx={{ my: 1 }} />

			<Box sx={{ height: '100%', width:'100%', padding: 2 }}>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							본 서비스는 카카오톡 연동을 통해서만 회원 가입을 제공하며, 회원 가입 시 카카오톡 <RedCode>고유 ID</RedCode>만를 사용합니다.<br/>
							이는 어중이 떠중이들이 괜히 들어와서 방해하는 것을 방지하고 일일이 가입된 멤버를 허용하는 것도 귀찮아서입니다.<br/>
							카카오톡 프로필에 포함되는 <RedCode>이름</RedCode> 및 <RedCode>이메일</RedCode>도 연동 되지만 저장하거나 사용하지 않습니다.
						</Typography>
					</Box>
				</Box>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							카카오톡 연동 가입 시, 아이디 입력 시 전지협/애꿍협 분들의 안내문에 있는 ◆ ♧를 복사하여 사용시면 편합니다.
						</Typography>
					</Box>
				</Box>
			</Box>

			{/* --------------------------------------------------------------------------------------------------------------------------- */}

			<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" mt={2}>
				<Box display="flex" alignItems="center">
					<LooksTwoIcon/>
					<span>연동 정보 활용</span>
				</Box>
			</Box>

			<Divider sx={{ my: 1 }} />

			<Box sx={{ height: '100%', width:'100%', padding: 2 }}>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							카카오톡 <RedCode>고유 ID</RedCode>는 키클락 회원정보 생성 시에만 사용되며, 앱 내부적으로 따로 사용되지 않습니다.
						</Typography>
					</Box>
				</Box>

				<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" padding={1}>
					<Box display="flex">
						<CheckBoxIcon color="success"/>
						<Typography pb={1}>
							회원 탈퇴는 로그인 후, 프로필 메뉴를 통해 기능은 제공되고 있지만, 절차가 복잡합니다.<br/>
							프로필 이동 후 카카오 연동 <RedCode>UNLINK</RedCode> 후 단톡방을 통해 알려주시면, 삭제 처리해 드리겠습니다.
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