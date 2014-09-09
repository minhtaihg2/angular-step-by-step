angular.module('arrayFilters', [
    'angularUtils.directives.dirPagination'
])

    .controller('ArrayFiltersCtrl', function ($scope) {

        //model
        $scope.backlog = [
            {name: 'Submit proposal', desc: 'Submit book proposal to PACKT', priority: 1, estimation: 1, done: true},
            {name: 'Prepare outline', desc: 'Prepare book outline with estimated page count', priority: 2, estimation: 2, done: true},
            {name: 'Prepare samples', desc: 'Think of code samples', priority: 3, estimation: 5, done: true},
            {name: 'Write 1st draft', desc: 'Write 1st draft of the text', priority: 3, estimation: 12, done: false},
            {name: 'Review draft', desc: 'Re-read and review the 1st draft', priority: 4, estimation: 5, done: false},
            {name: 'Incorporate reviewers remarks', desc: 'Go over and reviewers remarks ', priority: 6, estimation: 3, done: false},
            {name: 'Promote in social media', desc: 'Promote book in social media!', priority: 10, estimation: 1, done: false}
        ];

        // reverse = false xắp xếp theo thứ tự ABC

        //filter : expression : comparator

        $scope.sort = function (property) {
            if ($scope.filterProperty == property) {
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.filterProperty = property;
                $scope.reverse = false;
            }

        };
        $scope.sortDown = function (property) {

            // return true nếu cả 2 điều kiện là đúng

            return property === $scope.filterProperty && !$scope.reverse;
        };

        $scope.sortUp = function (property) {
            return property === $scope.filterProperty && $scope.reverse;
        };


    });