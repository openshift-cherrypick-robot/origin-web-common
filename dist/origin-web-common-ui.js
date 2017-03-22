/**
 * @name  openshiftCommonUI
 *
 * @description
 *   Base module for openshiftCommonUI.
 */
angular.module('openshiftCommonUI', []);


hawtioPluginLoader.addModule('openshiftCommonUI');
;angular.module('openshiftCommonUI').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/create-project/createProject.html',
    "<form name=\"createProjectForm\">\n" +
    "  <fieldset ng-disabled=\"disableInputs\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\" class=\"required\">Name</label>\n" +
    "      <span ng-class=\"{'has-error': (createProjectForm.name.$error.pattern && createProjectForm.name.$touched) || nameTaken}\">\n" +
    "        <input class=\"form-control input-lg\"\n" +
    "            name=\"name\"\n" +
    "            id=\"name\"\n" +
    "            placeholder=\"my-project\"\n" +
    "            type=\"text\"\n" +
    "            required\n" +
    "            take-focus\n" +
    "            minlength=\"2\"\n" +
    "            maxlength=\"63\"\n" +
    "            pattern=\"[a-z0-9]([-a-z0-9]*[a-z0-9])?\"\n" +
    "            aria-describedby=\"nameHelp\"\n" +
    "            ng-model=\"name\"\n" +
    "            ng-model-options=\"{ updateOn: 'default blur' }\"\n" +
    "            ng-change=\"nameTaken = false\"\n" +
    "            autocorrect=\"off\"\n" +
    "            autocapitalize=\"off\"\n" +
    "            spellcheck=\"false\">\n" +
    "      </span>\n" +
    "      <div>\n" +
    "        <span class=\"help-block\">A unique name for the project.</span>\n" +
    "      </div>\n" +
    "      <div class=\"has-error\">\n" +
    "        <span id=\"nameHelp\" class=\"help-block\" ng-if=\"createProjectForm.name.$error.minlength && createProjectForm.name.$touched\">\n" +
    "          Name must have at least two characters.\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"has-error\">\n" +
    "        <span id=\"nameHelp\" class=\"help-block\" ng-if=\"createProjectForm.name.$error.pattern && createProjectForm.name.$touched\">\n" +
    "          Project names may only contain lower-case letters, numbers, and dashes.\n" +
    "          They may not start or end with a dash.\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"has-error\">\n" +
    "        <span class=\"help-block\" ng-if=\"nameTaken\">\n" +
    "          This name is already in use. Please choose a different name.\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"displayName\">Display Name</label>\n" +
    "      <input class=\"form-control input-lg\"\n" +
    "          name=\"displayName\"\n" +
    "          id=\"displayName\"\n" +
    "          placeholder=\"My Project\"\n" +
    "          type=\"text\"\n" +
    "          ng-model=\"displayName\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"description\">Description</label>\n" +
    "      <textarea class=\"form-control input-lg\"\n" +
    "          name=\"description\"\n" +
    "          id=\"description\"\n" +
    "          placeholder=\"A short description.\"\n" +
    "          ng-model=\"description\"></textarea>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"button-group\">\n" +
    "      <button type=\"submit\"\n" +
    "          class=\"btn btn-primary btn-lg\"\n" +
    "          ng-class=\"{'dialog-btn': isDialog}\"\n" +
    "          ng-click=\"createProject()\"\n" +
    "          ng-disabled=\"createProjectForm.$invalid || nameTaken || disableInputs\"\n" +
    "          value=\"\">\n" +
    "        {{submitButtonLabel}}\n" +
    "      </button>\n" +
    "      <button\n" +
    "          class=\"btn btn-default btn-lg\"\n" +
    "          ng-class=\"{'dialog-btn': isDialog}\"\n" +
    "          back\n" +
    "          ng-click=\"cancelCreateProject()\">\n" +
    "        Cancel\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </fieldset>\n" +
    "</form>\n"
  );


  $templateCache.put('src/components/delete-link/delete-button.html',
    "<div class=\"actions\">\n" +
    "  <!-- Avoid whitespace inside the link -->\n" +
    "  <a href=\"\"\n" +
    "     ng-click=\"$event.stopPropagation(); openDeleteModal()\"\n" +
    "     role=\"button\"\n" +
    "     class=\"action-button\"\n" +
    "     ng-attr-aria-disabled=\"{{disableDelete ? 'true' : undefined}}\"\n" +
    "     ng-class=\"{ 'disabled-link': disableDelete }\"\n" +
    "    ><i class=\"fa fa-trash-o\" aria-hidden=\"true\"\n" +
    "    ></i><span class=\"sr-only\">Delete {{kind | humanizeKind}} {{resourceName}}</span></a>\n" +
    "</div>\n"
  );


  $templateCache.put('src/components/delete-link/delete-link.html',
    "<a href=\"javascript:void(0)\"\n" +
    "   ng-click=\"openDeleteModal()\"\n" +
    "   role=\"button\"\n" +
    "   ng-attr-aria-disabled=\"{{disableDelete ? 'true' : undefined}}\"\n" +
    "   ng-class=\"{ 'disabled-link': disableDelete }\"\n" +
    ">{{label || 'Delete'}}</a>\n"
  );


  $templateCache.put('src/components/delete-link/delete-resource.html',
    "<div class=\"delete-resource-modal\">\n" +
    "  <!-- Use a form so that the enter key submits when typing a project name to confirm. -->\n" +
    "  <form>\n" +
    "    <div class=\"modal-body\">\n" +
    "      <h1>Are you sure you want to delete the {{typeDisplayName || (kind | humanizeKind)}}\n" +
    "        '<strong>{{displayName ? displayName : resourceName}}</strong>'?</h1>\n" +
    "      <div ng-if=\"replicas\" class=\"alert alert-warning\">\n" +
    "        <span class=\"pficon pficon-warning-triangle-o\" aria-hidden=\"true\"></span>\n" +
    "        <span class=\"sr-only\">Warning:</span>\n" +
    "        <strong>{{resourceName}}</strong> has running pods.  Deleting the\n" +
    "        {{typeDisplayName || (kind | humanizeKind)}} will <strong>not</strong> delete the pods\n" +
    "        it controls. Consider scaling the {{typeDisplayName || (kind | humanizeKind)}} down to\n" +
    "        0 before continuing.\n" +
    "      </div>\n" +
    "\n" +
    "      <p>This<span ng-if=\"isProject\"> will <strong>delete all resources</strong> associated with\n" +
    "      the project {{displayName ? displayName : resourceName}} and</span> <strong>cannot be\n" +
    "      undone</strong>.  Make sure this is something you really want to do!</p>\n" +
    "\n" +
    "      <div ng-show=\"typeNameToConfirm\">\n" +
    "        <p>Type the name of the {{typeDisplayName || (kind | humanizeKind)}} to confirm.</p>\n" +
    "        <p>\n" +
    "          <label class=\"sr-only\" for=\"resource-to-delete\">{{typeDisplayName || (kind | humanizeKind)}} to delete</label>\n" +
    "          <input\n" +
    "              ng-model=\"confirmName\"\n" +
    "              id=\"resource-to-delete\"\n" +
    "              type=\"text\"\n" +
    "              class=\"form-control input-lg\"\n" +
    "              autocorrect=\"off\"\n" +
    "              autocapitalize=\"off\"\n" +
    "              spellcheck=\"false\"\n" +
    "              autofocus>\n" +
    "        </p>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-switch=\"kind\">\n" +
    "        <div ng-switch-when=\"Deployment\">\n" +
    "          <strong>Note:</strong> None of the replica sets created by this deployment will be deleted.\n" +
    "\n" +
    "          To delete the deployment and all of its replica sets, you can run the command\n" +
    "          <pre class=\"code prettyprint mar-top-md\">oc delete deployment {{resourceName}} -n {{projectName}}</pre>\n" +
    "          Learn more about the <a href=\"command-line\">command line tools</a>.\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-switch-when=\"DeploymentConfig\">\n" +
    "          <strong>Note:</strong> None of the deployments created by this deployment config will be deleted.\n" +
    "\n" +
    "          To delete the deployment config and all of its deployments, you can run the command\n" +
    "          <pre class=\"code prettyprint mar-top-md\">oc delete dc {{resourceName}} -n {{projectName}}</pre>\n" +
    "          Learn more about the <a href=\"command-line\">command line tools</a>.\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-switch-when=\"BuildConfig\">\n" +
    "          <strong>Note:</strong> None of the builds created by this build config will be deleted.\n" +
    "\n" +
    "          To delete the build config and all of its builds, you can run the command\n" +
    "          <pre class=\"code prettyprint mar-top-md\">oc delete bc {{resourceName}} -n {{projectName}}</pre>\n" +
    "          Learn more about the <a href=\"command-line\">command line tools</a>.\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <!--\n" +
    "        If this is a deployment config or replication controller with associated HPAs, prompt to\n" +
    "        delete the HPAs as well.\n" +
    "      -->\n" +
    "      <div ng-if=\"hpaList.length > 0\">\n" +
    "        <p>\n" +
    "          <span ng-if=\"hpaList.length === 1\">\n" +
    "            This resource has an autoscaler associated with it.\n" +
    "            It is recommended you delete the autoscaler with the resource it scales.\n" +
    "          </span>\n" +
    "          <span ng-if=\"hpaList.length > 1\">\n" +
    "            This resource has autoscalers associated with it.\n" +
    "            It is recommended you delete the autoscalers with the resource they scale.\n" +
    "          </span>\n" +
    "        </p>\n" +
    "        <label>\n" +
    "          <input type=\"checkbox\" ng-model=\"options.deleteHPAs\">\n" +
    "          Delete\n" +
    "          <span ng-if=\"hpaList.length === 1\">\n" +
    "            Horizontal Pod Autoscaler '<strong>{{hpaList[0].metadata.name}}</strong>'\n" +
    "          </span>\n" +
    "          <span ng-if=\"hpaList.length > 1\">\n" +
    "            {{hpaList.length}} associated Horizontal Pod Autoscalers\n" +
    "          </span>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "      <button ng-disabled=\"typeNameToConfirm && confirmName !== resourceName && confirmName !== displayName\" class=\"btn btn-lg btn-danger\" type=\"submit\" ng-click=\"delete();\">Delete</button>\n" +
    "      <button class=\"btn btn-lg btn-default\" type=\"button\" ng-click=\"cancel();\">Cancel</button>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n"
  );


  $templateCache.put('src/components/edit-project/editProject.html',
    "<form name=\"editProjectForm\">\n" +
    "  <fieldset ng-disabled=\"disableInputs\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"displayName\">Display Name</label>\n" +
    "      <input class=\"form-control input-lg\"\n" +
    "             name=\"displayName\"\n" +
    "             id=\"displayName\"\n" +
    "             placeholder=\"My Project\"\n" +
    "             type=\"text\"\n" +
    "             ng-model=\"editableFields.displayName\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"description\">Description</label>\n" +
    "                    <textarea class=\"form-control input-lg\"\n" +
    "                              name=\"description\"\n" +
    "                              id=\"description\"\n" +
    "                              placeholder=\"A short description.\"\n" +
    "                              ng-model=\"editableFields.description\"></textarea>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"button-group\">\n" +
    "      <button type=\"submit\"\n" +
    "              class=\"btn btn-primary btn-lg\"\n" +
    "              ng-class=\"{'dialog-btn': isDialog}\"\n" +
    "              ng-click=\"update()\"\n" +
    "              ng-disabled=\"editProjectForm.$invalid || disableInputs\"\n" +
    "              value=\"\">{{submitButtonLabel}}</button>\n" +
    "      <button\n" +
    "          class=\"btn btn-default btn-lg\"\n" +
    "          ng-class=\"{'dialog-btn': isDialog}\"\n" +
    "          back\n" +
    "          ng-click=\"cancelEditProject()\">\n" +
    "        Cancel\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </fieldset>\n" +
    "</form>\n"
  );

}]);
;"use strict";

