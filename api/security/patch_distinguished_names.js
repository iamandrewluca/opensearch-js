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

const { normalizeArguments, handleMissingParam } = require('../utils');

/**
 * Bulk update of distinguished names. Only accessible to super-admins and with rest-api permissions when enabled.
 * <br/> See Also: {@link https://opensearch.org/docs/latest/security/access-control/api/#update-all-distinguished-names - security.patch_distinguished_names}
 *
 * @memberOf API-Security
 *
 * @param {object} params
 * @param {array} params.body 
 *
 * @param {TransportRequestOptions} [options] - Options for {@link Transport#request}
 * @param {function} [callback] - Callback that handles errors and response
 *
 * @returns {{abort: function(), then: function(), catch: function()}|Promise<never>|*}
 */
function patchDistinguishedNamesFunc(params, options, callback) {
  [params, options, callback] = normalizeArguments(params, options, callback);
  if (params.body == null) return handleMissingParam('body', this, callback);

  let { body, ...querystring } = params;

  const path = '/_plugins/_security/api/nodesdn';
  const method = 'PATCH';

  return this.transport.request({ method, path, querystring, body }, options, callback);
};

module.exports = patchDistinguishedNamesFunc;
