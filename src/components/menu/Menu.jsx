import ProductsList from 'components/productsList/ProductsList';

import './menu.scss';

const Menu = () => {
  return (
    <>
      <div className="menu">

        <div className='container'>
          <div className='menu__wrapper'>
            <div className='menu__bar-wrapper'>
              <h3 className="menu__title">Menu</h3>
              <ul className="menu__list">
                <li className="menu__list-item">
                  <a className='menu__list-item-link' href="#">Pizza for 155 uah</a>
                </li>
                <li className="menu__list-item">
                  <a className='menu__list-item-link' href="#">Pizza for 129 uah</a>
                </li>
                <li className="menu__list-item">
                  <a className='menu__list-item-link' href="#">Pizza for 115 uah</a>
                </li>
                <li className="menu__list-item">
                  <a className='menu__list-item-link' href="#">Pizza for 99 uah</a>
                </li>
                <li className="menu__list-item">
                  <a className='menu__list-item-link' href="#">Sauces</a>
                </li>
                <li className="menu__list-item">
                  <a className='menu__list-item-link' href="#">Drinks</a>
                </li>
              </ul>
            </div>
            <ProductsList/>
          </div>
          </div>


      </div>

    </>
  )
}

export default Menu;