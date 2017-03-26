var gradients = [{
	first: '#56ab2f',
	second: '#a8e063'
}, {
	first: '#E0EAFC',
	second: '#CFDEF3'
}, {
	first: '#C9FFBF',
	second: '#FFAFBD'
}, {
	first: '#00d2ff',
	second: '#3a7bd5'
}, {
	first: '#2BC0E4',
	second: '#EAECC6'
}, {
	first: '#F09819',
	second: '#EDDE5D'
}, {
	first: '#EDE574',
	second: '#E1F5C4'
}, {
	first: '#B3FFAB',
	second: '#12FFF7'
}, {
	first: '#0072ff',
	second: '#00c6ff'
}, {
	first: '#4CB8C4',
	second: '#3CD3AD'
}];

var App = React.createClass({
	getInitialState() {
	    return {
	        names: [],
	        wishes: []
	    };
	},
	componentWillMount() {
		var populatedNames = [];
		var populatedWishes = [];

		var apiUrl = "../../wishes.json";
		this.serverRequest = $.get(apiUrl, function (result) {
			console.log(JSON.stringify(result));
			for (var i = 0; i < result.length; i++) { 
				populatedNames.push(result[i].name);
				populatedWishes.push(result[i].wish);
			}
			this.setState({
				names: populatedNames,
				wishes: populatedWishes
			});
		}.bind(this));
	},
	componentWillUnmount() {
	    this.serverRequest.abort();  
	},
	render: function() {
		// create all the rows we need and populate into an array
		var names = this.state.names;
		var wishes = this.state.wishes;

		var portfolioRowsArr = [];
		var porfolioItemsForOneRow = [];
		for(var i = 0; i < names.length; i++) {
			porfolioItemsForOneRow.push({
				name: names[i],
				wish: wishes[i],
				key: i
			});

			if(porfolioItemsForOneRow.length === 3) {
				portfolioRowsArr.push(<PortfolioRow items={porfolioItemsForOneRow} />);
				portfolioRowsArr.push(<hr />);
				porfolioItemsForOneRow = [];
			}
		}

		// push any remaining items
		if(porfolioItemsForOneRow.length > 0) {
			portfolioRowsArr.push(<PortfolioRow items={porfolioItemsForOneRow} />);
			portfolioRowsArr.push(<hr />);
		}	

		return (
			<div>
				{portfolioRowsArr}
			</div>
		);
	}
});

var PortfolioRow = React.createClass({
	render: function() {
		var firstItemExists = true, secondItemExists = true, thirdItemExists = true;
		// check if the 3 items exist
		if(typeof this.props.items[0] == 'undefined') {
			firstItemExists = false;
			secondItemExists = false;
			thirdItemExists = false;
		} else if (typeof this.props.items[1] == 'undefined') {
			secondItemExists = false;
			thirdItemExists = false;
		} else if (typeof this.props.items[2] == 'undefined') {
			thirdItemExists = false;
		}
		return (
			<div className="row"> 
				{firstItemExists ? <PortfolioItem title={this.props.items[0].name} wish={this.props.items[0].wish} /> : null}
				{secondItemExists ? <PortfolioItem title={this.props.items[1].name} wish={this.props.items[1].wish} /> : null}
				{thirdItemExists ? <PortfolioItem title={this.props.items[2].name} wish={this.props.items[2].wish} /> : null}
        	</div>
		);
	}
});

var PortfolioItem = React.createClass({
	render: function() {
		var showHome = true;
		// check if homepage exists
		if(this.props.home === null || this.props.home === "" || this.props.home === " ") {
			showHome = false;
		}

		// choose a random gradient
		var randomNum = Math.floor(Math.random() * (gradients.length));
		var gradient = gradients[randomNum];
		// craft the css
		var gradientStatement = "linear-gradient(to bottom right," + gradient.first + "," + gradient.second +")";
		// console.log(gradientStatement);
		var gradientStyle = {backgroundImage: gradientStatement};
		// var gradientStyle = "background-image: linear-gradient(to bottom right,#56ab2f,#a8e063);";
		return (
			<div className="col-md-4">
				<div className="wish-box">
                <p className="wishes">{this.props.wish}</p>
				<p>by <i>{this.props.title}</i></p>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById("wishes-list"));