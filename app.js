var $ = jQuery;

$(document).ready(function () {
  "use strict";

  $.ajax({
    type: "GET",
    url: "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml",
    dataType: "xml",
    crossDomain: true,
    success: function (xml) {

      // create an object to hold latest Currency and Rate
      var objCurrencyRate = {};
      // in XML to extract currency / rate details
      var currencies = $(xml).find('Cube[time]:first');
      var time = $(this).attr('time') || '';
      // loop in the XML and add items to object
      $(currencies).find('Cube').each(function (i, c) {
        var currency = $(this).attr('currency') || '';
        var rate = Number($(this).attr('rate') || 0);
        objCurrencyRate[currency] = rate;
          // add EUR to object
        objCurrencyRate.EUR = 1;
      });

      // click event to get currency from dropdown
      $('#button').click(function () {
        event.preventDefault();
        $('#exchange ul li:last-child').hide();
        $('#exchange ul').show();
        // assign selected currency
        var selectedCurrency1 = $('#currencyList1').val();
        var selectedCurrency2 = $('#currencyList2').val();

        var rate1 = 0;
        var rate2 = 0;
        if (selectedCurrency1 in objCurrencyRate) {
          rate1 = objCurrencyRate[selectedCurrency1];
        }
        if (selectedCurrency2 in objCurrencyRate) {
          rate2 = objCurrencyRate[selectedCurrency2];
        }

        // math for exchange rate between the choosen currencies
        var exch1 = (rate2 / rate1).toFixed(4);
        var exch2 = (rate1 / rate2).toFixed(4);

        // attach exchange results to DOM
        var result = '<li><p> 1.00 ' + '<u>' + selectedCurrency1 + '</u>' + '  =  ' + exch1 + ' ' + '<u>' + selectedCurrency2 + '</u>' +'</p>' +
          '<p>' + ' 1.00 ' + '<u>' + selectedCurrency2 + '</u>' + '  =  ' + exch2 + ' ' + '<u>' + selectedCurrency1 + '<u></p></li>';

        $(result).appendTo('#exchange ul');
      });
    }
  });
});