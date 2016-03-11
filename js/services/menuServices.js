var app = angular.module('COMET');

app.factory('menuServices', [function () {
	var menu = {
		data: {}
	};

	menu.updateMenu = function (data) {
		/*

		// save 'divideRatio' in data for each category
		calculateDivideRatio(data);
		// save 'layoutColumns' in data for each category
		generateLayout(data);

		*/

		generateLayoutStockColumns(data);

		menu.data = data;
	};

	function calculateDivideRatio(data) {
		data.forEach(function(category, index) {
			// group title should be counted as well as group items
			var items = category.groups.length;

			category.groups.forEach(function(group) {
				// exclude the empty groups
				if (group.items.length === 0) items--;

				// add group items
				items += group.items.length;
			});
			// an average value of dividing items into columns
			category.divideRatio = ~~(Math.sqrt(items) + 1);
		});
	}

	function generateLayout(data) {
		data.forEach(function(category) {
			// change the ratio between columns and rows
			var rows = ~~(category.divideRatio * 1.67 + 2);

			var list = [ [] ];
			var currentColumn = 0, currentRow = 0;

			category.groups.forEach(function (group) {
				// we don't want to display empty groups
				if (group.items.length > 0) {

					// prevent the group title to be the last item in the column
					if (currentRow === rows - 1) nextColumn();

					// add group to the column
					list[currentColumn].push(group);
					currentRow++;
					if (currentRow >= rows) nextColumn();

					// add each item of the group to the column
					group.items.forEach(function (item) {
						list[currentColumn].push(item);
						currentRow++;
						if (currentRow >= rows) nextColumn();
					});
				};
			});

			function nextColumn () {
				currentRow = 0;
				currentColumn++;
				list.push([]);
			}

			category.layoutColumns = list;
		});
	}

	function generateLayoutStockColumns(data) {
		data.forEach(function(category) {
			var list = [];
			for (var i = 0; i < +category.columns; i++) list[i] = [];
			var prevGroup = null;

			category.groups.sort(function compare(one, two) {
				// when groups are in the same column, we sort by row
				if (+one.column === +two.column) {
						return +one.row - +two.row;
				}

				return +two.column - +one.column;
			});

			category.groups.forEach(function (group, index) {
				// we don't want to display empty groups
				if (group.items.length > 0 && group.column) {

					// place the group to the 'row' attribute by adding empty lines
					addEmptyRows(list[+group.column - 1], group, prevGroup,  index);
					// add group to the column
					list[+group.column - 1].push(group);

					// add each item of the group to the column
					group.items.forEach(function (item) {
						list[+group.column - 1].push(item);
					});
					prevGroup = group;
				}
				function addEmptyRows(list, cur, prev, index) {
					var emptyLines;
					// if it is first group, there is no prev, and we have to check row
					if (!prev && cur.row) {
						emptyLines = +cur.row;
						// we add empty lines 'row' times
						addLines(list, emptyLines);
						return;
						// if there wasn't row we cannot continue
					} else if (!cur.row) return;
					// if there was no title in the fisrt group we make prev.row irrelevant
					if (!prev.row) prev.row = 0;
					// in cases where column is not defined, but there are items
					if (!prev.column) prev.column = 1;

					if (+prev.column === +cur.column) {
						emptyLines = +cur.row - (prev.items.length + +prev.row);
					} else {
						emptyLines = +cur.row;
					}

					addLines(list, emptyLines);

					function addLines(list, lines) {
						for (var i = 0; i < lines - 1; i++) { list.push({ empty: true }); }
					}
				}
			});

			category.layoutColumns = list;
		});
	}

	return menu;
}]);
