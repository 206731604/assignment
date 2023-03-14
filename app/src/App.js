/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "./App.css";
class App extends React.Component {
	imgs = ["/imgs/six.png", "/imgs/three.png", "/imgs/two.png"];
	state = {
		index: 0,
	};
	fun = () => {
		this.timer=setInterval(() => {
			this.setState({ index: (this.state.index + 1) % this.imgs.length });
		}, 2000);
	}
	componentDidMount() {
		this.fun()
	}
	fn = (val) => {
		clearInterval(this.timer)
		this.setState({ index: val });
		this.fun()
	}
	render() {
		return (
			<div className="app">
				<img src={this.imgs[this.state.index]} alt="" />
				{this.imgs.map((v, i) => <span onClick={()=>this.fn(i)} key={i} className={i===this.state.index?"active":""}>{ i+1}</span>)}
			</div>
		);
	}
}
// class App extends React.Component{
// 	list = [
// 		{ id: 1, name: 1 },
// 		{ id: 2, name: 2 },
// 		{ id: 3, name: 3 },
// 		{ id: 4, name: 4 }
// 	]
// 	state = {
// 		show:true
// 	}
// 	componentDidMount() {
// 		this.setState({
// 			show:false
// 		})
// 	}
// 	render() {
// 		return (<div>{this.state.show?"loading":this.list.map((v, i) => <div key={v.id}>{ v.id} — { v.name}</div>) }</div>)
// 	}
// }
export default App;
