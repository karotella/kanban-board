function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();
	this.columnCardHtml = '';

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		var columnRename = $('<button class="column-rename">Zmień nazwę</button>');
		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});

		columnRename.click(function() {
			var columnName = prompt("Enter new name of the column");
			self.renameColumn(columnName);
		});
		
		/*columnCardList.on('DOMSubtreeModified', function() {
			console.log(this.columnCardHtml)
			console.log(columnCardList.html())
			if (this.columnCardHtml == columnCardList.html()) {
				console.log('zmiana')
			}
		})*/

		columnAddCard.click(function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			$.ajax({
		        url: baseUrl + '/card',
		        method: 'POST',
		        data: {
		            name: cardName,
    				bootcamp_kanban_column_id: self.id
		        },
	        	success: function(response) {
	            	var card = new Card(response.id, cardName, this.id);
	       	 		self.createCard(card);
	        	}
    		});
		});		
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnRename)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
			return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
		this.element.children('ul').append(card.element);
		this.columnCardHtml += card.element.parent().html();
		console.log(this.columnCardHtml);
	},
	renameColumn: function(columnName) {
		var self = this;
		$.ajax({
	      	url: baseUrl + '/column/' + self.id,
	      	method: 'PUT',
	      	data: {
		        name: columnName,
				bootcamp_kanban_column_id: self.id
		    },
		    success: function(response){
	        	self.element.find('.column-title').text(columnName);
	      	}
    	});
	},
	deleteColumn: function() {
    	var self = this;
    	$.ajax({
	      	url: baseUrl + '/column/' + self.id,
	      	method: 'DELETE',
	      	success: function(response){
	        	self.element.remove();
	      	}
    	});
 	}
};