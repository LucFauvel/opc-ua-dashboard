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

import { CreateMachineDto } from '../models/create-machine-dto';
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

  /**
   * Path part for operation machinesControllerCreateMachine
   */
  static readonly MachinesControllerCreateMachinePath = '/machines';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `machinesControllerCreateMachine()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  machinesControllerCreateMachine$Response(params: {
    context?: HttpContext
    body: CreateMachineDto
  }
): Observable<StrictHttpResponse<Machine>> {

    const rb = new RequestBuilder(this.rootUrl, MachinesService.MachinesControllerCreateMachinePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Machine>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `machinesControllerCreateMachine$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  machinesControllerCreateMachine(params: {
    context?: HttpContext
    body: CreateMachineDto
  }
): Observable<Machine> {

    return this.machinesControllerCreateMachine$Response(params).pipe(
      map((r: StrictHttpResponse<Machine>) => r.body as Machine)
    );
  }

  /**
   * Path part for operation machinesControllerRemove
   */
  static readonly MachinesControllerRemovePath = '/machines/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `machinesControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  machinesControllerRemove$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, MachinesService.MachinesControllerRemovePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `machinesControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  machinesControllerRemove(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.machinesControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
