export type TUserId = string;

export interface IUserCredentials {
	readonly email: string;
	readonly password: string;
}

export interface IUser {
	readonly id: TUserId;
	readonly email: string;
	readonly username: string;
	readonly password?: string;
}

export interface IUserEntity {
	readonly id: TUserId;
	readonly email: string;
	readonly username: string;
	readonly password?: string;
}

export type UserWithoutPassword = Omit<IUser, "password">;

export const mapUserEntityToInterface = (
	entity: IUserEntity,
): UserWithoutPassword => ({
	id: entity.id,
	email: entity.email,
	username: entity.username,
});

export const mapToUserEntity = (user: IUser): IUserEntity => ({
	id: user.id,
	email: user.email,
	username: user.username,
	password: user.password,
});

// Types utilitaires pour les variations
export type TUserCreate = Omit<IUser, "id">;
export type TUserUpdate = Partial<IUser>;