angular.module("openshiftCommonUI")

  .directive("createProject", function() {
    return {
      restrict: 'E',
      scope: {
        alerts: '=',
        submitButtonLabel: '@',
        redirectAction: '&',
        onCancel: '&?',
        isDialog: '@'
      },
      templateUrl: 'src/components/create-project/createProject.html',
      controller: function($scope, $filter, $location, DataService) {
        if(!($scope.submitButtonLabel)) {
          $scope.submitButtonLabel = 'Create';
        }

        $scope.isDialog = $scope.isDialog === 'true';

        $scope.createProject = function() {
          $scope.disableInputs = true;
          if ($scope.createProjectForm.$valid) {
            DataService
              .create('projectrequests', null, {
                apiVersion: "v1",
                kind: "ProjectRequest",
                metadata: {
                  name: $scope.name
                },
                displayName: $scope.displayName,
                description: $scope.description
              }, $scope)
              .then(function(data) {
                // angular is actually wrapping the redirect action
                var cb = $scope.redirectAction();
                if (cb) {
                  cb(encodeURIComponent(data.metadata.name));
                } else {
                  $location.path("project/" + encodeURIComponent(data.metadata.name) + "/create");
                }
              }, function(result) {
                $scope.disableInputs = false;
                var data = result.data || {};
                if (data.reason === 'AlreadyExists') {
                  $scope.nameTaken = true;
                } else {
                  var msg = data.message || 'An error occurred creating the project.';
                  $scope.alerts['error-creating-project'] = {type: 'error', message: msg};
                }
              });
          }
        };

        $scope.cancelCreateProject = function() {
          if ($scope.onCancel) {
            var cb = $scope.onCancel();
            if (cb) {
              cb();
            }
          }
        };
      },
    };
  });
