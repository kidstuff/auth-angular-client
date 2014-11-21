var kidstuff = kidstuff || {};
kidstuff.auth = kidstuff.auth || {};
kidstuff.auth.module = angular.module('kidstuff.auth', ['LocalStorageModule']);

kidstuff.auth.module.provider('auth',function() {
    var provider = {};
    var config = {endPoint : window.location.origin};

    provider.setEndPoint = function(path) {
        config.endPoint = path;
    }

    provider.$get = ['$http', 'localStorageService', function($http, localStorageService) {
		var auth = {};
		auth.isLoged = function(){
			var access_token = localStorageService.get('access_token');
			if (access_token != null){
				var expired_on = localStorageService.get('expired_on');
				if(expired_on != null){
					if(!moment(expired_on, "YYYY-MM-DDTHH:mm:ssZ").isAfter(moment())){
						auth.logout();
						return false;
					}
					return true;
				}
			}
			return false;
		}

		auth.currentUser = function(){
			var user = localStorageService.get('user');
			if (user != null){
				return user
			}		
		}

		auth.login = function(email, password, success, error) {
			$http({
				method: 'GET',
				url: config.endPoint+'/tokens',
				params:{
					email: email,
					password: password,
					grant_type: "password"
				}
			}).
			success(function(data, status, headers, config) {
				localStorageService.set('access_token', data.AccessToken);
				localStorageService.set('expired_on', data.ExpiredOn);
				localStorageService.set('user', data.User);
				success(data, status, headers, config);
			}).
			error(function(data, status, headers, config) {
				error(data, status, headers, config);
			});
		}

		auth.logout = function() {
			localStorageService.remove('access_token');
			localStorageService.remove('expired_on');
			localStorageService.remove('user');
		}

		auth.getUser = function(id, success, error) {
			if(typeof id != 'string') {
				return;
			}
			$http({
				method: 'GET',
				url: config.endPoint+'/users/'+id,
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success(data);
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}

		auth.createUser = function(userInfo, success, error) {
			if(typeof userInfo != 'object') {
				return;
			}

			$http({
				method: 'POST',
				url: config.endPoint+'/users',
				data: userInfo,
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}				
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success(data);
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}

		auth.removeUser = function(userId, success, error) {
			if(typeof userId != 'string') {
				return;
			}

			$http({
				method: 'DELETE',
				url: config.endPoint+'/users/'+userId,
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success();
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}
		
		auth.updateUserProfile = function(id, profile, success, error) {
			if(typeof profile != 'object') {
				return;
			}
			$http({
				method: 'PATCH',
				url: config.endPoint+'/users/'+id+'/profile',
				data: profile,
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success();
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}

		auth.updateUserApproval = function(id, approve, success, error) {
			if(typeof approve != 'boolean') {
				return;
			}

			$http({
				method: 'PUT',
				url: config.endPoint+'/users/'+id+'/approve',
				data: {
					Approved: approve
				},
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success();
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}

		auth.listUser = function(params, success, error) {
			$http({
				method: 'GET',
				url: config.endPoint+'/users',
				params:params,
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success(data.Users);
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}

		auth.removeUserGroup = function(userId, groupId, success, error) {
			if(typeof userId != 'string' || typeof groupId != 'string') {
				return;
			}

			$http({
				method: 'DELETE',
				url: config.endPoint+'/users/'+userId+'/groups/'+groupId,
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success();
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}

		auth.addUserGroup = function(userId, groupId, success, error) {
			if(typeof userId != 'string' || typeof groupId != 'string') {
				return;
			}

			$http({
				method: 'PUT',
				url: config.endPoint+'/users/'+userId+'/groups',
				data: {
					Id: groupId
				},
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success();
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}

		auth.listGroup = function(params, success, error) {
			$http({
				method: 'GET',
				url: config.endPoint+'/groups',
				params: params,
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success(data.Groups);
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}

		auth.createGroup = function(group, success, error) {
			$http({
				method: 'POST',
				url: config.endPoint+'/groups',
				data: group,
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success(data);
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}

		auth.getGroup = function(id, success, error) {
			$http({
				method: 'GET',
				url: config.endPoint+'/groups/'+id,
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success(data);
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}

		auth.updateGroup = function(group, success, error) {
			$http({
				method: 'PATCH',
				url: config.endPoint+'/groups/'+group.Id,
				data: group,
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success(data);
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}

		auth.removeGroup = function(id, success, error) {
			$http({
				method: 'DELETE',
				url: config.endPoint+'/groups/'+id,
				headers: {Authorization: 'Bearer '+localStorageService.get('access_token')}
			}).
			success(function(data, status, headers, config) {
				if(typeof success == 'function') {
					success(data);
				}
			}).
			error(function(data, status, headers, config) {
				if(typeof error == 'function') {
					error(data);
				}
			});
		}

		return auth;
    }];

    return provider;
});
