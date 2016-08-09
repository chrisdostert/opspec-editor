/*
 * Test defaults
*/

'use strict';

SwaggerEditor.config(function($provide) {
  $provide.constant('defaults', {
    examplesFolder: 'examples/',
    editorOptions: {},
    exampleFiles: [
      "docker/build/op.yml",
      "docker/build-login-push/op.yml",
      "docker/login/op.yml",
      "docker/push/op.yml",
      "nodejs/debug/op.yml",
      "nodejs/debug-node/op.yml",
      "nodejs/install-deps/op.yml"
    ],
    autocompleteExtension: {},
    useBackendForStorage: false,
    backendEndpoint: '/editor/spec',
    useYamlBackend: false,
    disableFileMenu: false,
    headerBranding: false,
    enableTryIt: true,
    brandingCssClass: '',
    importProxyUrl: 'https://cors-it.herokuapp.com/?url='
  });
});