;'use strict';

angular.module("openshiftCommonUI")
  .directive("deleteLink", function ($uibModal, $location, $filter, $q, hashSizeFilter, APIService, DataService, AlertMessageService, Logger) {
    return {
      restrict: "E",
      scope: {
        // Resource Kind to delete (e.g., "Pod" or "ReplicationController").
        kind: "@",
        // Optional resource group.
        group: "@?",
        // Optional display name for kind.
        typeDisplayName: "@?",
        // Name of the resource to delete.
        resourceName: "@",
        // The name of the resource's project. Optional if kind === "Project".
        projectName: "@",
        // Alerts object for success and error alerts.
        alerts: "=",
        // Optional display name of the resource to delete.
        displayName: "@",
        // Set to true to disable the delete button.
        disableDelete: "=?",
        // Force the user to enter the name before we'll delete the resource (e.g. for projects).
        typeNameToConfirm: "=?",
        // Optional link label. Defaults to "Delete".
        label: "@?",
        // Only show a delete icon with no text.
        buttonOnly: "@",
        // Stay on the current page without redirecting to the resource list.
        stayOnCurrentPage: "=?",
        // Optional replica count for a resource like a ReplicationController or ReplicaSet to display a warning.
        replicas: '=?',
        // Array of associated HPAs for this resource. If set, prompts the user to delete the HPA resources as well.
        hpaList: "=?",
        // Optional callback when the delete succeeds
        success: "=?",
        // Optional redirect URL when the delete succeeds
        redirectUrl: "@?"
      },
      templateUrl: function(elem, attr) {
        if (angular.isDefined(attr.buttonOnly)) {
          return "src/components/delete-link/delete-button.html";
        }

        return "src/components/delete-link/delete-link.html";
      },
      // Replace so ".dropdown-menu > li > a" styles are applied.
      replace: true,
      link: function(scope, element, attrs) {
        if (attrs.kind === 'Project') {
          scope.isProject = true;
        }

        // Checkbox value
        scope.options = {
          deleteHPAs: true
        };

        var showAlert = function(alert) {
          if (scope.stayOnCurrentPage) {
            scope.alerts[alert.name] = alert.data;
          } else {
            AlertMessageService.addAlert(alert);
          }
        };

        var deleteHPA = function(hpa) {
          return DataService.delete({
            resource: 'horizontalpodautoscalers',
            group: 'extensions'
          }, hpa.metadata.name, { namespace: scope.projectName })
          .then(function() {
            showAlert({
              name: hpa.metadata.name,
              data: {
                type: "success",
                message: "Horizontal Pod Autoscaler " + hpa.metadata.name + " was marked for deletion."
              }
            });
          })
          .catch(function(err) {
            showAlert({
              name: hpa.metadata.name,
              data: {
                type: "error",
                message: "Horizontal Pod Autoscaler " + hpa.metadata.name + " could not be deleted."
              }
            });
            Logger.error("HPA " + hpa.metadata.name + " could not be deleted.", err);
          });
        };

        var navigateToList = function() {
          if (scope.stayOnCurrentPage) {
            return;
          }

          if (scope.redirectUrl) {
            $location.url(scope.redirectUrl);
            return;
          }

          if (scope.kind !== 'Project') {
            $location.url(this.resourceListURL(APIService.kindToResource(scope.kind), scope.projectName));
            return;
          }

          if ($location.path() === '/') {
            scope.$emit('deleteProject');
            return;
          }

          var homeRedirect = URI('/');
          $location.url(homeRedirect);
        };

        scope.openDeleteModal = function() {
          if (scope.disableDelete) {
            return;
          }

          // opening the modal with settings scope as parent
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'src/components/delete-link/delete-resource.html',
            controller: 'DeleteModalController',
            scope: scope
          });

          modalInstance.result.then(function() {
            // upon clicking delete button, delete resource and send alert
            var kind = scope.kind;
            var resourceName = scope.resourceName;
            var typeDisplayName = scope.typeDisplayName || $filter('humanizeKind')(kind);
            var formattedResource = typeDisplayName + ' ' + "\'"  + (scope.displayName ? scope.displayName : resourceName) + "\'";
            var context = (scope.kind === 'Project') ? {} : {namespace: scope.projectName};

            DataService.delete({
              resource: APIService.kindToResource(kind),
              // group or undefined
              group: scope.group
            }, resourceName, context)
            .then(function() {
              showAlert({
                name: resourceName,
                data: {
                  type: "success",
                  message: _.capitalize(formattedResource) + " was marked for deletion."
                }
              });

              if (scope.success) {
                scope.success();
              }

              // Delete any associated HPAs if requested.
              var promises = [];
              if (scope.options.deleteHPAs) {
                _.forEach(scope.hpaList, function(hpa) {
                  promises.push(deleteHPA(hpa));
                });
              }

              if (!promises.length) {
                navigateToList();
              } else {
                // Wait until all promises resolve so that we can add alerts to
                // AlertMessageService before navigating, otherwise they aren't
                // displayed.
                $q.all(promises).then(navigateToList);
              }
            })
            .catch(function(err) {
              // called if failure to delete
              scope.alerts[resourceName] = {
                type: "error",
                message: _.capitalize(formattedResource) + "\'" + " could not be deleted.",
                details: $filter('getErrorDetails')(err)
              };
              Logger.error(formattedResource + " could not be deleted.", err);
            });
          });
        };
      }
    };
  });

