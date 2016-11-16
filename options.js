/**
 * MIT License
 *
 *    Copyright (c) 2016 June07
 *
 *    Permission is hereby granted, free of charge, to any person obtaining a copy
 *    of this software and associated documentation files (the "Software"), to deal
 *    in the Software without restriction, including without limitation the rights
 *    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *    copies of the Software, and to permit persons to whom the Software is
 *    furnished to do so, subject to the following conditions:
 *
 *    The above copyright notice and this permission notice shall be included in all
 *    copies or substantial portions of the Software.
 *
 *    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *    SOFTWARE.
 */
var ngApp = angular.module('NimOptionsApp', []);
ngApp
  .run(function() {})
  .controller('nimOptionsController', ['$scope', '$window', '$http', function($scope, $window, $http) {
    $scope.bg = $window.chrome.extension.getBackgroundPage().angular.element('#nim').scope();
    $scope.auto = $scope.bg.auto;
    $scope.debug = $scope.bg.debug;
    $scope.newWindow = $scope.bg.newWindow;
    $scope.autoClose = $scope.bg.autoClose;
    $scope.checkInterval = $scope.bg.checkInterval;

    var chrome = $window.chrome;
    var slider = $window.document.getElementById('checkInterval');
    $window.noUiSlider.create(slider, {
      start: [$scope.checkInterval],
      step: 1,
      range: {
        'min': [ 5 ],
        'max': [ 300 ]
      },
      tooltips: true
    });
    var rangeSliderValueElement = document.getElementById('checkInterval-value');
    slider.noUiSlider.on('update', function( values, handle ) {
  	     rangeSliderValueElement.innerHTML = values[handle];
         $scope.bg.checkInterval = parseInt(values[handle]);
     });
     $scope.saveButtonHandler = function() {
         $scope.bg.$emit('options-window-closed');
         $window.close();
     }
  }]);
