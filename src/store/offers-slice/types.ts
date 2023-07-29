import { IOffer } from '../../types/offers';
import { City } from '../../consts';

export interface IfetchOffersAction {
  data: Array<IOffer>;
  city: City;
}
