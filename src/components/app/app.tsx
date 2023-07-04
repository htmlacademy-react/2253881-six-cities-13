import Main from '../../pages/main/main';
import { offersCount } from '../../consts';

function App(): JSX.Element {
  return <Main countOffers={offersCount} />;
}

export default App;
