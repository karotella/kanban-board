// KLASA KANBAN CARD
function Card(id, name, columnId) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given'
	this.element = createCard();
	this.columnId = columnId;

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		var cardRename = $('<button class="card-rename">Zmień opis</button>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		cardRename.click(function() {
			var cardName = prompt("Enter new name of the card");
			self.renameCard(cardName);
		});
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		card.append(cardRename)
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
		var self = this;
	    $.ajax({
	    	url: baseUrl + '/card/' + self.id,
	      	method: 'DELETE',
	      	success: function(){
	        	self.element.remove();
	      	}
	    });
	},
	renameCard: function(cardName) {
		var self = this;
		$.ajax({
	      	url: baseUrl + '/card/' + self.id,
	      	method: 'PUT',
	      	data: {
		        name: cardName,
		        id: self.id,
				bootcamp_kanban_column_id: self.columnId
		    },
		    success: function(response){
	        	self.element.find('.card-description').text(cardName);
	      	}
    	});
	}
}