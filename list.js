const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class FilterableProductTable extends React.Component{
    constructor(props){
      super(props);
      this.state={filterKeyword:'',isStocked:false};
    }
  
    render(){
     let productsAfterFilter = PRODUCTS.filter(p => p.name.includes(this.state.filterKeyword)).filter(p => !this.state.isStocked || p.stocked);
     const productMap = this.groupByCategory(productsAfterFilter);
      return <div>
         <SearchBar />
         <StockFilter />
         <ProductTable products={productMap} />
       </div>
    }
  
    groupByCategory(items){
       return items.reduce((map, item) => {
		    let products = map.get(item.category) || [];
		    products.push(item);
		    map.set(item.category, products);
		    return map;
      },new Map());
    }
  
}

class SearchBar extends React.Component{
    constructor(props){
      super(props);
    }
  
    render(){
      return <div><input placeholder="Search..." /></div>
    }
  
}

class StockFilter extends React.Component{
    constructor(props){
      super(props);
    }
  
    render(){
      return <div><input type='checkbox' /> Only show products in stock</div>
    }
  
}
        
class ProductRow extends React.Component{
    constructor(props){
      super(props);
    }
  
    render(){
      const item = this.props.item;
      return <tr className={item.stocked ? 'instock' : 'outstock'}><td>{item.name}</td><td>{item.price}</td></tr>
    }
}

class ProductCategory extends React.Component{
    constructor(props){
      super(props);
    }
  
    render(){
      return <tr><th colSpan="2">{this.props.category}</th></tr>
    }
  
}

class ProductTable extends React.Component{
    constructor(props){
      super(props);
    }
  
    render(){
       let rows = [];
       this.props.products.forEach((value,key) => 
         rows.push(<ProductCategory category={key}  key={'c_' + key}/>, value.map(i => <ProductRow item={i} key={key + i.name}/>))
        );
      return <table><thead><tr><th>Name</th><th>Price</th></tr></thead><tbody>{rows}</tbody></table>;
    }
}

ReactDOM.render(
  <FilterableProductTable/>,
  document.getElementById('container')
);