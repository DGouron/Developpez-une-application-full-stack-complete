import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		// Avec les cookies HTTP-only, pas besoin d'ajouter manuellement un token
		// Le cookie sera automatiquement envoyé par le navigateur
		// Ajout de withCredentials pour s'assurer que les cookies sont envoyés
		if (!request.withCredentials) {
			const secureRequest = request.clone({
				withCredentials: true,
			});
			return next.handle(secureRequest);
		}

		return next.handle(request);
	}
}
