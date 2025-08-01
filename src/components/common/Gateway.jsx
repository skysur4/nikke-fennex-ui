import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_GATEWAY;
const userinfoUrl = apiUrl + '/session';

const defaultOptions = {
	withCredentials: "same-site"
}

export const kakaoLogin = apiUrl + '/oauth2/authorization/keycloak';

export const pocketLogin = apiUrl + '/oauth2/authorization/pocket';


export const logout = apiUrl + '/logout';

/**
 * SSE 접속
 */
export const connectChannel = () => {
	const eventSource = new EventSource(apiUrl + "/notification", {withCredentials: true});

	return eventSource;
}

/**
 * GET 방식으로 gateway 호출
 * @param {string} path 호출 경로
 * @param {object} opts axios 호출 옵션
 * @returns {object}
 */
export const get = async(path, opts) => {
	let result = {status : false };

	await axios.get(apiUrl + path, {
        	params: opts,
        	withCredentials: "same-site"
      	}).then((response) =>	{
			if (response.status  === 200) {
				result.status = true;
				result.data =  response.data;
			} else {
				alert("처리중 오류가 발생했습니다.");
			}
		}).catch((error)=>{
			result = error.response;
			console.log(error);
		});
	return result;
}

export const post = async(path, payload) => {
	let result = {status : false };

	await axios.post(apiUrl + path, payload, {
        	withCredentials: "same-site"
      	})
		.then((response) =>	{
			if (response.status  === 200) {
				result.status = true;
				result.data =  response.data;

			} else {
				alert("처리중 오류가 발생했습니다.");
			}
		}).catch((error)=>{
			alert("처리중 오류가 발생했습니다.");
			console.log(error);
		});
	return result;
}

export const put = async(path, payload) => {
	let result = {status : false };

	await axios.put(apiUrl + path, payload,{
        	withCredentials: "same-site"
      	})
		.then((response) =>	{
			if (response.status  === 200) {
				result.status = true;
			} else {
				alert("처리중 오류가 발생했습니다.");
			}
		}).catch((error)=>{
			alert("처리중 오류가 발생했습니다.");
			console.log(error);
		});
	return result;
}

export const del = async(path, payload) => {
	let result = {status : false };

	await axios.delete(apiUrl + path, {
			data: payload,
        	withCredentials: "same-site"
      	})
		.then((response) =>	{
			if (response.status  === 200) {
				result.status = true;
			} else {
				alert("처리중 오류가 발생했습니다.");
			}
		}).catch((error)=>{
			alert("처리중 오류가 발생했습니다.");
			console.log(error);
		});
	return result;
}

export const patch = async(path, payload) => {
	let result = {status : false };

	await axios.patch(apiUrl + path, payload,{
        	withCredentials: "same-site"
      	})
		.then((response) =>	{
			if (response.status  === 200) {
				result.status = true;
			} else {
				alert("처리중 오류가 발생했습니다.");
			}
		}).catch((error)=>{
			alert("처리중 오류가 발생했습니다.");
			console.log(error);
		});
	return result;
}

export const check = async(path, opts) => {
	let result = {status : false };

	await axios.head(apiUrl + path, {
        	params: opts,
        	withCredentials: "same-site"
      	})
		.then((response) =>	{
			if (response.status  === 200) {
				result.status = true;
				result.requestUrl = response.request.responseURL;
			}
		}).catch((error)=>{
			console.log(error);
		});
	return result;
}

export const userInfo = async () => {
	const admins = ["꿍디빵디", "띨띨한지휘관", "존자르헌호", "승건◆", "훈민◆", "은화영♧", "아우우아우웅♧", "삼백억test"]
	let result = { isLogin : false, name: null, userId: null, isAdmin: false };
	await axios.get(userinfoUrl, defaultOptions)
		.then((response) =>	{
			if (response.data && response.data.status) {
				const data = response.data;
				console.log(data);
				result = { isLogin: data.status, name: data.nickName, userId: data.id, isAdmin: admins.includes(data.nickName) };
			}
		}).catch((error)=>{
			console.log(error);
		});

	return result;
}

export const fileDownload = async(path, projectId, idx) => {

	const params = {projectId: projectId, idx: idx};

	try {
		const result = await check(path, params);

		if (result.status) {
			window.location.href = result.requestUrl;
		} else {
			alert("파일을 찾을 수 없습니다.");
		}
	} catch (error) {
		if (error.response && error.response.status === 404) {
			alert("파일을 찾을 수 없습니다.");
		} else {
			alert("처리중 오류가 발생했습니다.");
		}
	}
}
