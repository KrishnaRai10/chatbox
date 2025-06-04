import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MainService {
    public loading: boolean = false;
    handelLoader(isLoading: boolean): void {
        this.loading = isLoading;
    }
}