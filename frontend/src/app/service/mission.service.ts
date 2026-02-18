import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Mission } from "../model/mission";

@Injectable({ providedIn: 'root' })
export class MissionService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les missions
  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/mission/getMission`);
  }

  // Ajouter une mission
  postMission(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/mission/postMission`, mission);
  }
}
