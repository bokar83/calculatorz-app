import { test } from 'node:test'
import assert from 'node:assert/strict'
import { APP_VERSION, APP_VERSION_LABEL } from '../lib/version.ts'

test('version constant renders in the footer label', () => {
  assert.equal(APP_VERSION, 'v3')
  assert.match(APP_VERSION_LABEL, /^Version v3 \u00b7 updated \d{4}-\d{2}-\d{2}$/)
})
