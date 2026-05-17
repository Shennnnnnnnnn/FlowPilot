const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('sidepanel exposes a temporary disable action for each workflow node', () => {
  const source = fs.readFileSync('sidepanel/sidepanel.js', 'utf8');
  const css = fs.readFileSync('sidepanel/sidepanel.css', 'utf8');

  assert.match(source, /TEMPORARY_DISABLE_NODE/);
  assert.match(source, /step-disable-btn/);
  assert.match(source, /isNodeTemporarilyDisabled/);
  assert.match(css, /\.step-row\.temporarily-disabled/);
});

test('background auto-run skips temporarily disabled workflow nodes', () => {
  const source = fs.readFileSync('background.js', 'utf8');
  const router = fs.readFileSync('background/message-router.js', 'utf8');

  assert.match(router, /case 'TEMPORARY_DISABLE_NODE'/);
  assert.match(source, /function isNodeTemporarilyDisabled/);
  assert.match(source, /skipTemporarilyDisabledNode/);
  assert.match(source, /临时禁用/);
});

test('auto-run fresh restart preserves temporarily disabled workflow nodes', () => {
  const source = fs.readFileSync('background/auto-run-controller.js', 'utf8');

  assert.match(source, /disabledNodeIds:\s*prevState\.disabledNodeIds/);
});
