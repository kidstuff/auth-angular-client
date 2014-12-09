auth-angular-client
===================

AngularJS client lib for [kidstuff/auth REST API](https://github.com/kidstuff/auth)


Dependencies
====
* AngularJS >= [1.2.24](http://ajax.googleapis.com/ajax/libs/angularjs/1.2.24/angular.js)
* MomentJS >= [2.5.1](http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js)
* [angular-local-storage](https://github.com/grevory/angular-local-storage)

Config
====
```js
app = angular.module('app', ['kidstuff.auth']);
app.config([authProvider', function(authProvider) 
	authProvider.setEndPoint('http://example.com/auth');
}]);
```

API Reference
====
## Methods
### isLoged
isLoged() return _boolean_

### currentUser
currentUser() return _User obejct_

### login
login(email _string_, password _string_, success _callback(data)_, error _callback(error)_)  
Example:
```js
app.controller('LoginController', ['$scope', 'auth', function($scope, auth) {
	$scope.user = {};
	if(auth.isLoged()) {
		// warrning
	}

	$scope.submit = function() {
		auth.login($scope.user.Email, $scope.user.Pwd, function(data) {
			// show success message
		}, function(err) {
			// log error
		});
	}
}]);
``` 

### logout
logout()

### getUser
getUser(id _string_, success _callback(data)_, error _callback(error)_)

### createUser
createUser(userInfo _object_, success _callback(data)_, error _callback(error)_)

### removeUser
removeUser(userId _string_, success _callback(data)_, error _callback(error)_)

### updateUserProfile
updateUserProfile(id _string_, profile _object_, success _callback(data)_, error _callback(error)_)

### updateUserApproval
updateUserApproval(id _string_, approve _boolean_, success _callback(data)_, error _callback(error)_)

### listUser
listUser(params _object_, success _callback(data)_, error _callback(error)_)

### removeUserGroup
removeUserGroup(userId _string_, groupId _string_, success _callback(data)_, error _callback(error)_)

### addUserGroup
addUserGroup(userId _string_, groupId _string_, success _callback(data)_, error _callback(error)_)

### listGroup
listGroup(params _object_, success _callback(data)_, error _callback(error)_)

### createGroup
createGroup(group _object_, success _callback(data)_, error _callback(error)_)

### getGroup
getGroup(id _string_, success _callback(data)_, error _callback(error)_)

### updateGroup
updateGroup(group _object_, success _callback(data)_, error _callback(error)_)

### removeGroup
removeGroup(id _string_, success _callback(data)_, error _callback(error)_)

### updateSettings
updateSettings(settings _object_, success _callback(data)_, error _callback(error)_)

### getSettings
getSettings(keys _array of string_, success _callback(data)_, error _callback(error)_)  

Example:
```js
keys = ["key1", "key2", "key3"];
auth.getSettings(keys, function(settings) {
	// console.log(settings)
	// Object {key1: "val1", key2: "val2", key2: "val3"}
}, function(err) {

});
```

### removeSettings
removeSettings(keys _array of string_, success _callback(data)_, error _callback(error)_)