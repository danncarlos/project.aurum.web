// BaseHttpInterceptor
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const BaseHttpInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const clonedRequest = req.clone({
        setHeaders: {
            'Content-Type': 'application/json'
        }
    });

    return next(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
            return throwError(() => error);
        })
    );
};