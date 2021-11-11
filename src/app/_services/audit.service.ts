import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Audit } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuditService
{
    constructor(private http: HttpClient) { }

    getAll()
    {
        return this.http.get<Audit[]>(`${ config.apiUrl }/audits`);
    }

    create(Audit: Audit)
    {
        return this.http.post(`${ config.apiUrl }/audits`, Audit);
    }

    delete(id: number)
    {
        return this.http.delete(`${ config.apiUrl }/audits/${ id }`);
    }
}