(function ($, ko) {
    // Private function
    function getColumnsForScaffolding(data) {
        if ((typeof data.length !== 'number') || data.length === 0) {
            return [];
        }
        var columns = [];
        for (var propertyName in data[0]) {
            columns.push({ headerText: propertyName, rowText: propertyName });
        }
        return columns;
    }

    ko.simpleGrid = {

        // Defines a view model class you can use to populate a grid
        viewModel: function (configuration) {
            var pages = new Array();
            // self.data = configuration.data;
            var self = this;
            self.searchField = ko.observable();
            self.currentPageIndex = ko.observable(0);
            self.pageSize =ko.observable( configuration.pageSize || 10);
            self.totalPages = ko.observable(0);
            self.url = configuration.url;
            self.method = configuration.method;
            self.loading = ko.observable(false);
            self.refresh = ko.observable(false);
            self.records = ko.observableArray([]);
            self.totalRecords = ko.observable();
            self.criteria = ko.observable();
            self.ViewablePages = ko.observableArray([]);
            self.goTo = ko.observable(1);
            //self.ViewablePages = ko.observableArray(ko.utils.range(0, self.maxPageIndex()));
            self.result = asyncComputed(function () {
                var isRefresh = self.refresh();
                self.criteria({ pageIndex: self.currentPageIndex() + 1, pageSize: self.pageSize(), searchField: ko.toJS(self.searchField) });
                var criteriaJson = '';
                if (self.method) {
                    criteriaJson = { method: self.method, args: { criteria: JSON.stringify(self.criteria())} };
                } else {
                    var criteriaJson = { criteria: JSON.stringify(self.criteria()) };
                }
                self.refresh(false);
                return $.ajax(self.url, { data: criteriaJson, dataType: 'Json', contentType: "application/json;charset=utf-8", type: 'GET' });
            }, self);
            self.getPagedData = function () {
                if (parseInt(self.goTo())) {
                    //self.currentPageIndex(parseInt(self.goTo()) - 1);
                    _createPages();
                }
            };

            // If you don't specify columns configuration, we'll use scaffolding
            self.columns = configuration.columns || getColumnsForScaffolding(ko.utils.unwrapObservable(self.records()));

            self.maxPageIndex = ko.computed(function () {

                return Math.ceil(self.totalRecords() / self.pageSize()) - 1;
            }, self);



            function _calculatePageCount() {
                var pageCount = Math.floor(self.totalRecords() / self.pageSize());
                if (self.totalRecords() % this.options.pageSize() != 0) {
                    ++pageCount;
                }
                return pageCount;
            };
            function _calculatePageCount() {
                var pageCount = Math.floor(self.totalRecords() / self.pageSize());
                if (self.totalRecords() % self.pageSize() != 0) {
                    ++pageCount;
                }
             //   console.log({ pagecount: pageCount });
                return pageCount;
            };
            function _createPages() {
                pages = [];
                if (self.currentPageIndex() > 1) {
                    pages.push(new page({ "text": '<<', pageNumber: 0 }));
                    pages.push(new page({ text: '<', pageNumber: self.currentPageIndex() - 1 }));
                }
                var pageCount = _calculatePageCount();
                //alert(pageCount);
                // pageCount = pageCount - 1;
                _calculatePageNumbers(pageCount);

                if (self.currentPageIndex() < pageCount-1) {
                    pages.push({ text: '>', pageNumber: self.currentPageIndex() + 1 });
                    pages.push({ text: '>>', pageNumber: pageCount - 1 });
                }
                self.ViewablePages(pages);
            };
            function _calculatePageNumbers(pageCount) {
                
                if (pageCount <= 5) {
                    //Show all pages
                    var pageNumbers = [];
                    for (var i = 0; i < pageCount; ++i) {
                        pages.push({ text: i + 1, pageNumber: i });
                    }
                    return pageNumbers;
                } else {
                    //show first three, last three, current, previous and next page numbers
                    
                    var shownPageNumbers = [1, 2, 3, pageCount - 2, pageCount - 1, pageCount];
                    var previousPageNo = _normalizeNumber(self.currentPageIndex()+1, 1, pageCount, 1);
                    var nextPageNo = _normalizeNumber(self.currentPageIndex() + 1, 1, pageCount, 1);

                    _insertToArrayIfDoesNotExists(shownPageNumbers, previousPageNo);
                    _insertToArrayIfDoesNotExists(shownPageNumbers, self.currentPageIndex()+1);
                    _insertToArrayIfDoesNotExists(shownPageNumbers, nextPageNo);

                    shownPageNumbers.sort(function (a, b) { return a - b; });
                    shownPageNumbers.forEach(function (d) {
                        pages.push({ text: d, pageNumber: d-1 });
                    });
                    return shownPageNumbers;
                }
            };
            function _insertToArrayIfDoesNotExists(array, value) {
                if ($.inArray(value, array) < 0) {
                    array.push(value);
                }
            };
            function _normalizeNumber(number, min, max, defaultValue) {
                if (number == undefined || number == null) {
                    return defaultValue;
                }
                if (number < min) {
                    return min;
                }
                if (number > max) {
                    return max;
                }
                return number;
            };

            function asyncComputed(evaluator, owner) {
                var result = ko.observable();
                result.records = ko.observableArray();
                result.totalRecords = ko.observable();
                ko.computed(function () {
                    // Get the $.Deferred value, and then set up a callback so that when it's done,
                    // the output is transferred onto our "result" observable
                    owner.loading(true);
                    waitMsg("Loading");
                    waitMsg.show();
                    evaluator.call(owner).done(function (res) {
                        if (res.TotalRecords < self.pageSize())
                            self.currentPageIndex(0);
                        self.records(res.Records);
                        self.totalRecords(res.TotalRecords);
                        result.records(res.Records);
                        result.totalRecords(res.TotalRecords);
                        result(res);
                        owner.loading(false);
                       
                        waitMsg.hide();
                        //ko.utils.range(0, (self.totalRecords() / self.pageSize) - 1)
                        //console.log(self.ViewablePages());
                        _createPages();
                    });
                });
                if (result.totalRecords() > 0) {
                    _createPages();

                }
                return result;
            }
        }
    };

    
    // Templates used to render the grid
    var templateEngine = new ko.nativeTemplateEngine();

    templateEngine.addTemplate = function (templateName, templateMarkup) {
        document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
    };

    templateEngine.addTemplate("ko_simpleGrid_grid", "\
                    <table class=\"table table-bordered table-condensed table-hover table-responsive table-striped\">\
                        <thead>\
                            <tr data-bind=\"foreach: columns\">\
                               <th data-bind=\"text: headerText\"></th>\
                            </tr>\
                        </thead>\
                        <tbody data-bind=\"foreach: result.records\">\
                           <tr data-bind=\"foreach: $parent.columns\">\
                               <td data-bind=\"text: typeof rowText == 'function' ? rowText($parent) : $parent[rowText] \"></td>\
                            </tr>\
                        </tbody>\
                    </table>");

    templateEngine.addTemplate("ko_simpleGrid_grid_search", "\
    <div class=\"row\">\
            <div class=\" pull-right col-md-5\">\
                            <input type=\"text\" name=\"gridSearch\" data-bind=\"value:$root.searchField\" class=\"form-control\" placeholder=\"Search\"\
                                 />\
                        </div>\
                        </div>\
                        <div class=\"row\">\
       <div class=\" col-md-12 form-group\">\
                    <table class=\"table table-bordered table-condensed table-hover table-responsive table-striped\">\
                        <thead class=\"bg-default\">\
                            <tr data-bind=\"foreach: columns\">\
                               <th data-bind=\"text: headerText\"></th>\
                            </tr>\
                        </thead>\
                        <tbody  data-bind=\"foreach: records\">\
                           <tr data-bind=\"foreach: $parent.columns,event : { dblclick:function(){$root.selectData($data); $('.modal').modal('hide');} }\">\
                               <td data-bind=\"text: typeof rowText == 'function' ? rowText($parent) : $parent[rowText] \"></td>\
                            </tr>\
                        </tbody>\
                    </table>\
                    </div>\
                    </div>\
                    ");

    templateEngine.addTemplate("ko_simpleGrid_pageLinks", "\
                    <div class=\"ko-grid-pageLinks\">\
                    <nav>\
                        \
                       <ul class='pagination pagination-sm' >\
                        <!-- ko foreach: ViewablePages -->\
                              <li> <a class='btn btn-default btn-sm' href=\"#\" data-bind=\"text: text , click: function() { $root.currentPageIndex(pageNumber) }, css: { active: (pageNumber == $root.currentPageIndex()) }\">\
                            </a></li>\
                            <!-- /ko -->\
                            <li></li><li><span>\
                       showing <span data-bind='text:($root.currentPageIndex()*$root.pageSize()+1)'></span> - <span data-bind='text:(parseInt($root.currentPageIndex()*$root.pageSize())+parseInt($root.pageSize()))>$root.totalRecords()?$root.totalRecords():(parseInt($root.currentPageIndex()*$root.pageSize())+parseInt($root.pageSize()))'></span> of <span data-bind='text:$root.totalRecords()  '></span>  \
                        </span></li></ul>\
                        </nav><span>Row Count &nbsp; \
                          <select id='page' name=\"gridSearch\" data-bind=\"value:$root.pageSize\" class=\"\" placeholder=\"Search\"\
                                 ><option value='5'>5</option>\
                                  <option value='10'>10</option>\
                                  <option value='25'>25</option>\
                                  <option value='50'>50</option>\
                                  <option value='100'>100</option>\
                        </select>&nbsp;&nbsp;&nbsp;</span\
                    </div>");




    // The "simpleGrid" binding
    ko.bindingHandlers.simpleGrid = {
        init: function () {
            return { 'controlsDescendantBindings': true };
        },
        // This method is called to initialize the node, and will also be called again if you change what the grid is bound to
        update: function (element, viewModelAccessor, allBindingsAccessor) {
            var viewModel = viewModelAccessor(), allBindings = allBindingsAccessor();

            // Empty the element
            while (element.firstChild)
                ko.removeNode(element.firstChild);

            // Allow the default templates to be overridden
            var gridTemplateName = allBindings.simpleGridTemplate || "ko_simpleGrid_grid",
                pageLinksTemplateName = allBindings.simpleGridPagerTemplate || "ko_simpleGrid_pageLinks",
                showPagerTemplate = true;

            if (allBindings.showPagerTemplate !== undefined) {
                showPagerTemplate = allBindings.showPagerTemplate;
            }

            // Render the main grid
            var gridContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(gridTemplateName, viewModel, { templateEngine: templateEngine }, gridContainer, "replaceNode");

            if (showPagerTemplate) {   // Render the page links
                var pageLinksContainer = element.appendChild(document.createElement("DIV"));
                ko.renderTemplate(pageLinksTemplateName, viewModel, { templateEngine: templateEngine }, pageLinksContainer, "replaceNode");
            }
        }
    };
})(jQuery, ko);

var page = function (item) {
    item = item || {};
    this.pageNumber =item.pageNumber;
    this.text =item.text;
};