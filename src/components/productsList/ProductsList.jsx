import { ProductCard } from 'components/productCard/ProductCard';

import './productsList.scss';

const ProductsList = () => {
  return (
    <div className="products">
      <h1 className="products__title">Pizza for 155 uah</h1>
      <ul className="products__list">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </ul>
    </div>
  )
}

export default ProductsList