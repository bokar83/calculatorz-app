import { test } from 'node:test'
import assert from 'node:assert/strict'
import { APP_VERSION, APP_UPDATED, APP_VERSION_LABEL } from '../lib/version.ts'

test('version constant renders in the footer label', () => {
  assert.match(APP_VERSION, /^v\d+(\.\d+)?$/)
  assert.equal(APP_VERSION_LABEL, `Version ${APP_VERSION} \u00b7 updated ${APP_UPDATED}`)
})