;'use strict';
/* jshint unused: false */

/**
 * @ngdoc function
 * @name openshifgCommonUI.controller:DeleteModalController
 */
angular.module('openshiftCommonUI')
  .controller('DeleteModalController', function ($scope, $uibModalInstance) {
    $scope.delete = function() {
      $uibModalInstance.close('delete');
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
;"use strict";

angular.module("openshiftCommonUI")

  .directive("editProject", function() {
    return {
      restrict: 'E',
      scope: {
        project: '=',
        alerts: '=',
        submitButtonLabel: '@',
        redirectAction: '&',
        onCancel: '&',
        isDialog: '@'
      },
      templateUrl: 'src/components/edit-project/editProject.html',
      controller: function($scope, $filter, $location, DataService, annotationNameFilter) {
        if(!($scope.submitButtonLabel)) {
          $scope.submitButtonLabel = 'Save';
        }

        $scope.isDialog = $scope.isDialog === 'true';

        var annotation = $filter('annotation');
        var annotationName = $filter('annotationName');

        var editableFields = function(resource) {
          return {
            description: annotation(resource, 'description'),
            displayName: annotation(resource, 'displayName')
          };
        };

        var mergeEditable = function(project, editable) {
          var toSubmit = angular.copy(project);
          toSubmit.metadata.annotations[annotationName('description')] = editable.description;
          toSubmit.metadata.annotations[annotationName('displayName')] = editable.displayName;
          return toSubmit;
        };

        var cleanEditableAnnotations = function(resource) {
          var paths = [
            annotationNameFilter('description'),
            annotationNameFilter('displayName')
          ];
          _.each(paths, function(path) {
            if(!resource.metadata.annotations[path]) {
              delete resource.metadata.annotations[path];
            }
          });
          return resource;
        };

        $scope.editableFields = editableFields($scope.project);

        $scope.update = function() {
          $scope.disableInputs = true;
          if ($scope.editProjectForm.$valid) {
            DataService
              .update(
                'projects',
                $scope.project.metadata.name,
                cleanEditableAnnotations(mergeEditable($scope.project, $scope.editableFields)),
                {projectName: $scope.project.name},
                {errorNotification: false})
              .then(function() {
                // angular is actually wrapping the redirect action :/
                var cb = $scope.redirectAction();
                if (cb) {
                  cb(encodeURIComponent($scope.project.metadata.name));
                }
              }, function(result) {
                $scope.disableInputs = false;
                $scope.editableFields = editableFields($scope.project);
                $scope.alerts["update"] = {
                  type: "error",
                  message: "An error occurred while updating the project",
                  details: $filter('getErrorDetails')(result)
                };
              });
          }
        };

        $scope.cancelEditProject = function() {
          var cb = $scope.onCancel();
          if (cb) {
            cb();
          }
        };
      },
    };
  });
;'use strict';

angular.module('openshiftCommonUI')
  // The HTML5 `autofocus` attribute does not work reliably with Angular,
  // so define our own directive
  .directive('takeFocus', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        // Add a delay to allow other asynchronous components to load.
        $timeout(function() {
          $(element).focus();
        }, 300);
      }
    };
  });