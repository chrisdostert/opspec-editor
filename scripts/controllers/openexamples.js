'use strict';

var _ = require('lodash');

SwaggerEditor.controller('OpenExamplesCtrl', function OpenExamplesCtrl($scope,
  $uibModalInstance, $rootScope, $state, FileLoader, Builder, LocalStorage,
  defaults) {
  $scope.files = defaults.exampleFiles;
  $scope.selectedFile = defaults.exampleFiles[0];

  $scope.open = function(file) {
    // removes trailing slash from pathname because examplesFolder always have a
    // leading slash
    var pathname = _.endsWith(location.pathname, '/') ?
      location.pathname.substring(1) :
      location.pathname;

    var url = '/' + pathname + defaults.examplesFolder + file;

    FileLoader.loadFromUrl(url).then(function(value) {
      LocalStorage.save('yaml', value);
      $rootScope.editorValue = value;
      $state.go('home', {tags: null});
      $uibModalInstance.close();
    }, $uibModalInstance.close);
  };

  $scope.cancel = $uibModalInstance.close;
});
