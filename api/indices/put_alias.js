/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 */

/*
 * This file was generated from OpenSearch API Spec. Do not edit it
 * manually. If you want to make changes, either update the spec or
 * the API generator.
 */

'use strict'

const { normalizeArguments, parsePathParam, handleMissingParam } = require('../utils');

/**
 * Creates or updates an alias.
 * <br/> See Also: {@link https://opensearch.org/docs/latest/im-plugin/index-alias/#create-aliases - indices.put_alias}
 *
 * @memberOf API-Indices
 *
 * @param {object} params
 * @param {string} [params.timeout] - Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
 * @param {string} [params.master_timeout] DEPRECATED - Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
 * @param {string} [params.cluster_manager_timeout] - Operation timeout for connection to cluster-manager node.
 * @param {string} params.index - Comma-separated list of data streams or indices to add. Supports wildcards (`*`). Wildcard patterns that match both data streams and indices return an error.
 * @param {string} params.name - Alias to update. If the alias doesn’t exist, the request creates it. Index alias names support date math.
 * @param {object} [params.body] - The settings for the alias, such as `routing` or `filter`
 *
 * @param {TransportRequestOptions} [options] - Options for {@link Transport#request}
 * @param {function} [callback] - Callback that handles errors and response
 *
 * @returns {{abort: function(), then: function(), catch: function()}|Promise<never>|*}
 */
function putAliasFunc(params, options, callback) {
  [params, options, callback] = normalizeArguments(params, options, callback);
  if (params.index == null) return handleMissingParam('index', this, callback);
  if (params.name == null) return handleMissingParam('name', this, callback);

  let { body, index, name, ...querystring } = params;
  index = parsePathParam(index);
  name = parsePathParam(name);

  const path = '/' + index + '/_aliases/' + name;
  const method = 'POST';
  body = body || '';

  return this.transport.request({ method, path, querystring, body }, options, callback);
};

module.exports = putAliasFunc;
