/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Machine } from '../models/machine';

@Injectable({
  providedIn: 'root',
})
export class MachinesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation machinesControllerGetMachines
   */
  static readonly MachinesControllerGetMachinesPath = '/machines';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `machinesControllerGetMachines()` instead.
   *
   * This method doesn't expect any request body.
   */
  machinesControllerGetMachines$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Machine>>> {

    const rb = new RequestBuilder(this.rootUrl, MachinesService.MachinesControllerGetMachinesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Machine>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `machinesControllerGetMachines$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  machinesControllerGetMachines(params?: {
    context?: HttpContext
  }
): Observable<Array<Machine>> {

    return this.machinesControllerGetMachines$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Machine>>) => r.body as Array<Machine>)
    );
  }

}
