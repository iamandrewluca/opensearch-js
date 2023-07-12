/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { expectType, expectNotType, expectError } from 'tsd';
import {
  Client,
  RequestEvent,
  ResurrectEvent,
  ApiError,
  ApiResponse,
  opensearchtypes,
} from '../../';
import type { Client as NewTypes } from '../../api/new';
import { TransportRequestPromise, Context } from '../../lib/Transport';

// @ts-expect-error
const client: NewTypes = new Client({
  node: 'http://localhost:9200',
});

client.on('request', (err, meta) => {
  expectType<ApiError>(err);
  expectType<RequestEvent>(meta);
});

client.on('response', (err, meta) => {
  expectType<ApiError>(err);
  expectType<RequestEvent>(meta);
});

client.on('sniff', (err, meta) => {
  expectType<ApiError>(err);
  expectType<RequestEvent>(meta);
});

client.on('resurrect', (err, meta) => {
  expectType<null>(err);
  expectType<ResurrectEvent>(meta);
});

// No generics
{
  const response = await client.cat.count({ index: 'test' });

  expectType<opensearchtypes.CatCountResponse>(response.body);
  expectType<Context>(response.meta.context);
}

// Define only the context
{
  const response = await client.cat.count<string>({ index: 'test' });

  expectType<opensearchtypes.CatCountResponse>(response.body);
  expectType<string>(response.meta.context);
}

// Check API returned type and optional parameters
{
  const promise = client.info();
  expectType<TransportRequestPromise<ApiResponse<opensearchtypes.InfoResponse, Context>>>(promise);
  promise
    .then((result) => expectType<ApiResponse<opensearchtypes.InfoResponse, Context>>(result))
    .catch((err: ApiError) => expectType<ApiError>(err));
  expectType<void>(promise.abort());
}

{
  const promise = client.info({ pretty: true });
  expectType<TransportRequestPromise<ApiResponse<opensearchtypes.InfoResponse, Context>>>(promise);
  promise
    .then((result) => expectType<ApiResponse<opensearchtypes.InfoResponse, Context>>(result))
    .catch((err: ApiError) => expectType<ApiError>(err));
  expectType<void>(promise.abort());
}

{
  const promise = client.info({ pretty: true }, { ignore: [404] });
  expectType<TransportRequestPromise<ApiResponse<opensearchtypes.InfoResponse, Context>>>(promise);
  promise
    .then((result) => expectType<ApiResponse<opensearchtypes.InfoResponse, Context>>(result))
    .catch((err: ApiError) => expectType<ApiError>(err));
  expectType<void>(promise.abort());
}

// body that does not respect the RequestBody constraint
expectError(
  client
    .search({
      index: 'hello',
      body: 42,
    })
    .then(console.log)
);

// @ts-expect-error
client.async_search.get();

// the child api should return a OpenSearchDashboardsClient instance
const child = client.child();
expectType<NewTypes>(child);
expectNotType<Client>(child);
