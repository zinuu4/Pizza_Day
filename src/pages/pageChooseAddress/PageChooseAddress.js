import { Helmet } from "react-helmet";

import AppHeader from "components/appHeader/AppHeader"
import ChooseAddress from "components/chooseAddress/ChooseAddress"

import './pageChooseAdress.scss';

const PageChooseAddress = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Choose address"
        />
        <title>Choose address</title>
      </Helmet>
      <AppHeader/>
      <div className="divider"></div>
      <div className="choose-address">
        <div className="choose-address__img"></div>
        <ChooseAddress/>
      </div>
    </>
  )
}

export default PageChooseAddress