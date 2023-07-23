import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProductsList from 'components/productsList/ProductsList';

import './menu.scss';

const Menu = () => {
  const {
    pizzaFor155UahTop, 
    pizzaFor129UahTop, 
    pizzaFor115UahTop, 
    pizzaFor99UahTop, 
    saucesTop, 
    drinksTop
  } = useSelector(state => state.menu);
  const [activeMenuItem, setActiveMenuItem] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY >= pizzaFor155UahTop && scrollY < pizzaFor129UahTop) {
        setActiveMenuItem('Pizza for 155 uah');
      } else if (scrollY >= pizzaFor129UahTop && scrollY < pizzaFor115UahTop) {
        setActiveMenuItem('Pizza for 129 uah');
      } else if (scrollY >= pizzaFor115UahTop && scrollY < pizzaFor99UahTop) {
        setActiveMenuItem('Pizza for 115 uah');
      } else if (scrollY >= pizzaFor99UahTop && scrollY < saucesTop) {
        setActiveMenuItem('Pizza for 99 uah');
      } else if (scrollY >= saucesTop && scrollY < drinksTop) {
        setActiveMenuItem('Sauces');
      } else if (scrollY >= drinksTop) {
        setActiveMenuItem('Drinks');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const menuItemsData = [
    {title: 'Pizza for 155 uah', topPosition: pizzaFor155UahTop, id: 1,},
    {title: 'Pizza for 129 uah', topPosition: pizzaFor129UahTop, id: 2},
    {title: 'Pizza for 115 uah', topPosition: pizzaFor115UahTop, id: 3},
    {title: 'Pizza for 99 uah', topPosition: pizzaFor99UahTop, id: 4},
    {title: 'Sauces', topPosition: saucesTop, id: 5},
    {title: 'Drinks', topPosition: drinksTop, id: 6},
  ];

  const menuItems = menuItemsData.map(({title, topPosition, id}) => {
    return (
      <li key={id} onClick={() => {
        window.scrollTo({
          top: topPosition,
          behavior: 'smooth'
        });
      }} className="menu__list-item">
        <div
          className='menu__list-item-link'
          style={{
            'color': title === activeMenuItem ? 'var(--accent)' : 'var(--text)'
          }}
        >{title}</div>
      </li>
    );
  });

  return (
    <>
      <div className="menu">

        <div className='container'>
          <div className='menu__wrapper'>
            <div className='menu__bar-wrapper'>
              <h3 className="menu__title">Menu</h3>
              <ul className="menu__list">
                {menuItems}
              </ul>
            </div>
            <ProductsList/>
          </div>
        </div>


      </div>

    </>
  );
};

export default Menu;