(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', 'dataservice'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger, dataservice) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'Created by Clarkio',
            link: 'http://twitter.com/_clarkio'
        };

        activate();

        function activate() {
            dataservice.retrieveNFLGames()
                .then(success)
                .catch(fail);
            // dataservice.retrieveNCFGames()
            //     .then(success)
            //     .catch(fail);
        }
        
        function success() {
            logger.success(config.appTitle + ' loaded!', null);
            console.log('Finished retrieving games!');
            hideSplash();
        }

        function fail() {
            hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSplash = false;
            }, 1000);
        }
    }
})();
