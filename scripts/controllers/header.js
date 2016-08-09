'use strict';

SwaggerEditor.controller('HeaderCtrl', function HeaderCtrl($scope, $uibModal,
  $stateParams, $state, $rootScope, Storage, Builder, FileLoader, Editor,
  Preferences, YAML, defaults, strings, $localStorage) {
  if ($stateParams.path) {
    $scope.breadcrumbs = [{active: true, name: $stateParams.path}];
  } else {
    $scope.breadcrumbs = [];
  }

  // var statusTimeout;
  $rootScope.$watch('progressStatus', function(progressStatus) {
    var status = strings.stausMessages[progressStatus];
    var statusClass = null;

    if (/success/.test(progressStatus)) {
      statusClass = 'success';
    }

    if (/error/.test(progressStatus)) {
      statusClass = 'error';
    }

    if (/working/.test(progressStatus)) {
      statusClass = 'working';
    }

    $scope.status = status;
    $scope.statusClass = statusClass;
  });

  // Show the intro if it's first time visit
  $localStorage.$default({
    showIntro: !defaults.disableNewUserIntro
  });
  $rootScope.showAbout = $localStorage.showIntro;

  $scope.showFileMenu = function() {
    return !defaults.disableFileMenu;
  };

  $scope.showHeaderBranding = function() {
    return defaults.headerBranding;
  };

  $scope.newProject = function() {
    FileLoader.loadFromUrl('examples/docker/login/op.yml')
      .then(function(value) {
        $rootScope.editorValue = value;
        Storage.save('yaml', value);
        $state.go('home', {tags: null});
      });
  };

  $scope.onFileMenuOpen = function() {
    assignDownloadHrefs();
    $rootScope.$broadcast('toggleWatchers', false);
  };

  $scope.openImportFile = function() {
    $uibModal.open({
      template: require('templates/file-import.html'),
      controller: 'FileImportCtrl',
      size: 'large'
    });
  };

  $scope.openImportUrl = function() {
    $uibModal.open({
      template: require('templates/url-import.html'),
      controller: 'UrlImportCtrl',
      size: 'large'
    });
  };

  $scope.openAbout = function() {
    $uibModal.open({
      template: require('templates/about.html'),
      size: 'large',
      controller: 'ModalCtrl'
    });
  };

  $rootScope.toggleAboutEditor = function(value) {
    $rootScope.showAbout = value;
    $localStorage.showIntro = value;
  };

  $scope.openEditorPreferences = Editor.showSettings;
  $scope.resetSettings = function() {
    $uibModal.open({
      template: require('templates/reset-editor.html'),
      controller: 'ConfirmReset',
      size: 'large'
    });
  };
  $scope.adjustFontSize = Editor.adjustFontSize;

  $scope.openExamples = function() {
    $uibModal.open({
      template: require('templates/open-examples.html'),
      controller: 'OpenExamplesCtrl',
      size: 'large'
    });
  };

  $scope.openPreferences = function() {
    $uibModal.open({
      template: require('templates/preferences.html'),
      controller: 'PreferencesCtrl',
      size: 'large'
    });
  };

  $scope.isLiveRenderEnabled = function() {
    return Boolean(Preferences).get('liveRender');
  };

  /** */
  function assignDownloadHrefs() {
    var MIME_TYPE = 'text/plain';

    var yaml = $rootScope.editorValue;
    YAML.load(yaml, function(error, json) {
      // Don't assign if there is an error
      if (error) {
        // return;
      }

      var assign = function(yaml) {
        var yamlBlob = new Blob([yaml], {type: MIME_TYPE});
        $scope.yamlDownloadHref = window.URL.createObjectURL(yamlBlob);
        $scope.yamlDownloadUrl = [
          MIME_TYPE,
          'op.yml',
          $scope.yamlDownloadHref
        ].join(':');
      };

      YAML.dump(json, function(error, yamlStr) {
        assign(yamlStr);
      });
    });
  }
});
