import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductCard from 'components/productCard/ProductCard';
import Spinner from 'components/userAlerts/spinner/Spinner';
import ErrorMessage from 'components/userAlerts/errorMessage/ErrorMessage';

import { 
  setSauces, 
  setDrinks, 
  setPizzaFor155Uah, 
  setPizzaFor129Uah, 
  setPizzaFor115Uah, 
  setPizzaFor99Uah 
} from 'store/slices/dataBaseSlice';
import { useHttp } from 'hooks/http.hook';
import { setProductsTop } from 'store/slices/menuSlice';

import './productsList.scss';
import search from 'assets/productsList/magnifyingGlass.svg';
import cart from 'assets/productsList/emptyCart.svg';

const ProductsList = () => {
  const {
    sauces, 
    drinks, 
    pizzaFor155Uah, 
    pizzaFor129Uah, 
    pizzaFor115Uah, 
    pizzaFor99Uah
  } = useSelector(state => state.db);

  const [term, setTerm] = useState('');
  const [visibleData, setVisibleData] = useState([]);
  const [overallLoading, setOverallLoading] = useState(true);
  const [overallError, setOverallError] = useState(false);
  
  const pizzaFor155UahRef = useRef(null);
  const pizzaFor129UahRef = useRef(null);
  const pizzaFor115UahRef = useRef(null);
  const pizzaFor99UahRef = useRef(null);
  const saucesRef = useRef(null);
  const drinksRef = useRef(null);

  const dispatch = useDispatch();

  const { getData } = useHttp();
  
  const allProducts = [...sauces, ...drinks, ...pizzaFor155Uah, ...pizzaFor129Uah, ...pizzaFor115Uah, ...pizzaFor99Uah];

  const handleGetElementPosition = () => {
    const refs = [
      pizzaFor155UahRef,
      pizzaFor129UahRef,
      pizzaFor115UahRef,
      pizzaFor99UahRef,
      saucesRef,
      drinksRef,
    ];

    const topPositions = refs.map((ref) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return rect.top + scrollTop - 20;
      }
      return null;
    });

    dispatch(setProductsTop({
      pizzaFor155UahTop: topPositions[0],
      pizzaFor129UahTop: topPositions[1],
      pizzaFor115UahTop: topPositions[2],
      pizzaFor99UahTop: topPositions[3],
      saucesTop: topPositions[4],
      drinksTop: topPositions[5],
    }));
  };

  useEffect(() => {
    Promise.all([
      getData('sauces', setSauces),
      getData('drinks', setDrinks),
      getData('pizza for 155 uah', setPizzaFor155Uah),
      getData('pizza for 129 uah', setPizzaFor129Uah),
      getData('pizza for 115 uah', setPizzaFor115Uah),
      getData('pizza for 99 uah', setPizzaFor99Uah),
    ])
      .then(() => {
        setOverallLoading(false);
      })
      .catch(() => {
        setOverallError(true);
        setOverallLoading(false);
      });
  }, []);

  useEffect(() => {
    handleGetElementPosition();
  }, [overallLoading, overallError, sauces, drinks, pizzaFor155Uah, pizzaFor129Uah, pizzaFor115Uah, pizzaFor99Uah]);

  useEffect(() => {
    setVisibleData(allProducts.filter((item) => item.name.indexOf(term) > -1));
  }, [term]);

  const renderContentFunc = () => {
    if (term.length === 0) {
      return (
        <>
          <h1 ref={pizzaFor155UahRef} className="products__title">Pizza for 155 uah</h1>
          <ul className="products__list">
            {
              pizzaFor155Uah.map(({img, name, weight, price, descr, id, Additives}) => {
                return (
                  <ProductCard 
                    additives={Additives} key={id} img={img} name={name} weight={weight} price={price} descr={descr}
                  />
                );
              })
            }
          </ul>
          <h1 ref={pizzaFor129UahRef} className="products__title">Pizza for 129 uah</h1>
          <ul className="products__list">
            {
              pizzaFor129Uah.map(({img, name, weight, price, descr, id, Additives}) => {
                return (
                  <ProductCard 
                    additives={Additives} key={id} img={img} name={name} weight={weight} price={price} descr={descr}
                  />
                );
              })
            }
          </ul>
          <h1 ref={pizzaFor115UahRef} className="products__title">Pizza for 115 uah</h1>
          <ul className="products__list">
            {
              pizzaFor115Uah.map(({img, name, weight, price, descr, id, Additives}) => {
                return (
                  <ProductCard 
                    additives={Additives} key={id} img={img} name={name} weight={weight} price={price} descr={descr}
                  />
                );
              })
            }
          </ul>
          <h1 ref={pizzaFor99UahRef} className="products__title">Pizza for 99 uah</h1>
          <ul className="products__list">
            {
              pizzaFor99Uah.map(({img, name, weight, price, descr, id, Additives}) => {
                return (
                  <ProductCard 
                    additives={Additives} key={id} img={img} name={name} weight={weight} price={price} descr={descr}
                  />
                );
              })
            }
          </ul>
          <h1 ref={saucesRef} className="products__title">Sauces</h1>
          <ul className="products__list">
            {
              sauces.map(({img, name, weight, price, descr, id}) => {
                return (
                  <ProductCard 
                    id={id} key={id} img={img} name={name} weight={weight} price={price} descr={descr}
                  />
                );
              })
            }
          </ul>
          <h1 ref={drinksRef} className="products__title">Drinks</h1>
          <ul className="products__list">
            {
              drinks.map(({img, name, volume, price, descr, id}) => {
                return (
                  <ProductCard 
                    key={id} img={img} name={name} volume={volume} price={price} descr={descr}
                  />
                );
              })
            }
          </ul>
        </>
      );
    } else {
      if (visibleData.length >= 1) {
        return (
          <ul className="products__list">
            {
              visibleData.map(({img, name, weight, volume, price, descr, id}) => {
                return (
                  <ProductCard 
                    key={id} img={img} volume={volume} name={name} weight={weight} price={price} descr={descr}
                  />
                );
              })
            }
          </ul>
        );
      } else {
        return (
          <div className="foundNothing">
            <img className="foundNothing__img" src={cart} alt="found nothing" />
            <div className="foundNothing__title">Nothing found!</div>
            <p className="foundNothing__text">
              Unfortunately, we did not find such a dish with us. Try something else.
            </p>
          </div>
        );
      }
    }
  };

  const renderContent = renderContentFunc();

  const errorMessage = overallError ? (
    <ErrorMessage
      styles={{
        width: '250px', 
        height: '250px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  ) : null;
  const loadingMessage = overallLoading ? (
    <Spinner
      styles={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  ) : null;
  const content  = !(overallError || overallLoading) ? renderContent : null;

  return (
    <div className="products">
      <div className="products__search-wrapper">
        <img className="products__img-search" src={search} alt="search" />
        <input 
          className="products__input-search" 
          value={term} 
          onChange={(e) => setTerm(e.target.value)} 
          type="text" 
          placeholder="Search"
        />
      </div>
      {loadingMessage}
      {errorMessage}
      {content}
    </div>
  );
};

export default ProductsList;