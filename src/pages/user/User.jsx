import React, {useRef, useState} from 'react';
import '@styles/pages/User.scss';
import {Button, Grid} from "@mui/material";
import { Link } from "react-router-dom";
import * as gateway from '../../components/common/Gateway';
import {useTranslation} from "react-i18next";
import userSrc from '@assets/imgs/common/user.png';

const UserEdit = () => {

	const [userInfo, setUserInfo] = React.useState({});

	React.useEffect(() => {
	    const fetchData = async () => {
	      try {
	        const userDetail = await gateway.get('/api/v1/user',{});
			if (Object.keys(userDetail.data).length !== 0) {
	        	setUserInfo(userDetail.data);
	        }
	      } catch (error) {
	      }
	    };

    fetchData();
  	}, []);

	const { t  } = useTranslation();

	return(
		<section id={'userSection'}>
			<div className="section-header">
				<h2>{t("user__title")}</h2>
				<Button variant="contained" color="secondary" component={Link} to='/user/edit'>{t("user__btn__edit")}</Button>
			</div>
			<div className="section-body">
				<Grid item container className="container-flex">
					<Grid item xs={4} md={4} sm={12} className='img-form'>
						<img src={userSrc} alt="image" />
						{/*{picture ? <img src={picture} alt="image"/> : <div className="no-img">no image</div>}*/}
					</Grid>
					<Grid item xs={8} md={8} sm={12} className="profile-form">
						<table>
							<tbody>
							<tr>
								<th>{t("user__email")}</th>
								<td>{userInfo.email}</td>
							</tr>
							<tr>
								<th>{t("user__firstName")}</th>
								<td>{userInfo.familyName}</td>
							</tr>
							<tr>
								<th>{t("user__lastName")}</th>
								<td>{userInfo.givenName}</td>
							</tr>
							<tr>
								<th>{t("user__gender")}</th>
								<td>{userInfo.gender === 'M' ? <span>{t("user__gender__male")}</span> : userInfo.gender === 'F' ? <span>{t("user__gender__female")}</span> : <span></span>}</td>
							</tr>
							<tr>
								<th>{t("user__language")}</th>
								<td>{userInfo.language === 'en_US' ? <span>{t("trans__choose__en")}</span> : userInfo.language === 'ko_KR' ? <span>{t("trans__choose__ko")}</span>: <span></span>}</td>							</tr>
							<tr>
								<th>{t("user__nickname")}</th>
								<td>{userInfo.nick}</td>
							</tr>
							<tr>
								<th>{t("user__updateDate")}</th>
								<td>{userInfo ? userInfo.updatedAt : ''}</td>
							</tr>
							</tbody>
						</table>
					</Grid>
				</Grid>
			</div>
			<div className="section-footer">
				<Button variant="contained" color="inherit" href={gateway.logout}>{t("user__btn__logout")}</Button>
			</div>
		</section>
	)
}

export default UserEdit;