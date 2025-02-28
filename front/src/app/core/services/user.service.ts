import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { type Observable, map } from "rxjs";
import { AppConfig } from "../config/app.config";
import { UserEntity } from "../domain/entities/user.entity";
import type {
	IUser,
	IUserEntity,
	TUserCreate,
} from "../domain/types/user.type";

@Injectable({
	providedIn: "root",
})
export class UserService {
	private readonly apiUrl = `${AppConfig.apiUrl}/users`;

	constructor(private http: HttpClient) {}

	create(user: TUserCreate): Observable<IUser> {
		return this.http
			.post<IUserEntity>(this.apiUrl, user)
			.pipe(
				map((response) =>
					new UserEntity(
						response.id,
						response.email,
						response.username,
						response.password,
					).toJSON(),
				),
			);
	}

	getById(id: string): Observable<IUser> {
		return this.http
			.get<IUserEntity>(`${this.apiUrl}/${id}`)
			.pipe(
				map((response) =>
					new UserEntity(
						response.id,
						response.email,
						response.username,
						response.password,
					).toJSON(),
				),
			);
	}
}
