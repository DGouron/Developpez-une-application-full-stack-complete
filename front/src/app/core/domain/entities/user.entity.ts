import type { IUser, IUserEntity, TUserId } from "../types/user.type";

export class UserEntity implements IUserEntity {
	constructor(
		readonly id: TUserId,
		readonly email: string,
		readonly username: string,
		readonly password?: string,
	) {}

	toJSON(): IUser {
		// On n'expose jamais le mot de passe
		const { password: _, ...user } = this;
		return user;
	}

	static create(props: Omit<IUserEntity, "id">): UserEntity {
		return new UserEntity(
			crypto.randomUUID(),
			props.email,
			props.username,
			props.password,
		);
	}
}
