import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Fruta } from "../model/fruta";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class FrutasService {

    constructor(private http: HttpClient) {

    }

    loadAllFrutas(substring: string | null): Observable<Fruta[]> {
        const url = `/api/frutas?&filter=${substring}`;
        return this.http.get<any>(url)
            .pipe(
                map(res => res["payload"] as Fruta[]),
                shareReplay()
            );
    }

}