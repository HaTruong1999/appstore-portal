import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../../constant';

@Injectable({
	providedIn: 'root'
})

export class AppsService {

	//global config
	apiUrl = environment.backEndApiURL;

	constructor(
		private http: HttpClient,
		public router: Router,
	){}

	parseJwt(token: string) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
		  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	
		return JSON.parse(jsonPayload);
	};

	setWithExpiry(key: string, value: any, ttl: any) {
		const now = new Date();
		const item = {
		  value: value,
		  expiry: (now.getTime() + ttl),
		};
		window.localStorage.setItem(key, JSON.stringify(item));
	}

	getWithExpiry(key: string) {
		const itemStr = localStorage.getItem(key);
		
		if (!itemStr) {
		  return null;
		}
		const item = JSON.parse(itemStr);
		const now = new Date();
		if (now.getTime() > item.expiry) {
		  localStorage.removeItem(key);
		  return null;
		}
		return item.value;
	}

	getAdminToken(){
		const data = {
			username: 'administrator',
			password: '***'
		}

		const url = this.apiUrl.concat(Constant.AUTH_ADMIN);
		return this.http.post(url, data);
	}

	Apps(page: number, limit: number, search: string) {
		const header = {
			headers: {
				Authorization: `Bearer ${this.getWithExpiry("token")}`,
			},
		}
		
		const url = this.apiUrl.concat(Constant.Apps) + "?page=" + page + "&limit=" + limit + "&search=" + search;
		return this.http.get<any>(url,header);
	}

	GetOne(id: string) {
		const url = this.apiUrl.concat(Constant.Apps) + "/" + id;
		return this.http.get<any>(url);
	}

}
