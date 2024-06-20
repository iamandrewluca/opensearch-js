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
 * Send a test notification.
 * <br/> See Also: {@link https://opensearch.org/docs/latest/observing-your-data/notifications/api/#send-test-notification - notifications.send_test}
 *
 * @memberOf API-Notifications
 *
 * @param {object} params
 * @param {string} params.config_id 
 *
 * @param {TransportRequestOptions} [options] - Options for {@link Transport#request}
 * @param {function} [callback] - Callback that handles errors and response
 *
 * @returns {{abort: function(), then: function(), catch: function()}|Promise<never>|*}
 */
function sendTestFunc(params, options, callback) {
  [params, options, callback] = normalizeArguments(params, options, callback);
  if (params.config_id == null) return handleMissingParam('config_id', this, callback);

  let { body, config_id, ...querystring } = params;
  config_id = parsePathParam(config_id);

  const path = '/_plugins/_notifications/feature/test/' + config_id;
  const method = body ? 'POST' : 'GET';
  body = body || '';

  return this.transport.request({ method, path, querystring, body }, options, callback);
};

module.exports = sendTestFunc;
