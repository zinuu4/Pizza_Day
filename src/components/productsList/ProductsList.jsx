import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { 
  setSauces, 
  setDrinks, 
  setPizzaFor155Uah, 
  setPizzaFor129Uah, 
  setPizzaFor115Uah, 
  setPizzaFor99Uah 
} from "store/slices/dataBaseSlice";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from 'components/productCard/ProductCard';
import './productsList.scss';

const ProductsList = () => {

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID 
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async (collectionName, setFunc) => {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setFunc(newData));
      } catch (e) {
        console.error("Error getting documents:", e);
      }
    };

    fetchData("sauces", setSauces);
    fetchData("drinks", setDrinks);
    fetchData("pizza for 155 uah", setPizzaFor155Uah);
    fetchData("pizza for 129 uah", setPizzaFor129Uah);
    fetchData("pizza for 115 uah", setPizzaFor115Uah);
    fetchData("pizza for 99 uah", setPizzaFor99Uah);
  }, []);

  const {sauces} = useSelector(state => state.db);
  const {drinks} = useSelector(state => state.db);
  const {pizzaFor155Uah} = useSelector(state => state.db);
  const {pizzaFor129Uah} = useSelector(state => state.db);
  const {pizzaFor115Uah} = useSelector(state => state.db);
  const {pizzaFor99Uah} = useSelector(state => state.db);

  return (
    <div className="products">
      <h1 className="products__title">Pizza for 155 uah</h1>
      <ul className="products__list">
        {
          pizzaFor155Uah.map(({img, name, weight, price, descr, id}) => {
            return (
              <ProductCard key={id} img={img} name={name} weight={weight} price={price} descr={descr}/>
            )
          })
        }
      </ul>
      <h1 className="products__title">Pizza for 129 uah</h1>
      <ul className="products__list">
        {
          pizzaFor129Uah.map(({img, name, weight, price, descr, id}) => {
            return (
              <ProductCard key={id} img={img} name={name} weight={weight} price={price} descr={descr}/>
            )
          })
        }
      </ul>
      <h1 className="products__title">Pizza for 115 uah</h1>
      <ul className="products__list">
        {
          pizzaFor115Uah.map(({img, name, weight, price, descr, id}) => {
            return (
              <ProductCard key={id} img={img} name={name} weight={weight} price={price} descr={descr}/>
            )
          })
        }
      </ul>
      <h1 className="products__title">Pizza for 99 uah</h1>
      <ul className="products__list">
        {
          pizzaFor99Uah.map(({img, name, weight, price, descr, id}) => {
            return (
              <ProductCard key={id} img={img} name={name} weight={weight} price={price} descr={descr}/>
            )
          })
        }
      </ul>
      <h1 className="products__title">Sauces</h1>
      <ul className="products__list">
        {
          sauces.map(({img, name, weight, price, descr, id}) => {
            return (
              <ProductCard id={id} key={id} img={img} name={name} weight={weight} price={price} descr={descr}/>
            )
          })
        }
      </ul>
      <h1 className="products__title">Drinks</h1>
      <ul className="products__list">
        {
          drinks.map(({img, name, volume, price, descr, id}) => {
            return (
              <ProductCard key={id} img={img} name={name} volume={volume} price={price} descr={descr}/>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ProductsList