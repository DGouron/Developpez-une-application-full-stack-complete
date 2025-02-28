import type {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { type Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	intercept<T>(
		request: HttpRequest<T>,
		next: HttpHandler,
	): Observable<HttpEvent<T>> {
		return next.handle(request).pipe(
			catchError((error) => {
				return throwError(() => error);
			}),
		);
	}
}
