import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import ImageGallery from './src/components/ImageGallery';
import configureStore from './src/store/configureStore';

const {store} = configureStore();

class App extends PureComponent {
  state = {};

  render() {
    return (
      <Provider store={store}>
        <ImageGallery />
      </Provider>
    );
  }
}

export default App;
