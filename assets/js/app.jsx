var gitHubUserName = "harishv7";
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

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var App = React.createClass({
	getInitialState() {
	    return {
	        names: [],
	        description: [],
	        WishesRows: [],
	        repoUrls: [],
	        homepages: []  
	    };
	},
	componentWillMount() {
		var populatedNames = [];
		var populatedWishes = [];
		var populatedHomepages = [];
		var populatedRepoUrls = [];

		var apiUrl = "http://harishv.me/ApsWedsKau/wishes.json";
		this.serverRequest = $.get(apiUrl, function (result) {
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

		var rowsArr = [];
		var itemsForOneRowArr = [];
		for(var i = 0; i < names.length; i++) {
			itemsForOneRowArr.push({
				name: names[i],
				wish: wishes[i],
				key: i
			});

			if(itemsForOneRowArr.length === 3) {
				rowsArr.push(<WishesRow items={itemsForOneRowArr} />);
				rowsArr.push(<hr />);
				itemsForOneRowArr = [];
			}
		}

		// push any remaining items
		if(itemsForOneRowArr.length > 0) {
			rowsArr.push(<WishesRow items={itemsForOneRowArr} />);
			rowsArr.push(<hr />);
		}	

		return (
			<div>
				{rowsArr}
			</div>
		);
	}
});

var WishesRow = React.createClass({
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
				{firstItemExists ? <Wish title={this.props.items[0].name} wish={this.props.items[0].wish} /> : null}
				{secondItemExists ? <Wish title={this.props.items[1].name} wish={this.props.items[1].wish} /> : null}
				{thirdItemExists ? <Wish title={this.props.items[2].name} wish={this.props.items[2].wish} /> : null}
        	</div>
		);
	}
});

var Wish = React.createClass({
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
				<img src="images/github.png" className="img-responsive repoLogo image-center" style={gradientStyle}/> 
                <h2 className="text-center title">{this.props.title}</h2> 
                <p className="description">{this.props.wish}</p>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById("wishes-list"));