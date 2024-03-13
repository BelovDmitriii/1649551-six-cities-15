import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import InsideItemList from '../../components/inside-items/inside-item-list';
import { OfferType } from '../../types/types';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../consts/consts';
import NotFoundPage from '../not-found-page/not-found-page';
import ReviewsComponent from '../../components/reviews/reviews-component';
import NearPlaceList from '../../components/near-places/near-place-list';
import CurrentOfferImagesList from '../../components/current-offer-gallery/current-offer-images-list';

type OfferPageProps = {
  offers: OfferType[];
  authorizationStatus: AuthorizationStatus;
}

function OfferPage({offers, authorizationStatus}: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const currentOffer: OfferType | undefined = offers.find((offer: OfferType) => offer.id === id);

  if(!currentOffer) {
    return (<NotFoundPage type='offer'/>);
  }

  const {title, price, isPremium, rating, type, bedrooms, maxAdults, goods, images} = currentOffer;

  return(
    <div className="page">
      <Helmet>
        <title>Six Cities. Choose offer</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <CurrentOfferImagesList images={images} />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                {isPremium &&
                <div className="place-card__mark">
                  <span>Premium</span>
                </div>}
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: '80%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <InsideItemList items={goods} />
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    Angelina
                  </span>
                  <span className="offer__user-status">
                    Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot;
                  <span className="reviews__amount">1</span>
                </h2>
                <ReviewsComponent isAuth={authorizationStatus === AuthorizationStatus.Auth}/>
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearPlaceList offers={offers.slice(0,3)}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
