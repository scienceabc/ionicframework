angular.module('app.services', ['ngResource'])

.factory('Post', function ($resource) {
    $returndata = $resource('https://www.scienceabc.com/wp-json/sabc-api/v1/post/:postId');
    return $returndata;
})
;
