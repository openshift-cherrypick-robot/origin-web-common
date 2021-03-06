describe("Filter: serviceInstanceFailedMessage", function() {
  'use strict';

  var serviceInstanceFailedMessageFilter;

  var mockServiceInstance = {
    "apiVersion": "servicecatalog.k8s.io/v1beta1",
    "kind": "ServceInstance",
    "metadata": {
      "name": "mariadb-persistent-6q4zn",
      "namespace": "test",
      "uid": "6a31b3ce-aec9-11e7-bae6-0242ac110002",
    },
    "spec": {
      "clusterServiceClassExternalName": "mariadb-persistent",
      "clusterServicePlanExternalName": "default",
      "clusterServiceClassRef": {
        "name": "475554bf-aec9-11e7-8d0c-b6c718ff6445",
        "uid": "581f692a-aec9-11e7-bae6-0242ac110002",
        "resourceVersion": "20"
      },
      "clusterServicePlanRef": {
        "name": "475554bf-aec9-11e7-8d0c-b6c718ff6445",
        "uid": "5704c949-aec9-11e7-bae6-0242ac110002",
        "resourceVersion": "8"
      },
      "parametersFrom": [
        {
          "secretKeyRef": {
            "name": "mariadb-persistent-parameters-s6zzf",
            "key": "parameters"
          }
        }
      ],
      "externalID": "8066697b-530b-486d-a6e2-5ff2b8d8febb",
      "updateRequests": 0
    },
    "status": {
      "conditions": []
    }
  };

  var failedCondition = {
    "type": "Failed",
    "status": "True",
    "lastTransitionTime": "2017-10-11T21:17:16Z",
    "reason": "ProvisionCallFailed",
    "message": 'Provision call failed: ServiceInstance "test/mariadb-persistent-6q4zn": Error provisioning: "secrets \"mariadb\" already exists\nservices \"mariadb\" already exists\npersistentvolumeclaims \"mariadb\" already exists\ndeploymentconfigs \"mariadb\" already exists"'
  };

  beforeEach(inject(function (_serviceInstanceFailedMessageFilter_) {
    serviceInstanceFailedMessageFilter = _serviceInstanceFailedMessageFilter_;
  }));

  it('should return the message when the instance is failed', function() {
    var serviceInstance = angular.copy(mockServiceInstance);
    serviceInstance.status.conditions.push(failedCondition);
    var result = serviceInstanceFailedMessageFilter(serviceInstance);
    expect(result).toBe(failedCondition.message);
  });

  it('should return undefined when there are no status conditions', function() {
    var result = serviceInstanceFailedMessageFilter(mockServiceInstance);
    expect(result).toBeUndefined();
  });

  it('should return undefined when a different status condition is set', function() {
    var serviceInstance = angular.copy(mockServiceInstance);
    var condition = angular.copy(failedCondition);
    condition.type = "AnotherCondition";
    serviceInstance.status.conditions.push(condition);
    var result = serviceInstanceFailedMessageFilter(serviceInstance);
    expect(result).toBeUndefined();
  });
});
