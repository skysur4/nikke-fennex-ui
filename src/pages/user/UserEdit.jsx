import '@styles/pages/User.scss';

import React, { useState, useRef } from 'react';

import { Link, useNavigate } from "react-router-dom";

import {Button, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField} from "@mui/material";
import Alert from '@components/ui/Alert';


import userProfile from '@assets/imgs/common/user.png';

import { useTranslation } from "react-i18next";
import * as gateway from '@components/common/Gateway';

const UserEdit = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [familyName, setFamilyName] = useState('');
	const [givenName, setGivenName] = useState('');
	const [gender, setGender] = useState('');
	const [locale, setLocale] = useState('');
	const [nick, setNick] = useState(''); // 닉네임
	const [alertText, setAlertText] = useState(''); // alert
	const [isAlertVisible, setIsAlertVisible] = useState(false); // alert visible

	// ref
	const nicknameRef = useRef(null);

	React.useEffect(() => {
	    const fetchData = async () => {

	      try {
	        const userDetail = await gateway.get('/api/v1/user',{});
			if (Object.keys(userDetail.data).length !== 0) {
				setEmail(userDetail.data.email);
				setFamilyName(userDetail.data.familyName);
				setGivenName(userDetail.data.givenName);
				setLocale(userDetail.data.locale)
				setGender(userDetail.data.gender);
				setNick(userDetail.data.nick||'');
	        }
	      } catch (error) {
	      }
	    };

    fetchData();
  	}, []);

	// alert Event
	const showAlert = (message) => {
		setAlertText(message);
		setIsAlertVisible(true);
	};
	
	const handleAlertClose = () => {
    	setIsAlertVisible(false);
  	};
	const formUpdate = () => {
		const param = {
						gender : gender,
						nick : nick,
						locale : locale
		}

		gateway.put('/api/v1/user', param).then((response) =>	{
			navigate('/user');
		})
	}

	const { t  } = useTranslation();

	return(
		<section id={'userSection'}>
			<Alert text={alertText} visible={isAlertVisible} onClose={handleAlertClose}/>
			<div className="section-header">
				<h2>{t("userEdit__title")}</h2>
				<div>
					<Button variant="contained" color="inherit" component={Link} to='/user'>{t("user__btn__edit__back")}</Button>
					<Button variant="contained" color="secondary" onClick={formUpdate}>{t("user__btn__edit__complete")}</Button>
				</div>
			</div>
			<div className="section-body">
				<Grid item container className="container-flex">
					<Grid item xs={4} md={4} sm={12} className='img-form'>
						<img src={userProfile} alt='profile' />
					</Grid>
					<Grid item xs={8} md={8} sm={12} className="edit-form">
						<table className="editTable">
							<tbody>
							<tr>
								<th>{t("user__email")}</th>
								<td>
									<TextField value={email} inputRef={(input) => { if (input) { input.readOnly = true;}}} InputProps={{ readOnly: true}} />
								</td>
							</tr>
							<tr>
								<th>{t("user__firstName")}</th>
								<td>
									<TextField value={familyName} inputRef={(input) => { if (input) { input.readOnly = true;}}} InputProps={{ readOnly: true}} />
								</td>
							</tr>
							<tr>
								<th>{t("user__lastName")}</th>
								<td>
									<TextField value={givenName} inputRef={(input) => { if (input) { input.readOnly = true;}}} InputProps={{ readOnly: true}} />
								</td>
							</tr>
							<tr>
								<th>{t("user__gender")}</th>
								<td>
									<RadioGroup
										value={gender}
										name="gender"
										onChange={(e) => setGender(e.target.value)}>
										<FormControlLabel value="M" control={<Radio />} label={t("user__gender__male")} />
										<FormControlLabel value="F" control={<Radio />} label={t("user__gender__female")} />
									</RadioGroup>
								</td>
							</tr>
							<tr>
								<th>{t("user__language")}</th>
								<td>
									<Select
										id="locale"
										value={locale}
										onChange={(e) => setLocale(e.target.value)}>
										<MenuItem value={'ko-KR'}>{t('trans__choose__ko')}</MenuItem>
										<MenuItem value={'en-US'}>{t('trans__choose__en')}</MenuItem>
									</Select>
								</td>
							</tr>
							<tr>
								<th>{t("user__nickname")}</th>
								<td>
									<TextField value={nick} inputRef={nicknameRef} onChange={(e) => setNick(e.target.value)}/>
								</td>
							</tr>
							</tbody>
						</table>
					</Grid>
				</Grid>
			</div>
		</section>
	)
}

export default UserEdit;